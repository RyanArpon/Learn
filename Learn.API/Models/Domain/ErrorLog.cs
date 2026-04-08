using Microsoft.AspNetCore.Components.Routing;

namespace Learn.API.Models.Domain {
    public class ErrorLog {
        public int Id { get; set; }
        public string Message { get; set; }
        public string StackTrace { get; set; }
        public string Path { get; set; }
        public string Method { get; set; }
        public int StatusCode { get; set; }
        public string TraceId { get; set; }
        public string? UserName { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

}
