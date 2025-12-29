
using System.ComponentModel.DataAnnotations;

namespace Learn.API.Models.DTO {
    public class ImageUploadRequestDto {
        [Required]
        public IFormFile File { get; set; }

        [Required]
        public string FileName { get; set; }

        public string? FileDescription { get; set; }
    }
}
