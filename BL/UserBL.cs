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
using pivotal.DAL.Interfaces;
using pivotal.BL.Interfaces;
using pivotal.DAL;
using pivotalHeroku.Utils;

namespace pivotal.BL
{
    public class UserBL : IUserBL
    {
        IUserDAL _user;
        private readonly Jwt _jwt;
        public UserBL(IUserDAL user, Jwt jwt)
        {
            _user = user;
            _jwt = jwt;
        }
        public async Task<UserDto> GetUserById(int projectId)
        {
            return await _user.GetUserById(projectId);
        }
        public async Task<UserDto> GetUserByEmail(string email)
        {
            return await _user.GetUserByEmail(email);
        }
        public async Task<int> CreateUser(UserDto user) {
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            return await _user.CreateUser(user);
        }
        public async Task<UserDto> GetLoggedInUser(string jwt) {
            var userId = _jwt.GetUserIdByJwt(jwt);
            return await _user.GetUserById(userId);
        }
    }
}