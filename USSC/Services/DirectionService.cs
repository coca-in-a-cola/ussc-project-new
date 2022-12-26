using AutoMapper;
using USSC.Dto;
using USSC.Entities;

namespace USSC.Services;

public class DirectionService : IDirectionService
{
    private readonly IDirectionRepository _directionRepository;
    private readonly IConfiguration _configuration;
    private readonly IMapper _mapper;

    public DirectionService(IDirectionRepository directionRepository, IConfiguration configuration, IMapper mapper)
    {
        _directionRepository = directionRepository;
        _configuration = configuration;
        _mapper = mapper;
    }
    
    public Task<Guid> Add(DirectionsModel directionsModel)
    {
        var profile = _mapper.Map<DirectionsEntity>(directionsModel);
        return _directionRepository.Add(profile);
    }
    
    public DirectionsEntity GetById(Guid id)
    {
        return _directionRepository.GetById(id);
    }

    public async Task<SuccessResponse> Delete(Guid id)
    {
        try
        {
            var direction = _directionRepository.GetById(id);
            await _directionRepository.Delete(direction);
            return new SuccessResponse(true);
        }
        catch
        {
            return new SuccessResponse(false);
        }
        
    }
    
    public async Task<Guid> UpdateAsync(DirectionsModel directionsModel)
    {
        var entity = _directionRepository.GetById(directionsModel.Id);
        entity.Directions = directionsModel.Directions;
        entity.Path = directionsModel.Path;
        var id = await _directionRepository.Update(entity);
        return id;
    }
}