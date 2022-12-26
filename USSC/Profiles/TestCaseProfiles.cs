using AutoMapper;
using USSC.Dto;
using USSC.Entities;

namespace USSC.Profiles;

public class TestCaseProfiles : Profile
{
    public TestCaseProfiles()
    {
        CreateMap<TestCaseModel, TestCaseEntity>()
            .ForMember(dst => dst.Id, opt => opt.Ignore())
            .ForMember(dst => dst.Allow, opt => opt.MapFrom(src => src.Allow))
            .ForMember(dst => dst.Comment, opt => opt.MapFrom(src => src.Comment))
            .ForMember(dst => dst.Path, opt => opt.MapFrom(src => src.Path))
            //.ForMember(dst => dst.Users, opt => opt.MapFrom(src => src.Users))
            .ForMember(dst => dst.Directions, opt => opt.MapFrom(src => src.Directions))
            .ForMember(dst => dst.DirectionId, opt => opt.MapFrom(src => src.DirectionId))
            .ForMember(dst => dst.UserId, opt => opt.MapFrom(src => src.UserId))
            .ForMember(dst => dst.DateTime, opt => opt.MapFrom(src => src.DateTime));
        //.ForAllMembers(x => x.Ignore());   
    }
}