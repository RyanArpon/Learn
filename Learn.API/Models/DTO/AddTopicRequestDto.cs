using System.ComponentModel.DataAnnotations;

namespace Learn.API.Models.DTO {
    public class AddTopicRequestDto {
        [Required]
        [MaxLength(1000, ErrorMessage = "Name has to be a maximum of 1000 characters")]
        public string Title { get; set; }
    }
}
