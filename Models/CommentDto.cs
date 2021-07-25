using System;

namespace pivotal.Models
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int Writer { get; set; }
    }
}