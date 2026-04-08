namespace Learn.API.Services {
    public interface IErrorLogService {
        Task LogAsync(HttpContext context, Exception ex, int statusCode);
    }

}
