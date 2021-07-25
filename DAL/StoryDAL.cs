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
    public class StoryDAL : IStoryDAL
    {
        IOptions<PivotalConfiguration> _options;
        public StoryDAL(IOptions<PivotalConfiguration> options)
        {
            _options = options;
        }
        public async Task<StoryDto> GetStoryById(int id)
        {
            var d = _options.Value;
            string sql = $"SELECT * FROM {_options.Value.Schema}.Story WHERE Id = @id";
            try
            {
                using (IDbConnection con = new MySqlConnection(_options.Value.ConnectionString))
                {
                    var storyList = await con.QueryAsync<StoryDto>(sql, new { id });

                    return storyList.FirstOrDefault();
                }
            }
            catch (Exception e)
            {
                return new StoryDto();
            }
        }
        public async Task<int> AddStory(StoryDto story)
        {
            string sql = $@"INSERT INTO {_options.Value.Schema}.Story(projectId, title, description, ownerId, requesterId, points, type, state)
                            VALUES(@projectId, @title, @description, @ownerId, @requesterId, @points, @type, @state);
                            SELECT LAST_INSERT_ID();";
            try
            {
                using (IDbConnection con = new MySqlConnection(_options.Value.ConnectionString))
                {
                    int id = await con.ExecuteScalarAsync<int>(
                        sql,
                        new
                        {
                            @projectId = story.ProjectId,
                            @title = story.Title,
                            @description = story.Description,
                            @ownerId = story.OwnerId,
                            @requesterId = story.RquesterId,
                            @points = story.Points,
                            @type = (int)story.Type,
                            @state = (int)story.State,
                        }
                    );
                    return id;
                }
            }
            catch (Exception)
            {
                return 0;
            }
        }
        public async Task<bool> DeleteStory(int storyId)
        {
            string sql = $"DELETE from {_options.Value.Schema}.Story where Id = @storyId;";
            try
            {
                using (IDbConnection con = new MySqlConnection(_options.Value.ConnectionString))
                {
                    int id = await con.ExecuteAsync(sql, new { storyId });
                    return id > 0;
                }
            }
            catch (Exception)
            {
                return false;
            }
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
            if (story.OwnerId != 0)
            {
                setQueryList.Add("ownerId = @ownerId");
            }
            if (story.RquesterId != 0)
            {
                setQueryList.Add("requesterId = @requesterId");
            }
            if (setQueryList.Count == 0)
            {
                return true;
            }
            var a = string.Join(", ", setQueryList);
            string sql = $@"UPDATE {_options.Value.Schema}.Story SET {string.Join(", ", setQueryList)} WHERE id = @id;";
            try
            {
                using (IDbConnection con = new MySqlConnection(_options.Value.ConnectionString))
                {
                    int result = await con.ExecuteAsync(
                        sql,
                        new
                        {
                            @id = story.Id,
                            @title = story.Title,
                            @description = story.Description,
                            @ownerId = story.OwnerId,
                            @requesterId = story.RquesterId
                        }
                    );
                    return result > 0;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
        }
    }
}