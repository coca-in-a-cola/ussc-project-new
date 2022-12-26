using AutoMapper;
using USSC.Dto;
using USSC.Entities;

namespace USSC;

public class ApplicationProfile: Profile
{
    public ApplicationProfile()
    {
        CreateMap<RequestModel, RequestEntity>()
            .ForMember(dst => dst.Id, 
                opt => opt.Ignore())
            .ForMember(dst => dst.Allow, 
                opt => opt.MapFrom(src => src.Allow))
            .ForMember(dst => dst.Directions, 
                opt => opt.MapFrom(src => src.Directions))
            .ForMember(dst => dst.Users, 
                opt => opt.MapFrom(src => src.Users))
            .ForMember(dst => dst.UserId, 
                opt => opt.MapFrom(src => src.UserId))
            .ForMember(dst => dst.DirectionId, 
                opt => opt.MapFrom(src => src.DirectionId))
            //.ForMember(dst => dst.Telegram, opt => opt.MapFrom(src => src.Telegram))
            ;
    }
}