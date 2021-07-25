using System;

namespace pivotal.Models
{
    public class BlockerDto
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public bool IsResolved { get; set; }
    }
}