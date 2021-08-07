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
    public interface ICommentBL
    {
        public Task<List<CommentDto>> GetCommentsByStoryId(int storyId);
        public Task<bool> UpdateComment(int id, string text);
        public Task<int> AddComment(CommentDto comment);
        public Task<bool> DeleteComment(int commentId);
    }
}