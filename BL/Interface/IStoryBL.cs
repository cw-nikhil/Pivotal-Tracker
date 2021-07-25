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


namespace pivotal.BL.Interfaces
{
    public interface IStoryBL
    {
        public Task<StoryDto> GetStoryById(int id);
        public Task<int> AddStory(StoryDto story);
        public Task<bool> DeleteStory(int storyId);
        public Task<bool> UpdateStory(StoryDto story);
    }
}