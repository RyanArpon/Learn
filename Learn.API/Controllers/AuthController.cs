using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Learn.API.Models.DTO;
using Learn.API.Repositories;

namespace Learn.API.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase {
        private readonly UserManager<IdentityUser> userManger;
        private readonly ITokenRepository tokenRepository;

        public AuthController(
            UserManager<IdentityUser> userManger,
            ITokenRepository tokenRepository
        ) {
            this.userManger = userManger;
            this.tokenRepository = tokenRepository;
        }

        // POST: /api/Auth/Register
        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto registerRequestDto) {
            var identityUser = new IdentityUser
            {
                UserName = registerRequestDto.Username,
                Email = registerRequestDto.Username
            };

            var identityResult = await userManger.CreateAsync(identityUser, registerRequestDto.Password);

            if (identityResult.Succeeded) {
                // Add roles to this User
                if (registerRequestDto.Roles != null && registerRequestDto.Roles.Any()) {
                    identityResult = await userManger.AddToRolesAsync(identityUser, registerRequestDto.Roles);

                    if (identityResult.Succeeded) {
                        return Ok("User was registered! Please login.");
                    }
                }
            }

            return BadRequest("Something went wrong");
        }

        // POST: /api/Auth/Login
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto loginRequestDto) {
            var user = await userManger.FindByEmailAsync(loginRequestDto.Username);

            if (user != null) {
                var checkPasswordResult = await userManger.CheckPasswordAsync(user, loginRequestDto.Password);

                if (checkPasswordResult) {
                    // Get Roles for this user
                    var roles = await userManger.GetRolesAsync(user);

                    if (roles != null) {
                        // Create Token
                        var jwtToken = tokenRepository.CreateJWTToken(user, roles.ToList());

                        var response = new LoginResponseDto
                        {
                            JwtToken = jwtToken
                        };

                        return Ok(response);
                    }
                }
            }

            return BadRequest("Incorrect username or password.");
        }
    }
}
