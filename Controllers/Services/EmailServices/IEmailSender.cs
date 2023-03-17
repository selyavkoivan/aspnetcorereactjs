using DistanceLearningSystem.Models.Email;

namespace DistanceLearningSystem.Controllers.Services.EmailServices;

public interface IEmailSender
{
    void SendEmail(Message message);
}