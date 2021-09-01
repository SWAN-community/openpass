using System.Net.Mail;
using System.Threading;
using System.Threading.Tasks;

namespace OpenPass.IdController.Email
{
    public interface IEmailProvider
    {
        /// <summary>
        /// Sends the email message in a task returning trie if the email was
        /// sent, otherwise false.
        /// </summary>
        /// <param name="message">
        /// A mail message with the to, from, subject and body parameters set.
        /// </param>
        /// <param name="stopToken">
        /// Token used to end the send operation.
        /// </param>
        /// <returns>True if the email was sent, otherwise false.</returns>
        Task<bool> Send(MailMessage message, CancellationToken stopToken);
    }
}
