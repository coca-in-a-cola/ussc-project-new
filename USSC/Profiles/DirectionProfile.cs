using AutoMapper;
using USSC.Dto;
using USSC.Entities;

namespace USSC.Profiles;

public class DirectionProfile : Profile
{
    public DirectionProfile()
    {
        CreateMap<DirectionsModel, DirectionsEntity>()
            .ForMember(dst => dst.Directions, opt => opt.MapFrom(src => src.Directions))
            .ForMember(dst => dst.Path, opt => opt.MapFrom(src => src.Path))
            .ForMember(dst => dst.Id, opt => opt.Ignore())
            .ForMember(dst => dst.Practices, opt => opt.Ignore())
            .ForMember(dst => dst.Request, opt => opt.Ignore())
            .ForMember(dst => dst.TestCase, opt => opt.Ignore());


    }
}