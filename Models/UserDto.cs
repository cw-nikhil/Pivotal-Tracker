using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace pivotal.Models
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public List<int> ProjectIds { get; } = new List<int>();
    }
}