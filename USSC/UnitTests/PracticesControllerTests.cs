using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using USSC.Controllers;
using USSC.Dto;
using USSC.Entities;
using USSC.Services;

namespace UnitTests;

public class PracticesControllerTests
{
    private List<PracticesEntity> _testAll = new();

    private Mock<IPracticeService> _pracitcesService;
    private Mock<ILogger<PracticesController>> _logger;
    private PracticesController _controller;
    
    [SetUp]
    public void Setup()
    {
        _pracitcesService = new Mock<IPracticeService>();
        _logger = new Mock<ILogger<PracticesController>>();

        _controller = new PracticesController(_pracitcesService.Object);
        
        _testAll.Add(new PracticesEntity()
        {
            Id = Guid.Parse("68659e6d-a97e-4543-b57a-774015406d8c"),
            Info = "s",
            Name = "s",
            Description = "s",
        });
        _testAll.Add(new PracticesEntity()
        {
            Id = Guid.Parse("68659e6d-a98e-4543-b57a-774015406d8c"),
            Info = "s1",
            Name = "s1",
            Description = "s1",
        });
    }

    [Test]
    public void SuccessGetPractices()
    {
        // Arrange
        _pracitcesService.Setup(repo => repo.GetAll()).Returns(_testAll);
        
        // Act
        var result = _controller.GetPractices();
        var response = (OkObjectResult) result;
        // Assert
        Assert.AreEqual(response.Value.GetType(), typeof(List<PracticesEntity>));
    }
    
    [Test]
    public void BadGetPractices()
    {
        // Arrange
        _pracitcesService.Setup(repo => repo.GetAll()).Returns(new List<PracticesEntity>());
        
        // Act
        var result = _controller.GetPractices();
        var response = (NoContentResult) result;
        // Assert
        Assert.AreEqual(response.GetType(), typeof(NoContentResult));
    }

    [Test]
    public void SuccessCreatePractices()
    {
        // Arrange
        var model = new PracticesModel()
        {
            Id = Guid.Parse("68659e6d-a98e-4543-b57a-774015406d8c"),
            Info = "s1",
            Name = "s1",
            Descriptions = "s1",
        };
        _pracitcesService.Setup(repo => repo.AddAsync(model)).ReturnsAsync(new SuccessResponse(true));
        
        // Act
        var result = _controller.CreatePractices(model).Result;
        var response = (OkObjectResult) result;
        
        // Assert
        Assert.AreEqual(response.Value.GetType(), typeof(SuccessResponse));
    }
}