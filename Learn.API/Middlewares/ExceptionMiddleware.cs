using Learn.API.Services;
using System.Net;
using System.Text.Json;

namespace Learn.API.Middlewares {
    public class ExceptionMiddleware {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger) {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context, IErrorLogService errorService) {
            try {
                await _next(context);
            } catch (Exception ex) {
                var statusCode = GetStatusCode(ex);

                // Log to console/file
                _logger.LogError(ex, "Unhandled exception");

                // Log to DB
                await errorService.LogAsync(context, ex, statusCode);

                await WriteResponseAsync(context, statusCode);
            }
        }

        private int GetStatusCode(Exception ex) {
            return ex switch
            {
                ArgumentException => (int)HttpStatusCode.BadRequest,
                UnauthorizedAccessException => (int)HttpStatusCode.Unauthorized,
                KeyNotFoundException => (int)HttpStatusCode.NotFound,
                _ => (int)HttpStatusCode.InternalServerError
            };
        }

        private async Task WriteResponseAsync(HttpContext context, int statusCode) {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = statusCode;

            var response = new
            {
                success = false,
                message = "An unexpected error occurred.",
                traceId = context.TraceIdentifier
            };

            await context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
    }
}
