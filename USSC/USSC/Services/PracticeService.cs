using AutoMapper;
using USSC.Dto;
using USSC.Entities;

namespace USSC.Services;

public class PracticeService: IPracticeService
{
    private readonly IPracticeRepository _practiceRepository;
    private readonly IMapper _mapper;

    public PracticeService(IPracticeRepository practiceRepository, IMapper mapper)
    {
        _practiceRepository = practiceRepository;
        _mapper = mapper;
    }

    public IEnumerable<PracticesEntity> GetAll() => _practiceRepository.GetAll();

    public PracticesEntity GetById(Guid id) => _practiceRepository.GetById(id);
    
    public async Task<Guid> UpdateAsync(PracticesModel profileModel)
    {
        var entity = _mapper.Map<PracticesEntity>(profileModel);
        var id = await _practiceRepository.Update(entity);
        return id;
    }

    public async Task<SuccessResponse> AddAsync(PracticesModel model)
    {
        var entity = _mapper.Map<PracticesEntity>(model);
        var id = await _practiceRepository.Add(entity);
        return new SuccessResponse(entity.Id == id);
    }

    public async Task<SuccessResponse> Delete(Guid id)
    {
        try
        {
            var practice = _practiceRepository.GetById(id);
            await _practiceRepository.Delete(practice);
            return new SuccessResponse(true);
        }
        catch
        {
            return new SuccessResponse(false);
        }
        
    }
}