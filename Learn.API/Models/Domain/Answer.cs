using Microsoft.AspNetCore.Components.Routing;

namespace Learn.API.Models.Domain {
    public class Answer {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public Guid QuestionId { get; set; }
        public bool IsCorrect { get; set; }
        public bool IsActive { get; set; }
    }
}
