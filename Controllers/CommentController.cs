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

namespace pivotalHeroku.Controllers
{
    [ApiController]
    [Route("/api/")]
    public class CommentController : ControllerBase
    {
        // https://codeforces.com/blog/entry/92223
        private readonly ICommentBL _comment;
        private readonly Jwt _jwt;
        private const string _jwtCookieName = "jwt";
        public CommentController(ICommentBL comment, Jwt jwt)
        {
            _comment = comment;
            _jwt = jwt;
        }

        [HttpGet]
        [Route("get/comment/{storyId}/")]
        public async Task<IActionResult> Get(int storyId)
        {
            return Ok(new { comments = await _comment.GetCommentsByStoryId(storyId) });
        }
        [HttpPost("create/comment/")]
        public async Task<IActionResult> Post(CommentDto comment)
        {
            int userId = _jwt.GetUserIdByJwt(Request.Cookies[_jwtCookieName]);
            if (userId == 0)
            {
                return BadRequest(new { message = "you need to sign in to comment" });
            }
            comment.WriterId = userId;
            return Ok(new { commentId = await _comment.AddComment(comment) });
        }
        [HttpPut("update/comment/")]
        public async Task<IActionResult> Put([FromBody] CommentDto comment)
        {
			int userId = _jwt.GetUserIdByJwt(Request.Cookies[_jwtCookieName]);
            if (userId != comment.WriterId)
            {
                return BadRequest(new { message = "You are not the author of this comment" });
            }
            bool res = await _comment.UpdateComment(comment.Id, comment.Text);
            if (res)
            {
                return Ok(new { message = "comment updated successfully" });
            }
            return Ok(new { message = "error updating comment" });
        }
        [HttpDelete("delete/comment/")]
        public async Task<IActionResult> Delete([FromBody] CommentDto comment)
        {
            int userId = _jwt.GetUserIdByJwt(Request.Cookies[_jwtCookieName]);
            if (userId != comment.WriterId)
            {
                return BadRequest(new { message = "You are not the author of this comment" });
            }
            bool res = await _comment.DeleteComment(comment.Id);
            if (res)
            {
                return Ok(new { message = "comment deleted successfully" });
            }
            return Ok(new { message = "error deleting comment" });
        }
    }
}
