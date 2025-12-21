using Microsoft.EntityFrameworkCore;
using Learn.API.Data;
using Learn.API.Models.Domain;
using Learn.API.Models.DTO;

namespace Learn.API.Repositories {
    public class SQLTopicRepository : ITopicRepository {
        private readonly LearnDbContext dbContext;

        public SQLTopicRepository(LearnDbContext dbContext) {
            this.dbContext = dbContext;
        }

        public async Task<Topic> CreateAsync(Topic topic) {
            topic.IsActive = true;

            await dbContext.Topics.AddAsync(topic);
            await dbContext.SaveChangesAsync();

            return topic;
        }

        public async Task<List<Topic>> GetAllAsync() {
            return await dbContext.Topics.Where(x => x.IsActive).ToListAsync();
        }

        public async Task<Topic?> GetByIdAsync(Guid id) {
            return await dbContext.Topics.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Topic?> UpdateAsync(Guid id, Topic topic) {
            var existingTopic = await dbContext.Topics.FirstOrDefaultAsync(x => x.Id == id);

            if (existingTopic == null) {
                return null;
            }

            existingTopic.Title = topic.Title;

            await dbContext.SaveChangesAsync();

            return existingTopic;
        }

        public async Task<Topic?> DeleteAsync(Guid id) {
            var existingTopic = await dbContext.Topics.FirstOrDefaultAsync(x => x.Id == id);

            if (existingTopic == null) {
                return null;
            }

            existingTopic.IsActive = false;

            await dbContext.SaveChangesAsync();

            return existingTopic;
        }
    }
}
