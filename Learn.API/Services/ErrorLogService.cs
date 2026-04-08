using Learn.API.Data;
using Learn.API.Models.Domain;

namespace Learn.API.Services {
    public class ErrorLogService : IErrorLogService {
        private readonly LearnDbContext _db;

        public ErrorLogService(LearnDbContext db) {
            _db = db;
        }

        public async Task LogAsync(HttpContext context, Exception ex, int statusCode) {
            var log = new ErrorLog
            {
                Message = ex.Message,
                StackTrace = ex.StackTrace,
                Path = context.Request.Path,
                Method = context.Request.Method,
                StatusCode = statusCode,
                TraceId = context.TraceIdentifier,
                UserName = context.User?.Identity?.Name
            };

            _db.ErrorLogs.Add(log);
            await _db.SaveChangesAsync();
        }
    }

}
