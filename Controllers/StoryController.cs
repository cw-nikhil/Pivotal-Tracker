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
    public class StoryController : ControllerBase
    {
        private readonly IStoryBL _story;
        private readonly Jwt _jwt;
        private const string _jwtCookieName = "jwt";
        public StoryController(IStoryBL story, Jwt jwt)
        {
            _story = story;
            _jwt = jwt;
        }
        [HttpGet]
        [Route("get/story/{id}/")]
        public async Task<StoryDto> Get(int id)
        {
            return await _story.GetStoryById(id);
        }
        [HttpPost("create/story/")]
        public async Task<IActionResult> Post(StoryDto story)
        {
            int userId = _jwt.GetUserIdByJwt(Request.Cookies[_jwtCookieName]);
            if (userId == 0) {
                return Ok(new {message = "You need to be logged in to create a new story"});
            }
            if (story.ProjectId == 0)
            {
                return Ok(new {message = "Invalid request for creating story"});
            }
            if (string.IsNullOrEmpty(story.Title))
            {
                return Ok(new {message = "Story title can't be null"});
            }
            story.RequesterId = userId;
            int id = await _story.AddStory(story);
            if (id == 0) {
                return Ok(new {message = "some error creating story"}); 
            } 
            return Ok(new {id = id, message = "story created successfully"});
        }
        [HttpPut("update/story/")]
        public async Task<bool> Put([FromBody] StoryDto story)
        {
            return await _story.UpdateStory(story);
        }
        [HttpDelete("delete/story/")]
        public async Task<bool> Delete([FromBody] StoryDto story)
        {
            return await _story.DeleteStory(story.Id);
        }
    }
}
