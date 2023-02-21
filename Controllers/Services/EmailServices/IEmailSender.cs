using clotheshop.Models.Email;

namespace mIndeleev.Controllers.Services.EmailServices;

public interface IEmailSender
{
    void SendEmail(Message message);
}