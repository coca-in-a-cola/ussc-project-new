using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Web.Http.Results;
using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using USSC.Dto;
using USSC.Entities;
using USSC.Helpers;

namespace USSC.Services;

// create Entity and db

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IConfiguration _configuration;
    private readonly IMapper _mapper;

    public UserService(IUserRepository userRepository, IConfiguration configuration, IMapper mapper)
    {
        _userRepository = userRepository;
        _configuration = configuration;
        _mapper = mapper;
    }

    // сделать хэш и проверку на хэш, а не просто строка
    public AuthenticateResponse Authenticate(AuthenticateRequest model)
    {
        var user = _userRepository
            .GetAll()
            .FirstOrDefault(x => x.Email == model.Email && x.Password == model.Password);

        if (user == null)
        {
            // todo: need to add logger
            return null;
        }

        var token = _configuration.GenerateJwtToken(user);
        var refreshToken = GenerateJwtToken(user);
        user.RefreshToken = refreshToken;
        var result = _userRepository.UpdateRefreshToken(user, refreshToken);
        return new AuthenticateResponse(user, token, refreshToken);
    }

    public async Task<AuthenticateResponse> Register(UserModel userModel)
    {
        userModel.Role = "User";
        
        var user = _mapper.Map<UsersEntity>(userModel);
        user.RefreshToken = GenerateJwtToken(user);
        var addedUser = await _userRepository.Add(user);

        var response = Authenticate(new AuthenticateRequest
        {
            Email = user.Email,
            Password = user.Password
        });
            
        return response;
    }

    public async Task<SuccessResponse> CreateAdmin(string userEmail)
    {
        var user = await _userRepository.GetByUserEmail(userEmail);
        if (user == null)
            return new SuccessResponse(false);
        user.Role = "Admin";
        var id = await _userRepository.Update(user);
        return new SuccessResponse(id == user.Id);
    }

    public async Task<Guid> Update(UserModel entity)
    {
        var a = _mapper.Map<UsersEntity>(entity);
        await _userRepository.Update(a);
        return entity.Id;
    }

    public IEnumerable<UsersEntity> GetAll()
    {
        return _userRepository.GetAll();
    }

    public UsersEntity? GetById(Guid id)
    {
        return _userRepository.GetById(id);
    }
    
    private string GenerateJwtToken(UsersEntity user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_configuration["Secret"]);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] { new Claim("UserId", user.Id.ToString()) }),
            Expires = DateTime.UtcNow.AddDays(30),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public AuthenticateResponse UpdateTokens(UsersEntity entity, string refreshToken)
    {
        entity.RefreshToken = GenerateJwtToken(entity);
        var response = new AuthenticateResponse(entity, _configuration.GenerateJwtToken(entity), refreshToken);
        var result = _userRepository.UpdateRefreshToken(entity, refreshToken);
        return response;
    }
}