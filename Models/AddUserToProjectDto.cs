using System;

namespace pivotal.Models
{
    public class UserProjectDto
    {
        public int ProjectId { get; set; }
        public string Email { get; set; }
        public int LoggedInUserId { get; set; }
    }
}