using Learn.API.Models.Domain;

namespace Learn.API.Models.DTO {
    public class QuestionsDto {
        public int Count { get; set; }
        public List<Question> Questions { get; set; }
    }
}
