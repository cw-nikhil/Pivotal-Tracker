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
using Microsoft.Extensions.Options;
using pivotalHeroku;

namespace pivotal.DAL
{
    public interface IStoryDAL
    {
        public Task<StoryDto> GetStoryById(int id);
        public Task<int> AddStory(StoryDto story);
        public Task<bool> DeleteStory(int storyId);
        public Task<bool> UpdateStory(StoryDto story);
    }
}