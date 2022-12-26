using USSC.Entities;

namespace USSC.Dto;

public class AuthenticateResponse
{
    public Guid Id { get; set; }
    public string Email { get; set; }
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }
    public string Role { get; set; }

    public AuthenticateResponse(UsersEntity user, string accessToken, string refreshToken)
    {
        Id = user.Id;
        Email = user.Email;
        AccessToken = accessToken;
        RefreshToken = refreshToken;
        Role = user.Role;
    }
}