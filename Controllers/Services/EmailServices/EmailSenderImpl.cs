using clotheshop.Models.Email;
using MailKit.Net.Smtp;
using MimeKit;
using mIndeleev.Models.Email;

namespace mIndeleev.Controllers.Services.EmailServices;

public class EmailSenderImpl : IEmailSender
{
    private readonly EmailConfiguration _emailConfig;

    public EmailSenderImpl(EmailConfiguration emailConfig)
    {
        _emailConfig = emailConfig;
    }

    public async void SendEmail(Message message)
    {
        var emailMessage = CreateEmailMessage(message);
        await Send(emailMessage);
    }

    private MimeMessage CreateEmailMessage(Message message)
    {
        var emailMessage = new MimeMessage();
        emailMessage.From.Add(new MailboxAddress(_emailConfig.From, _emailConfig.From));
        emailMessage.To.AddRange(message.To);
        emailMessage.Subject = message.Subject;
        var bodyBuilder = new BodyBuilder
        {
            HtmlBody = message.Content
        };
        emailMessage.Body = bodyBuilder.ToMessageBody();

        return emailMessage;
    }

    private async Task Send(MimeMessage mailMessage)
    {
        using var client = new SmtpClient();

        try
        {
            await client.ConnectAsync(_emailConfig.SmtpServer, _emailConfig.Port, true);
            await client.AuthenticateAsync(_emailConfig.From, _emailConfig.Password);
            await client.SendAsync(mailMessage);
        }

        finally
        {
            await client.DisconnectAsync(true);
            client.Dispose();
        }
    }
}