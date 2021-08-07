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

namespace pivotal.BL
{
    public class CommentBL : ICommentBL
    {
        ICommentDAL _comment;
        public CommentBL(ICommentDAL comment)
        {
            _comment = comment;
        }
        public async Task<List<CommentDto>> GetCommentsByStoryId(int storyId)
        {
            return await _comment.GetCommentsByStoryId(storyId);
        }
        public async Task<bool> UpdateComment(int id, string text)
        {
            return await _comment.UpdateComment(id, text);
        }
        public async Task<bool> DeleteComment(int id)
        {
            return await _comment.DeleteComment(id);
        }
        public async Task<int> AddComment(CommentDto comment)
        {
            return await _comment.AddComment(comment);
        }
    }
}