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
    public class CommentDAL : ICommentDAL
    {
        IOptions<PivotalConfiguration> _options;
        public CommentDAL(IOptions<PivotalConfiguration> options)
        {
            _options = options;
        }
        public async Task<List<CommentDto>> GetCommentsByStoryId(int storyId)
        {
            var d = _options.Value;
            string sql = $@"SELECT c.*, u.Name AS WriterName from {_options.Value.Schema}.Comment c
                            INNER JOIN {_options.Value.Schema}.User u ON c.writerId = u.id
                            WHERE storyId = @storyId;";
            try
            {
                using (IDbConnection con = new MySqlConnection(_options.Value.ConnectionString))
                {
                    var commentList = await con.QueryAsync<CommentDto>
                    (
                        sql,
                        param: new { storyId }
                    );
                    if (commentList == null || commentList.Count() == 0)
                    {
                        return new List<CommentDto>();
                    }
                    return commentList.ToList();
                }
            }
            catch (Exception e)
            {
                return new List<CommentDto>();
            }
        }
        public async Task<bool> UpdateComment(int id, string text)
        {
            string sql = $@"UPDATE {_options.Value.Schema}.Comment
                            SET text = @text
                            WHERE id = @id;";
            try
            {
                using (IDbConnection con = new MySqlConnection(_options.Value.ConnectionString))
                {
                    var rowsAffected = await con.ExecuteAsync(sql, new { id, text });
                    return rowsAffected == 1;
                }
            }
            catch (Exception e)
            {
                return false;
            }
        }
        public async Task<int> AddComment(CommentDto comment)
        {
            string sql = $@"INSERT INTO {_options.Value.Schema}.Comment(text, writerId, storyId, createdOn)
                            VALUES(@text, @writerId, @storyId, now());
                            SELECT LAST_INSERT_ID();";
            try
            {
                using (IDbConnection con = new MySqlConnection(_options.Value.ConnectionString))
                {
                    int id = await con.ExecuteScalarAsync<int>(
                        sql,
                        new
                        {
                            @text = comment.Text,
                            @writerId = comment.WriterId,
                            @storyId = comment.StoryId
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
        public async Task<bool> DeleteComment(int commentId)
        {
            string sql = $"DELETE from {_options.Value.Schema}.Comment where id = @commentId;";
            try
            {
                using (IDbConnection con = new MySqlConnection(_options.Value.ConnectionString))
                {
                    int rowsAffected = await con.ExecuteAsync(sql, new { commentId });
                    return rowsAffected > 0;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}