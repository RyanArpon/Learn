namespace Learn.API.Models.DTO {
    public class AnswerDto {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public Guid QuestionId { get; set; }
        public bool IsCorrect { get; set; }
    }
}
