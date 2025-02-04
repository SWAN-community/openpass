using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Moq;
using NUnit.Framework;
using OpenPass.IdController.Helpers;
using OpenPass.IdController.Helpers.Adapters;
using Owid.Client.Model.Configuration;
using Owid.Client;
using Swan.Client;
using Swan.Client.Model.Configuration;
using System.Security.Cryptography;
using System;

namespace OpenPass.IdController.UTest.Helpers
{
    [TestFixture]
    public class IdentifierHelperTests
    {
        private Mock<IMetricHelper> _metricHelperMock;
        private Mock<ICookieHelper> _cookieHelperMock;
        private Mock<IIdentifierAdapter> _uid2AdapterMock;
        private ISwanConnection _swanConnection;
        private IdentifierHelper _identifierHelper;

        [SetUp]
        public void Setup()
        {
            _metricHelperMock = new Mock<IMetricHelper>();
            _metricHelperMock.Setup(mh => mh.SendCounterMetric(It.IsAny<string>()));
            _cookieHelperMock = new Mock<ICookieHelper>();
            _uid2AdapterMock = new Mock<IIdentifierAdapter>();
            using (var crypto = ECDsa.Create(ECCurve.NamedCurves.nistP256))
            {
                var parameters = crypto.ExportParameters(true);
                var pubKeyBytes = crypto.ExportSubjectPublicKeyInfo();
                var privKeyBytes = crypto.ExportPkcs8PrivateKey();
                var publicPEM = new String(PemEncoding.Write("PUBLIC KEY", pubKeyBytes));
                var privatePEM = new String(PemEncoding.Write("PRIVATE KEY", privKeyBytes));
                _swanConnection = new SwanConnection(
                    new SwanConfiguration()
                    {
                        AccessKey = "CMPKeySWAN",
                        AccessNode = "51db.uk",
                        Scheme = "https"
                    },
                    new OwidConfiguration()
                    {
                        Domain = "localhost",
                        PrivateKey = privatePEM,
                        PublicKey = publicPEM
                    });
            }
            _identifierHelper = new IdentifierHelper(
                _metricHelperMock.Object,
                _cookieHelperMock.Object,
                _uid2AdapterMock.Object,
                _swanConnection);
        }

        [Test]
        public void GetOrCreateIfaToken_IfaTokenExists_TokensAreTheSame()
        {
            // Arrange
            var expectedIfaToken = "ifaToken";
            _cookieHelperMock.Setup(x => x.TryGetIdentifierForAdvertisingCookie(It.IsAny<IRequestCookieCollection>(), out expectedIfaToken))
                .Returns(true);

            // Act
            var token = _identifierHelper.GetOrCreateIfaToken(It.IsAny<IRequestCookieCollection>(), It.IsAny<string>());

            // Assert
            Assert.AreEqual(expectedIfaToken, token);
        }

        [Test]
        public void GetOrCreateIfaToken_IfaTokenDoesNotExists_NewTokenIsCreated()
        {
            // Arrange
            var expectedIfaToken = string.Empty;
            _cookieHelperMock.Setup(x => x.TryGetIdentifierForAdvertisingCookie(It.IsAny<IRequestCookieCollection>(), out expectedIfaToken))
                .Returns(false);

            // Act
            var token = _identifierHelper.GetOrCreateIfaToken(It.IsAny<IRequestCookieCollection>(), It.IsAny<string>());

            // Assert
            Assert.AreNotEqual(expectedIfaToken, token);
            Assert.IsTrue(new Owid.Client.Model.Owid(token).VerifyAsync().Result);
        }

        [TestCase("token", 1)]
        [TestCase("", 0)]
        [TestCase(null, 0)]
        public async Task TryGetUid2TokenAsync_AllDataPassed_ShouldWorkCorrectly(string expectedUid2Token, int timesCalled)
        {
            // Arrange
            var email = "test@test.com";
            _uid2AdapterMock.Setup(x => x.GetId(email)).ReturnsAsync(expectedUid2Token);

            // Act
            var uid2Token = await _identifierHelper.TryGetUid2TokenAsync(
                It.IsAny<IResponseCookies>(),
                email,
                It.IsAny<string>());

            // Assert
            Assert.AreEqual(expectedUid2Token, uid2Token);

            _cookieHelperMock.Verify(x =>
                x.SetUid2AdvertisingCookie(It.IsAny<IResponseCookies>(), It.Is<string>(token => token == uid2Token)),
                Times.Exactly(timesCalled));
        }
    }
}
