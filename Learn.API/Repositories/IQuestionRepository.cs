using Learn.API.Models.Domain;
using Learn.API.Models.DTO;
using System.Runtime.InteropServices;

namespace Learn.API.Repositories {
    public interface IQuestionRepository {
        Task<QuestionsDto> GetAllAsync(int pageNumber, int pageSize);
        Task<Question?> GetByIdAsync(Guid id);
        Task<Question> CreateAsync(Question topic);
        Task<Question?> UpdateAsync(Guid id, Question topic);
        Task<Question?> DeleteAsync(Guid id);
        Task<List<Question>> GetAllByTopicIdAsync(Guid id);
    }
}
