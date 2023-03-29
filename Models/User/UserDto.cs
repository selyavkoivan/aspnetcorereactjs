namespace DistanceLearningSystem.Models.User
{
    public class UserDto
    {
        public string? Email { get; set; }
        public string? Username { get; set; }

        
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string? Patronymic { get; set; }
        
        private string? PasswordField;
        public string? Password
        {
            get {
                try
                {
                    return PasswordField!.Equals(RepeatedPassword) ? PasswordField : null;
                }
                catch (NullReferenceException)
                {
                    return string.Empty;
                }
            }
            set => PasswordField = value;
        }
    
        public string? RepeatedPassword { get; set; }

        public string? SignInPassword { get; set; }

        public bool RememberMe { get; set; } = false;
    }
}