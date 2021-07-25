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

namespace pivotal.BL
{
    public class StoryBL : IStoryBL
    {
        IStoryDAL _story;
        public StoryBL(IStoryDAL story)
        {
            _story = story;
        }
        public async Task<StoryDto> GetStoryById(int projectId)
        {
            return await _story.GetStoryById(projectId);
        }
        public async Task<int> AddStory(StoryDto story)
        {
            return await _story.AddStory(story);
        }
        public async Task<bool> DeleteStory(int projectId)
        {
            return await _story.DeleteStory(projectId);
        }
        public async Task<bool> UpdateStory(StoryDto story)
        {
            return await _story.UpdateStory(story);
        }
    }
}