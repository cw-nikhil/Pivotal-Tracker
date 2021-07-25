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

namespace pivotalHeroku.Controllers
{
    [ApiController]
    [Route("/api/")]
    public class StoryController : ControllerBase
    {
        private readonly IStoryBL _story;
        public StoryController(IStoryBL story)
        {
            _story = story;
        }
        [HttpGet]
        [Route("get/story/{id}/")]
        public async Task<StoryDto> Get(int id)
        {
            return await _story.GetStoryById(id);
        }
        [HttpPost("create/story/")]
        public async Task<int> Post([FromBody] StoryDto story)
        {
            if (story.ProjectId == 0 || string.IsNullOrEmpty(story.Title) || string.IsNullOrEmpty(story.Description))
            {
                return 0;
            }
            return await _story.AddStory(story);
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
