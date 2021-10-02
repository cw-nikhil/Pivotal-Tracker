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
			var setQueryList = new List<string>();
            if (!string.IsNullOrEmpty(story.Title))
            {
                setQueryList.Add("title = @title");
            }
            if (!string.IsNullOrEmpty(story.Description))
            {
                setQueryList.Add("description = @description");
            }
			if ((int) story.State != -1)
			{
				setQueryList.Add("state = @state");
			}
			if ((int) story.Type != -1)
			{
				setQueryList.Add("type = @type");
			}
			if (story.Points != -1)
			{
				setQueryList.Add("points = @points");
			}
            if (story.OwnerId != -1)
            {
                setQueryList.Add("ownerId = @ownerId");
            }
            if (story.RequesterId != -1)
            {
                setQueryList.Add("requesterId = @requesterId");
            }
            if (setQueryList.Count == 0)
            {
                return true;
            }
            var a = string.Join(", ", setQueryList);
            string query = "UPDATE {0}.Story SET {1} WHERE id = @id;";
            return await _story.UpdateStory(story, query, string.Join(", ", setQueryList));
        }
    }
}