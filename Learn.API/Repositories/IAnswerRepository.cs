using Learn.API.Models.Domain;
using Learn.API.Models.DTO;
using System.Runtime.InteropServices;

namespace Learn.API.Repositories {
    public interface IAnswerRepository {
        Task<List<Answer>> GetAllAsync();
        Task<Answer?> GetByIdAsync(Guid id);
        Task<Answer> CreateAsync(Answer topic);
        Task<Answer?> UpdateAsync(Guid id, Answer topic);
        Task<Answer?> DeleteAsync(Guid id);
    }
}
