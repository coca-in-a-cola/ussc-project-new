using AutoMapper;
using USSC.Dto;
using USSC.Entities;

namespace USSC.Profiles;

public class ProfileUserProfile : Profile
{
    public ProfileUserProfile()
    {
        CreateMap<ProfileModel, ProfileEntity>()
            .ForMember(dst => dst.Course, opt => opt.MapFrom(src => src.Course))
            .ForMember(dst => dst.Faculty, opt => opt.MapFrom(src => src.Faculty))
            .ForMember(dst => dst.Patronymic, opt => opt.MapFrom(src => src.Patronymic))
            .ForMember(dst => dst.Phone, opt => opt.MapFrom(src => src.Phone))
            .ForMember(dst => dst.Speciality, opt => opt.MapFrom(src => src.Speciality))
            .ForMember(dst => dst.Telegram, opt => opt.MapFrom(src => src.Telegram))
            .ForMember(dst => dst.University, opt => opt.MapFrom(src => src.University))
            .ForMember(dst => dst.Users, opt => opt.Ignore())
            .ForMember(dst => dst.FirstName, opt => opt.MapFrom(src => src.FirstName))
            .ForMember(dst => dst.SecondName, opt => opt.MapFrom(src => src.SecondName))
            .ForMember(dst => dst.UserId, opt => opt.MapFrom(src => src.UserId))
            .ForMember(dst => dst.WorkExperience, opt => opt.MapFrom(src => src.WorkExperience))
            .ForMember(dst => dst.Id, opt => opt.Ignore());

        
    }
}