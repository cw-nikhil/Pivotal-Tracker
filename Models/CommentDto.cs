using System;

namespace pivotal.Models
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int WriterId { get; set; }
        public int StoryId { get; set; }
    }
}