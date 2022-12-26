using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using USSC.Services;

namespace USSC.Helpers;

public class JwtMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IConfiguration _configuration;
    //private readonly ILogger _logger;

    public JwtMiddleware(RequestDelegate next, IConfiguration configuration)
    {
        _next = next;
        _configuration = configuration;
    }

    public async Task Invoke(HttpContext context, IUserService userService)
    {
        var token1 = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ");
        var token = token1?.Last();

        if (token != null)
            AttachUserToContext(context, userService, token);

        await _next(context);
    }

    public void AttachUserToContext(HttpContext context, IUserService userService, string token)
    {
        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            // min 16 characters
            var key = Encoding.ASCII.GetBytes(_configuration["Secret"]);
            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero,
                RoleClaimType = "User",
            }, out SecurityToken validatedToken);

            var jwtToken = (JwtSecurityToken)validatedToken;
            // достает id пользователя из токена
            var userId = Guid.Parse(jwtToken.Claims.First(x => x.Type == "UserId").Value);

            context.Items["User"] = userService.GetById(userId);
        }
        catch
        {
            // todo: need to add logger
        }
    }
}