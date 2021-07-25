using System;
using System.Collections.Generic;

namespace pivotal.Models
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsPublic { get; set; }
        public List<StoryDto> Stories { get; } = new List<StoryDto>();
        public int StoryCount { get; set; }
        public int OwnerId { get; set; }
    }
}