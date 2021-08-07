using System.Collections.Generic;
using System.Threading.Tasks;
using pivotal.Models;


namespace pivotal.DAL.Interfaces
{
    public interface ICommentDAL
    {
        public Task<List<CommentDto>> GetCommentsByStoryId(int storyId);
        public Task<bool> UpdateComment(int id, string text);
        public Task<int> AddComment(CommentDto comment);
        public Task<bool> DeleteComment(int commentId);
        
    }
}