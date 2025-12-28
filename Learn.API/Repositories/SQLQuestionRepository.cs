using Microsoft.EntityFrameworkCore;
using Learn.API.Data;
using Learn.API.Models.Domain;
using Learn.API.Models.DTO;

namespace Learn.API.Repositories {
    public class SQLQuestionRepository : IQuestionRepository {
        private readonly LearnDbContext dbContext;

        public SQLQuestionRepository(LearnDbContext dbContext) {
            this.dbContext = dbContext;
        }

        public async Task<Question> CreateAsync(Question question) {
            var existingTopic = await dbContext.Topics.FirstOrDefaultAsync(x => x.Id == question.TopicId);

            if (existingTopic == null) {
                return null;
            }

            question.IsActive = true;

            await dbContext.Questions.AddAsync(question);
            await dbContext.SaveChangesAsync();

            return question;
        }

        public async Task<List<Question>> GetAllAsync() {
            return await dbContext.Questions.Where(x => x.IsActive).ToListAsync();
        }

        public async Task<Question?> GetByIdAsync(Guid id) {
            return await dbContext.Questions.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Question?> UpdateAsync(Guid id, Question question) {
            var existingQuestion = await dbContext.Questions.FirstOrDefaultAsync(x => x.Id == id);
            var existingTopic = await dbContext.Topics.FirstOrDefaultAsync(x => x.Id == question.Id);

            if (existingQuestion == null || existingTopic == null) {
                return null;
            }

            existingQuestion.Description = question.Description;

            await dbContext.SaveChangesAsync();

            return existingQuestion;
        }

        public async Task<Question?> DeleteAsync(Guid id) {
            var existingQuestion = await dbContext.Questions.FirstOrDefaultAsync(x => x.Id == id);

            if (existingQuestion == null) {
                return null;
            }

            existingQuestion.IsActive = false;

            await dbContext.SaveChangesAsync();

            return existingQuestion;
        }
    }
}
