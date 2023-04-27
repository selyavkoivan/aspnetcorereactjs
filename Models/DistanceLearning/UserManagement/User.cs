using Microsoft.AspNetCore.Identity;

namespace DistanceLearningSystem.Models.DistanceLearning.UserManagement;

public class User : IdentityUser
{
    public string? Name { get; set; }
    public string? Surname { get; set; }
    public string? Patronymic { get; set; }
    
    public string? NewEmail { get; set; }
    public string? AvatarUrl { get; set; }
    
    public User(UserDto userDto)
    {
        UserName = userDto.Username;
        Email = userDto.Email;
    }

    public User()
    {
    }

    public void UpdateFromDto(UserDto userDto)
    {
        UserName = userDto.Username;
        Name = userDto.Name;
        Surname = userDto.Surname;
        Patronymic = userDto.Patronymic;
    }

    public void UpdateEmailFromDto(UserDto userDto)
    {
        NewEmail = userDto.Email;
    }
}