using System;
using System.Collections.Generic;

namespace pivotal.Models
{
    public class ProjectModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsPublic { get; set; }
        // public List<StoryModel> StoryList { get; set; }
    }
}