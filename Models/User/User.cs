using Microsoft.AspNetCore.Identity;

namespace DistanceLearningSystem.Models.User
{
    public class User: IdentityUser
    {
        public User(UserDto.UserDto userDto)
        {
            UserName = userDto.Username;
            Email = userDto.Email;
        }

        public User()
        {
        }
        
        
        public int? userInfoId { get; set; }
        //public virtual UserInfo? UserInfo { get; set; }
        
        //public bool IsUserInfo => UserInfo is not null;
    }
}

