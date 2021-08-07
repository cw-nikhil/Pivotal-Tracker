using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;
using pivotal.Models;
using pivotalHeroku.Models;
using Dapper;
using pivotal.BL.Interfaces;
using pivotalHeroku.Utils;
using Microsoft.AspNetCore.Http;

namespace pivotalHeroku.Controllers
{
    [ApiController]
    [Route("/api/")]
    public class UserController : ControllerBase
    {
        private readonly IUserBL _user;
        private readonly Jwt _jwt;
        private const string _jwtCookieName = "jwt";
        public UserController(IUserBL user, Jwt jwt)
        {
            _user = user;
            _jwt = jwt;
        }
        [HttpPost("signup/")]
        public async Task<IActionResult> SignUp(UserDto user)
        {
            if (string.IsNullOrEmpty(user.Name) || string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.Password))
            {
                return BadRequest(new { message = "Invalid signup request" });
            }
            int res = await _user.CreateUser(user);
            if (res == -1)
            {
                return BadRequest(new { message = "User already exists" });
            }
            if (res == 0)
            {
                return BadRequest(new { message = "Some technical error in signing the user up" });
            }
            return Ok(new { message = "User created successfully" });
        }

        [HttpPost("login/")]
        public async Task<IActionResult> Login(UserDto user)
        {
            if (string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.Password))
            {
                return BadRequest(new { message = "Invalid Request" });
            }
            var dbUser = await _user.GetUserByEmail(user.Email);
            if (dbUser == null || !BCrypt.Net.BCrypt.Verify(user.Password, dbUser.Password))
            {
                return BadRequest(new {message = "Invalid Crdentials"});
            }
            Response.Cookies.Append
            (
                _jwtCookieName,
                _jwt.GetJwtByUserId(dbUser.Id),
                new CookieOptions
                {
                    Expires = DateTime.Now.AddDays(15),
                    HttpOnly = true,
                    // Secure = true,
                }
            );
            var responseOb = new
            {
                message = "success",
                id = dbUser.Id,
                name = dbUser.Name
            };
            return Ok(responseOb);

        }
        [HttpPost("logout/")]
        public IActionResult Logout(UserDto user)
        {
            Response.Cookies.Delete(_jwtCookieName);
            return Ok(new { message = "user successfully logged out" });
        }
        [HttpGet("user")]
        public async Task<IActionResult> Get()
        {
            string jwt = Request.Cookies[_jwtCookieName];
            var user = await _user.GetLoggedInUser(jwt);
            return Ok(user);
        }

        //if cookie is not get by frontend add another package. Watch 45:00

    }
}
