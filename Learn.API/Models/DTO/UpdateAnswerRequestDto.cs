using System.ComponentModel.DataAnnotations;

namespace Learn.API.Models.DTO {
    public class UpdateAnswerRequestDto {
        [Required]
        [MaxLength(1000, ErrorMessage = "Description has to be a maximum of 1000 characters")]
        public string Description { get; set; }
        [Required]
        public Guid QuestionId { get; set; }
        [Required]
        public bool IsCorrect { get; set; }
    }
}
