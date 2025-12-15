using Microsoft.AspNetCore.Identity;

namespace Learn.API.Repositories {
    public interface ITokenRepository {
        string CreateJWTToken(IdentityUser user, List<string> roles);
    }
}
