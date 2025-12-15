using Learn.API.Models.Domain;

namespace Learn.API.Repositories {
    public interface IImageRepository {
        Task<Image> Upload(Image image);
    }
}
