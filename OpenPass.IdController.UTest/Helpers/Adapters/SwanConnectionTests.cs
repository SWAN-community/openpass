using Microsoft.AspNetCore.Http;
using NUnit.Framework;
using Owid.Client;
using Owid.Client.Model.Configuration;
using Swan.Client;
using Swan.Client.Model;
using Swan.Client.Model.Configuration;
using Swan.Client.Test;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace OpenPass.IdController.UTest.Helpers.Adapters
{
    /// <summary>
    /// Tests for the SWAN components within OpenPass. See 
    /// <see cref="Swan.Client.Test"/> for more tests of the SWAN client 
    /// wrapper and calls to SWAN.
    /// </summary>
    [TestFixture]
    class SwanConnectionTests
    {
        /// <summary>
        /// The Access Node for the SWAN operator to use with the test.
        /// </summary>
        private const string SwanAccessNode = "51db.uk";

        /// <summary>
        /// The Access Key provided by the SWAN operator to use with the test.
        /// The Access Key should have sufficient permission to decrypt SWAN
        /// data and also raw SWAN data for use with a User Interface Provider
        /// (UIP). See the <see cref="ISwanConnection.Decrypt(string)"/> and 
        /// <see cref="ISwanConnection.DecryptRaw(string)"/> methods.
        /// </summary>
        private const string SwanAccessKey = "CMPKeySWAN";

        /// <summary>
        /// Connection to SWAN with AccessNode and AccessKey.
        /// </summary>
        private ISwanConnection _swanConnection;

        /// <summary>
        /// Creator for the test OWIDs.
        /// </summary>
        private Creator _owidCreator;
                
        /// <summary>
        /// HTTP instances used to simulate requests that would be made by the
        /// web browser.
        /// </summary>
        protected static readonly HttpContext _httpContext =
            new DefaultHttpContext();
        protected static readonly HttpClient _client = new HttpClient(
            new HttpClientHandler()
            {
                AutomaticDecompression =
                    DecompressionMethods.GZip | DecompressionMethods.Deflate
            });

        /// <summary>
        /// New instances of the OWID creator for the tests and the SWAN 
        /// connection. A SWAN operator is needed for these tests to run.
        /// Set the <see cref="SwanAccessKey"/> and 
        /// <see cref="SwanAccessNode"/> constants with these values before 
        /// running these tests.
        /// </summary>
        [SetUp]
        public void SetUp()
        {
            using (var rsa = new RSACryptoServiceProvider(512))
            {
                //
                var parameters = rsa.ExportParameters(true);
                var pubKeyBytes = rsa.ExportSubjectPublicKeyInfo();
                var privKeyBytes = rsa.ExportPkcs8PrivateKey();
                var publicPEM = new String(PemEncoding.Write(
                    "PUBLIC KEY", 
                    pubKeyBytes));
                var privatePEM = new String(PemEncoding.Write(
                    "PRIVATE KEY",
                    privKeyBytes));
                var owidConfig = new OwidConfiguration()
                {
                    Domain = "localhost",
                    PrivateKey = privatePEM,
                    PublicKey = publicPEM
                };
                _swanConnection = new SwanConnection(
                    new SwanConfiguration()
                    {
                        AccessKey = SwanAccessKey,
                        AccessNode = SwanAccessNode,
                        Scheme = "https"
                    },
                    owidConfig
                    );
                _owidCreator = new Creator(owidConfig);
            }
        }

        /// <summary>
        /// Simulate the capture of data from a UI, storing it in SWAN, and 
        /// then redirecting back to a publisher to decrypt the SWAN data. Also
        /// includes the decryption of raw SWAN data to demonstrate how a User
        /// Interface Provider would use the encrypted information.
        /// </summary>
        /// <returns></returns>
        [Test]
        public async Task UpdateAndDecrypt()
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
            // in the web browser's cookie store. If the AccessKey is not
            // allowed to decrypt raw SWAN data then this will fail with an 
            // appropriate error message.
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
