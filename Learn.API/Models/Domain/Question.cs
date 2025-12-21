using Microsoft.AspNetCore.Components.Routing;

namespace Learn.API.Models.Domain {
    public class Question {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public Guid TopicId { get; set; }
        public bool IsActive { get; set; }
    }
}
