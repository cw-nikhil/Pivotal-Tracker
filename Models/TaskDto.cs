using System;

namespace pivotal.Models
{
    public class TaskDto
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public bool IsDone { get; set; }
    }
}