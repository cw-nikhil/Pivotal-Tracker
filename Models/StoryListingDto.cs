using System;
using System.Collections.Generic;
using pivotal.Enum.StoryEnum;

namespace pivotal.Models
{
    public class StoryListingDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int Points { get; set; }
        public StoryType Type { get; set; }
        public StoryState State { get; set; }
    }
}