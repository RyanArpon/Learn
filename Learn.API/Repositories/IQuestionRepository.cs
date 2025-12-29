using Learn.API.Models.Domain;
using Learn.API.Models.DTO;
using System.Runtime.InteropServices;

namespace Learn.API.Repositories {
    public interface IQuestionRepository {
        Task<List<Question>> GetAllAsync();
        Task<Question?> GetByIdAsync(Guid id);
        Task<Question> CreateAsync(Question topic);
        Task<Question?> UpdateAsync(Guid id, Question topic);
        Task<Question?> DeleteAsync(Guid id);
    }
}
