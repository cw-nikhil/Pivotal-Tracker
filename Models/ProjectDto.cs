using System;
using System.Collections.Generic;

namespace pivotal.Models
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsPublic { get; set; }
        public List<StoryListingDto> Stories { get; } = new List<StoryListingDto>();
        public int StoryCount { get; set; }
        public int OwnerId { get; set; }
    }
}