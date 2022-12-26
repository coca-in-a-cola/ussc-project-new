using MailKit.Net.Smtp;
using MimeKit;

namespace USSC.Helpers;

public class EmailSender
{
    private readonly ILogger<EmailSender> _logger;

    public EmailSender(ILogger<EmailSender> logger)
    {
        _logger = logger;
    }
    public void SendEmail(string message, string mailTo)
    {
        try
        {
            var Mailmessage = new MimeMessage();
            Mailmessage.From.Add(new MailboxAddress("Моя компания",
                "teampincode@mail.ru")); //отправитель сообщения поменять адрес
            Mailmessage.To.Add(new MailboxAddress("Моя компания", mailTo)); //адресат сообщения поменять адрес
            Mailmessage.Subject = "Сообщение от USummerSchool"; //тема сообщения 
            Mailmessage.Body = new BodyBuilder() { HtmlBody = $"<div style=\"color: orange;\">{message}</div>" }
                .ToMessageBody(); //тело сообщения (так же в формате HTML)

            using (SmtpClient client = new SmtpClient())
            {
                client.Connect("smtp.mail.ru", 465, true); //либо использум порт 465
                client.Authenticate("teampincode@mail.ru", "sh3RnqZP"); //логин-пароль от аккаунта
                client.Send(Mailmessage);

                client.Disconnect(true);
                _logger.LogInformation("Сообщение отправлено успешно!");
            }
        }
        catch (Exception e)
        {
            _logger.LogInformation("Ошибка в отправке сообщения");
        }
    }
}