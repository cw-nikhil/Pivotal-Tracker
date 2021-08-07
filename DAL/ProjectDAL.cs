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
    public class ProjectDAL : IProjectDAL
    {
        IOptions<PivotalConfiguration> _options;
        public ProjectDAL(IOptions<PivotalConfiguration> options)
        {
            _options = options;
        }
        // private const string _options.Value.ConnectionString = "SERVER=127.0.0.1;Port=3306;UID=root;PASSWORD=Mango@Pine;DATABASE=pivotal";
        // string _options.Value.ConnectionString = "SERVER=remotemysql.com;Port=3306;UID=F7NtycWf0x;PASSWORD=3n1wCr6EAD;DATABASE=F7NtycWf0x";
        public async Task<ProjectDto> GetProjectById(int projectId, int userId)
        {
            var d = _options.Value;
            string sql = $@"SELECT DISTINCT s.id, s.title, s.points, s.type, s.state, p.Name, p.IsPublic
                            FROM {_options.Value.Schema}.Project p
                            LEFT JOIN {_options.Value.Schema}.Story s ON s.projectId = p.id
                            LEFT JOIN {_options.Value.Schema}.UserProjectMapping m ON p.Id = m.projectId
                            WHERE p.id = @projectId AND (m.userId = @userId OR p.IsPublic = 1);";
            try
            {
                using (IDbConnection con = new MySqlConnection(_options.Value.ConnectionString))
                {
                    var storyList = new List<StoryDto>();
                    var projectList = await con.QueryAsync<StoryDto, ProjectDto, ProjectDto>
                    (
                        sql,
                        map: (story, project) =>
                        {
                            if (story.Id != 0)
                            {
                                storyList.Add(story);
                            }
                            return project;
                        },
                        splitOn: "Name",
                        param: new { projectId, userId }
                    );
                    if (projectList == null || projectList.Count() == 0)
                    {
                        return null;
                        // return new ProjectDto();
                    }
                    var project = projectList.FirstOrDefault();
                    project.Stories.AddRange(storyList);
                    return project;
                }
            }
            catch (Exception e)
            {
                // return new ProjectDto();
                return null;
            }
        }
        public async Task<List<ProjectDto>> GetProjectsByUserId(int userId)
        {
            string sql = $@"SELECT p.Id, p.Name, p.IsPublic, m.userid FROM {_options.Value.Schema}.Project p
                            LEFT JOIN {_options.Value.Schema}.UserProjectMapping m ON p.Id = m.projectId AND m.userId = @userId
                            where m.userid = @userId OR p.isPublic = 1;";
            try
            {
                using (IDbConnection con = new MySqlConnection(_options.Value.ConnectionString))
                {
                    var projectList = await con.QueryAsync<ProjectDto>(sql, new { userId });
                    if (projectList == null) {
                        return new List<ProjectDto>();
                    }
                    return projectList.ToList();
                }
            }
            catch (Exception e)
            {
                return new List<ProjectDto>();
            }
        }
        public async Task<int> AddProject(string name, bool isPublic, int ownerId)
        {
            string sql = $@"INSERT INTO {_options.Value.Schema}.Project(Name, IsPublic, OwnerId)
                            VALUES(@name, @isPublic, @ownerId);
                            SELECT LAST_INSERT_ID();";
            try
            {
                using (IDbConnection con = new MySqlConnection(_options.Value.ConnectionString))
                {
                    int id = await con.ExecuteScalarAsync<int>(
                        sql,
                        new
                        {
                            @name = name,
                            @isPublic = isPublic,
                            @ownerId = ownerId
                        }
                    );
                    return id;
                }
            }
            catch (Exception e)
            {
                return 0;
            }
        }
        public async Task<bool> DeleteProject(int projectId)
        {
            string sql = $"DELETE from {_options.Value.Schema}.Project where Id = @projectId;";
            try
            {
                using (IDbConnection con = new MySqlConnection(_options.Value.ConnectionString))
                {
                    int id = await con.ExecuteAsync(sql, new { projectId });
                    return id > 0;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }
        public async Task<bool> UpdateProject(int id, string name, bool isPublic)
        {
            string sql = $"UPDATE {_options.Value.Schema}.Project SET ";
            sql += !string.IsNullOrEmpty(name) ? "Name = @name, " : string.Empty;
            sql += "IsPublic = @isPublic WHERE id = @id";
            try
            {
                using (IDbConnection con = new MySqlConnection(_options.Value.ConnectionString))
                {
                    int result = await con.ExecuteAsync(sql, new { name, isPublic, id });
                    return result > 0;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}



// public async Task<List<ProjectDto> GetProjectsByUserId(int userId) {
//     string sql = $@"SELECT p.Id, p.Name, p.IsPublic, m.userid FROM pivotal.Project p
//                     LEFT JOIN pivotal.UserProjectMapping m ON p.Id = m.projectId AND m.userId = @userId
//                     where m.userid = @userId Or p.isPublic = 1;";
//     try {
//         using (IDbConnection con = new MySqlConnection(_options.Value.ConnectionString)) {
//             var projectList = await con.QueryAsync(sql, new {id});
//             return projectList.ToList();
//         }
//     }
//     catch (Exception e) {
//         return new List<ProjectDto>();
//     }
// }