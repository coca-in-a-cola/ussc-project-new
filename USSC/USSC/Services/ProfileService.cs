using AutoMapper;
using USSC.Dto;
using USSC.Entities;

namespace USSC.Services;

public class ProfileService : IProfileService
{
    private readonly IProfileRepository _profileRepository;
    private readonly IConfiguration _configuration;
    private readonly IMapper _mapper;

    public ProfileService(IProfileRepository profileRepository, IConfiguration configuration, IMapper mapper)
    {
        _profileRepository = profileRepository;
        _configuration = configuration;
        _mapper = mapper;
    }
    
    public Task<Guid> Add(ProfileModel profileModel)
    {
        var profile = _mapper.Map<ProfileEntity>(profileModel);
        return _profileRepository.Add(profile);
    }

    public ProfileEntity GetById(Guid id) => _profileRepository.GetById(id);

    public ProfileEntity GetByUserId(Guid userId) => _profileRepository.GetByUserId(userId);

    public async Task<Guid?> Update(ProfileModel profileModel)
    {
        var profile = _profileRepository.GetByUserId(profileModel.UserId);
        if (profile is null)
            return null;
        foreach (var field in profileModel.GetType().GetProperties())
        {
            var prop = profile.GetType().GetProperty(field.Name);
            if (prop?.GetValue(profile) != field.GetValue(profileModel) 
                && field.PropertyType.FullName == prop.PropertyType.FullName
                && field.GetCustomAttributes(true).Equals(prop.GetCustomAttributes(true)))
            {
                prop?.SetValue(profile, field.GetValue(profileModel));
            }
        }

        return await _profileRepository.Update(profile);
    }
}