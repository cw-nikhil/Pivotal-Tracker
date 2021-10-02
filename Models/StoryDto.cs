using System;
using System.Collections.Generic;
using pivotal.Enum.StoryEnum;

namespace pivotal.Models
{
    public class StoryDto
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int OwnerId { get; set; }
        public int RequesterId { get; set; }
        public int Points { get; set; }
        public StoryType Type { get; set; }
        public StoryState State { get; set; }
    }
}