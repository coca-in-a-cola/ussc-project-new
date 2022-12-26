using AutoMapper;
using USSC.Dto;
using USSC.Entities;

namespace USSC.Profiles;

public class PracticesProfile : Profile
{
    public PracticesProfile()
    {
        CreateMap<PracticesModel, PracticesEntity>()
            .ForMember(dst => dst.Description, opt => opt.MapFrom(src => src.Descriptions))
            .ForMember(dst => dst.Info, opt => opt.MapFrom(src => src.Info))
            .ForMember(dst => dst.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dst => dst.StartPractices, opt => opt.MapFrom(src => src.StartPractices))
            .ForMember(dst => dst.EndPractices, opt => opt.MapFrom(src => src.EndPractices))
            .ForMember(dst => dst.Directions, opt => opt.MapFrom(src => src.Directions))
            ;
    }
}