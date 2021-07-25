using Microsoft.Extensions.Options;

namespace pivotalHeroku
{
    public class PivotalConfiguration : IOptions<PivotalConfiguration>
    {
        public string ConnectionString { get; set; }
        public string Schema { get; set; }
        public PivotalConfiguration Value => this;
    }
}