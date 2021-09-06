using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Http;
using Moq;
using Moq.Protected;
using NUnit.Framework;
using OpenPass.IdController.Helpers;
using OpenPass.IdController.Helpers.Adapters;
using OpenPass.IdController.Helpers.Configuration;
using OpenPass.IdController.Models.Configuration;
using Owid.Client;
using Owid.Client.Model.Configuration;
using Swan.Client;
using Swan.Client.Model;
using Swan.Client.Model.Configuration;
using Swan.Client.Test;

namespace OpenPass.IdController.UTest.Helpers.Adapters
{
    [TestFixture]
    class SwanConnectionTests
    {
        private ISwanConnection _swanConnection;
        private Creator _owidCreator;
        protected static readonly HttpContext _httpContext =
            new DefaultHttpContext();
        protected static readonly HttpClient _client = new HttpClient(
            new HttpClientHandler()
            {
                AutomaticDecompression =
                    DecompressionMethods.GZip | DecompressionMethods.Deflate
            });

        [SetUp]
        public void SetUp()
        {
            using (var rsa = new RSACryptoServiceProvider(512))
            {
                var parameters = rsa.ExportParameters(true);
                var pubKeyBytes = rsa.ExportSubjectPublicKeyInfo();
                var privKeyBytes = rsa.ExportPkcs8PrivateKey();
                var publicPEM = new String(PemEncoding.Write("PUBLIC KEY", pubKeyBytes));
                var privatePEM = new String(PemEncoding.Write("PRIVATE KEY", privKeyBytes));
                var owidConfig = new OwidConfiguration()
                {
                    Domain = "localhost",
                    PrivateKey = privatePEM,
                    PublicKey = publicPEM
                };
                _swanConnection = new SwanConnection(
                    new SwanConfiguration()
                    {
                        AccessKey = "CMPKeySWAN",
                        AccessNode = "51db.uk",
                        Scheme = "https"
                    },
                    owidConfig
                    );
                _owidCreator = new Creator(owidConfig);
            }
        }

        [Test]
        public async Task CreateUrl()
        {
            // Create an update object with test data. Only SWAN operators can
            // create SWIDs so this must be fetched from the connection.
            var update = new Update(_swanConnection, _owidCreator);
            update.ReturnUrl = "https://test.com/path/";
            update.Request = _httpContext.Request;
            update.NodeCount = 1;
            update.Swid = _swanConnection.CreateSwid().Result.ToString();
            update.Email = "test@test.com";
            update.Pref = "on";
            update.Salt = "AAA=";

            // Get an update URL to use for redirection.
            var redirectUrl = await update.GetURL();
            Assert.IsNotNull(redirectUrl);
            Uri redirectUri;
            Assert.IsTrue(Uri.TryCreate(
                redirectUrl,
                UriKind.Absolute,
                out redirectUri));

            // Redirect the browser to the URL and get the URL that the browser
            // would be directed back to.
            var returnedUrl = await redirectUri.MockBrowserRedirect();

            // Get the encrypted data at the end of the string.
            var encrypted = returnedUrl.GetEncrypted();

            // Turn the encrypted data into raw SWAN data for use in a user
            // interface. Check the raw values are the ones we wanted to update
            // in the web browser's cookie store.
            var raw = await _swanConnection.DecryptRaw(encrypted);
            Assert.AreEqual(update.Email, raw.Email);
            Assert.AreEqual(update.Salt, raw.Salt);
            Assert.AreEqual(update.Pref, raw.Pref);
            Assert.IsTrue(await raw.SwidAsOwid.VerifyAsync());
            Assert.AreEqual(_swanConnection.AccessNode, raw.SwidAsOwid.Domain);

            // Turn the encrypted data into SWAN data for use in an Open RTB
            // transaction. Check the values are the ones expected from the 
            // update to the web browser's cookie store.
            var data = await _swanConnection.Decrypt(encrypted);

            // The SWID can only ever be created by the SWAN operator. Verify 
            // the SWID is valid and created by the operator.
            var swidOwid = new Owid.Client.Model.Owid(
                data.Single(i => "swid".Equals(i.Key)).Value);
            Assert.IsTrue(await swidOwid.VerifyAsync());
            Assert.AreEqual(_swanConnection.AccessNode, swidOwid.Domain);

            // The SID is created by the SWAN operator combining the Email and
            // the Salt. Verify that the SWAN operator created it.
            var sidOwid = new Owid.Client.Model.Owid(
                data.Single(i => "sid".Equals(i.Key)).Value);
            Assert.IsTrue(await sidOwid.VerifyAsync());
            Assert.AreEqual(_swanConnection.AccessNode, sidOwid.Domain);

            // The preference information is created by the User Interface
            // Provider. Verify it was created by this test.
            var prefOwid = new Owid.Client.Model.Owid(
                data.Single(i => "pref".Equals(i.Key)).Value);
            Assert.IsTrue(await prefOwid.VerifyAsync(_owidCreator.RSA));
            Assert.AreEqual(_owidCreator.Domain, prefOwid.Domain);

            // Verify that the raw "val" pair is present to indicate when the
            // SWAN operator wants the caller to re-validate the SWAN data in 
            // case it was changed by another operator.
            var val = data.Single(i => "val".Equals(i.Key)).Value;
            DateTime valDate;
            Assert.IsTrue(DateTime.TryParse(val, out valDate));
            Assert.IsTrue(valDate > DateTime.UtcNow);
        }
    }
}
