using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using USSC.Controllers;
using USSC.Dto;
using USSC.Entities;
using USSC.Services;

namespace UnitTests;

public class ProfileControllerTests
{
    private Mock<IProfileService> _profileService;
    private Mock<IUserService> _userService;
    private Mock<ILogger<ProfileController>> _logger;
    private ProfileController _controller;

    private ProfileModel _testModel = new()    
    {
        FirstName = "1",
        SecondName = "2",
        Patronymic = "3",
        Phone = "4",
        Course = 5,
        Faculty = "F",
        Id = Guid.Parse("68659e6d-a97e-4543-b57a-774015406d8c"),
        UserId = Guid.Parse("68659e6d-a97e-4543-b57a-774015406d8c")
    }; 
    
    private ProfileEntity _testEntity = new()
    {
        FirstName = "1",
        SecondName = "2",
        Patronymic = "3",
        Phone = "4",
        Course = 5,
        Faculty = "F",
        Id = Guid.Parse("68659e6d-a97e-4543-b57a-774015406d8c"),
        UserId = Guid.Parse("68659e6d-a97e-4543-b57a-774015406d8c")
    }; 
    
    private UsersEntity testUser = new()
    {
        Id = Guid.Parse("68659e6d-a97e-4543-b57a-774015406d8c"),
        Email = "f@mail.ru",
        Password = "123",
        RefreshToken = "111"
    };

    [SetUp]
    public void Setup()
    {
        _profileService = new Mock<IProfileService>();
        _userService = new Mock<IUserService>();
        _logger = new Mock<ILogger<ProfileController>>();
        _controller = new ProfileController(_profileService.Object, _userService.Object, _logger.Object);
    }

    [Test]
    public void SuccessCreateProfileTestAsync()
    {
        // Arrange
        // _profileService.Setup(repo => repo.GetByUserId(Guid.Parse("68659e6d-a97e-4543-b57a-774015406d8c"))).Returns(_testEntity);
        _userService.Setup(repo => repo.GetById(Guid.Parse("68659e6d-a97e-4543-b57a-774015406d8c"))).Returns(testUser);
        _profileService.Setup(repo => repo.Add(_testModel)).ReturnsAsync(Guid.Parse("68659e6d-a97e-4543-b57a-774015406d8c"));
        
        // Act
        var result = _controller.FillProfileInfo(_testModel).Result;
        var response = (OkObjectResult) result;
        
        // Assert
        Assert.AreEqual(typeof(SuccessResponse), response.Value.GetType());
        Assert.AreEqual(result.GetType(), typeof(OkObjectResult));
    }
    
    [Test]
    public void BadCreateProfileTestAsync()
    {
        // Arrange
        // _profileService.Setup(repo => repo.GetByUserId(Guid.Parse("68659e6d-a97e-4555-b57a-774015406d8c"))).Returns(_testEntity);
        _userService.Setup(repo => repo.GetById(Guid.Parse("68659e6d-a97e-0543-b57a-774015406d8c"))).Returns(testUser);
        _profileService.Setup(repo => repo.Add(_testModel)).ReturnsAsync(Guid.Parse("68659e6d-a97e-4543-b57a-774015406d8c"));
        
        // Act
        var result = _controller.FillProfileInfo(_testModel).Result;
        var response = (NoContentResult) result;
        
        // Assert
        Assert.AreEqual(response.GetType(), typeof(NoContentResult));
    }

    [Test]
    public void SuccessGetProfiileInfoByIdTest()
    {
        // Assert
        _profileService.Setup(repo => repo.GetByUserId(Guid.Parse("68659e6d-a97e-4555-b57a-774015406d8c"))).Returns(_testEntity);
        // Act
        var result = _controller.GetProfileInfo(Guid.Parse("68659e6d-a97e-4555-b57a-774015406d8c"));
        var response = (OkObjectResult) result;

        //Assert
        Assert.AreEqual(response.Value, _testEntity);
        Assert.AreEqual(result.GetType(), typeof(OkObjectResult));
    }
    
    [Test]
    public void BadGetProfiileInfoByIdTest()
    {
        // Assert
        _profileService.Setup(repo => repo.GetByUserId(Guid.Parse("68659e6d-a97e-3421-b57a-774015406d8c"))).Returns(_testEntity);
        // Act
        var result = _controller.GetProfileInfo(Guid.Parse("68659e6d-a97e-4555-b57a-774015406d8c"));
        var response = (NoContentResult) result;

        //Assert
        // Assert.AreEqual(response.Value, _testEntity);
        Assert.AreEqual(result.GetType(), typeof(NoContentResult));
    }
}