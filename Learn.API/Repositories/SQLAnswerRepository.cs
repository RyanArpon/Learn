using Microsoft.EntityFrameworkCore;
using Learn.API.Data;
using Learn.API.Models.Domain;
using Learn.API.Models.DTO;

namespace Learn.API.Repositories {
    public class SQLAnswerRepository : IAnswerRepository {
        private readonly LearnDbContext dbContext;

        public SQLAnswerRepository(LearnDbContext dbContext) {
            this.dbContext = dbContext;
        }

        public async Task<Answer> CreateAsync(Answer question) {
            var existingAnswer = await dbContext.Questions.FirstOrDefaultAsync(x => x.Id == question.QuestionId);

            if (existingAnswer == null) {
                return null;
            }

            question.IsActive = true;

            await dbContext.Answers.AddAsync(question);
            await dbContext.SaveChangesAsync();

            return question;
        }

        public async Task<List<Answer>> GetAllAsync() {
            return await dbContext.Answers.Where(x => x.IsActive).ToListAsync();
        }

        public async Task<Answer?> GetByIdAsync(Guid id) {
            return await dbContext.Answers.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Answer?> UpdateAsync(Guid id, Answer answer) {
            var existingAnswer = await dbContext.Answers.FirstOrDefaultAsync(x => x.Id == id);
            var existingQuestion = await dbContext.Questions.FirstOrDefaultAsync(x => x.Id == answer.QuestionId);

            if (existingQuestion == null || existingQuestion == null) {
                return null;
            }

            existingAnswer.Description = answer.Description;
            existingAnswer.IsCorrect = answer.IsCorrect;

            await dbContext.SaveChangesAsync();

            return existingAnswer;
        }

        public async Task<Answer?> DeleteAsync(Guid id) {
            var existingAnswer = await dbContext.Answers.FirstOrDefaultAsync(x => x.Id == id);

            if (existingAnswer == null) {
                return null;
            }

            existingAnswer.IsActive = false;

            await dbContext.SaveChangesAsync();

            return existingAnswer;
        }
    }
}
