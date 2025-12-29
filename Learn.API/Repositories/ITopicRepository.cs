using Learn.API.Models.Domain;
using Learn.API.Models.DTO;
using System.Runtime.InteropServices;

namespace Learn.API.Repositories {
    public interface ITopicRepository {
        Task<List<Topic>> GetAllAsync();
        Task<Topic?> GetByIdAsync(Guid id);
        Task<Topic> CreateAsync(Topic topic);
        Task<Topic?> UpdateAsync(Guid id, Topic topic);
        Task<Topic?> DeleteAsync(Guid id);
    }
}
