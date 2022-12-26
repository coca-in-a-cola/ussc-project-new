using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using USSC.Controllers;
using USSC.Dto;
using USSC.Entities;
using USSC.Services;

namespace UnitTests;

public class UserControllerTests
{
    private List<UsersEntity> GetTestUsers()
    {
        var users = new List<UsersEntity>
        {
            new()
            {
                Id = Guid.NewGuid(),
                Email = "a@mail.ru",
                Password = "123"
            },
            new()
            {
                Id = Guid.NewGuid(),
                Email = "b@mail.ru",
                Password = "123"
            },
            new()
            {
                Id = Guid.NewGuid(),
                Email = "c@mail.ru",
                Password = "123"
            },
            new()
            {
                Id = Guid.NewGuid(),
                Email = "d@mail.ru",
                Password = "123"
            },
        };
        return users;
    }
    
    private UsersEntity testUser = new UsersEntity()
    {
        Id = Guid.Parse("68659e6d-a97e-4543-b57a-774015406d8c"),
        Email = "f@mail.ru",
        Password = "123",
        RefreshToken = "111"
    };
    

    private Mock<IUserService> _userService;
    private Mock<ILogger<UsersController>> _logger;
    private UsersController _controller;
    
    [SetUp]
    public void Setup()
    {
        _userService = new Mock<IUserService>();
        _logger = new Mock<ILogger<UsersController>>();
        _controller = new UsersController(_userService.Object, _logger.Object);

        _userService.Setup(repo => repo.GetAll()).Returns(GetTestUsers());
    }
    
    [Test]
    public void GetAllTest()
    {
        // Arrange
        // _userService.Setup(repo=>repo.GetAll()).Returns(GetTestUsers());

        // Act
        var result = _controller.GetAll();
        
        // Assert
        var viewResult = (OkObjectResult) result;
        Assert.IsAssignableFrom<List<UsersEntity>>(viewResult.Value);
        var model = (List<UsersEntity>)viewResult.Value;
        Assert.AreEqual(GetTestUsers().Count, model.Count);
    }

    [Test]
    public void SuccessUpdateRefreshTokenTest()
    {
        // Arrange
        _userService.Setup(repo => repo.UpdateTokens(testUser, "111")).Returns(new AuthenticateResponse(testUser, "222", "223"));
        _userService.Setup(repo => repo.GetById(Guid.Parse("68659e6d-a97e-4543-b57a-774015406d8c"))).Returns(testUser);
        
        // Act
        var result = _controller.UpdateRefreshToken(Guid.Parse("68659e6d-a97e-4543-b57a-774015406d8c"), "111");
        
        // Assert
        var okResult = (OkObjectResult) result;
        var value = (AuthenticateResponse)okResult.Value;
        Assert.AreEqual(typeof(AuthenticateResponse), value.GetType());
    }

    [Test]
    public void BadUpdateRefreshToken()
    {
        // Arrange
        _userService.Setup(repo => repo.UpdateTokens(testUser, "111")).Returns(new AuthenticateResponse(testUser, "222", "223"));
        _userService.Setup(repo => repo.GetById(Guid.Parse("68659e6d-a97e-4543-b57a-774015406d9c"))).Returns(testUser);

        // Act
        var result = _controller.UpdateRefreshToken(Guid.Parse("68659e6d-a97e-4543-b57a-774015406d8c"), "111");
        
        // Assert
        var badResult = (NoContentResult) result;
        // var value = (AuthenticateResponse)okResult.Value;
        Assert.AreEqual(typeof(NoContentResult), badResult.GetType());
    }
}