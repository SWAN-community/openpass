using System;
using System.Threading.Tasks;
using Criteo.UserIdentification;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using OpenPass.IdController.Controllers;
using OpenPass.IdController.Helpers;
using OpenPass.IdController.Helpers.Adapters;
using OpenPass.IdController.Models;
using static Criteo.Glup.IdController.Types;


namespace OpenPass.IdController.UTest.Controllers
{
    [TestFixture]
    public class UnAuthenticatedControllerTests
    {
        private const string _testUserAgent = "TestUserAgent";
        private const string _testOriginHost = "origin.host";

        private Mock<IIdentifierAdapter> _uid2AdapterMock;
        private Mock<IMetricHelper> _metricHelperMock;
        private Mock<ICookieHelper> _cookieHelperMock;
        private Mock<IGlupHelper> _glupHelperMock;
        private UnAuthenticatedController _unauthenticatedController;
        private GenerateRequest _request;

        [SetUp]
        public void Setup()
        {
            _uid2AdapterMock = new Mock<IIdentifierAdapter>();
            _metricHelperMock = new Mock<IMetricHelper>();
            _metricHelperMock.Setup(mr => mr.SendCounterMetric(It.IsAny<string>()));
            _cookieHelperMock = new Mock<ICookieHelper>();
            _glupHelperMock = new Mock<IGlupHelper>();
            _request = new GenerateRequest { OriginHost = _testOriginHost };

            _unauthenticatedController = new UnAuthenticatedController(_uid2AdapterMock.Object, _metricHelperMock.Object, _cookieHelperMock.Object, _glupHelperMock.Object)
            {
                ControllerContext = new ControllerContext { HttpContext = new DefaultHttpContext() }
            };
        }

        [Test]
        public async Task TestCreateIdentifier()
        {
            var returnedToken = "FreshUID2token";
            string placeholder;
            _cookieHelperMock.Setup(c => c.TryGetIdentifierCookie(It.IsAny<IRequestCookieCollection>(), out placeholder)).Returns(false);
            _uid2AdapterMock.Setup(c => c.GetId(It.IsAny<string>())).ReturnsAsync(returnedToken);

            var response = await _unauthenticatedController.GetOrCreateIfa(_testUserAgent, _request);

            // Returned identifier
            var data = GetResponseData(response);
            var token = (string) data.token;

            // Assert
            Assert.AreEqual(returnedToken, token);

            // Identifier generated
            _uid2AdapterMock.Verify(a => a.GetId(It.IsAny<string>()), Times.Once);

            // Cookie is set set
            _cookieHelperMock.Verify(c => c.SetIdentifierCookie(
                It.IsAny<IResponseCookies>(),
                It.Is<string>(k => k == token)), Times.Once);

            // Glup is emitted
            _glupHelperMock.Verify(g => g.EmitGlup(
                    It.Is<EventType>(e => e == EventType.NewIfa),
                    It.Is<string>(h => h == _testOriginHost),
                    It.IsAny<string>(),
                    It.IsAny<LocalWebId?>(),
                    It.IsAny<CriteoId?>(),
                    It.IsAny<UserCentricAdId?>()),
                Times.Once);
        }

        [Test]
        public async Task TestAdapterError()
        {
            // Arrange
            const string returnedToken = null;
            string placeholder;
            _cookieHelperMock.Setup(c => c.TryGetIdentifierCookie(It.IsAny<IRequestCookieCollection>(), out placeholder)).Returns(false);
            _uid2AdapterMock.Setup(c => c.GetId(It.IsAny<string>())).ReturnsAsync(returnedToken);

            // Act
            var response = await _unauthenticatedController.GetOrCreateIfa(_testUserAgent, _request);

            // Assert
            // Not found -> adapter not available
            Assert.IsAssignableFrom<NotFoundResult>(response);

            // Cookie is set set
            _cookieHelperMock.Verify(c => c.SetIdentifierCookie(
                It.IsAny<IResponseCookies>(),
                It.IsAny<string>()), Times.Never);
        }

        [Test]
        public async Task TestGetIdentifierFromCookie()
        {
            // Arrange
            var idUserSide = Guid.NewGuid().ToString();
            _cookieHelperMock.Setup(c => c.TryGetIdentifierCookie(It.IsAny<IRequestCookieCollection>(), out idUserSide)).Returns(true);

            // Act
            var response = await _unauthenticatedController.GetOrCreateIfa(_testUserAgent, _request);

            // Returned IFA
            var data = GetResponseData(response);
            var token = data.token;

            // Assert
            Assert.AreEqual(idUserSide, token);

            // Cookie is set set
            _cookieHelperMock.Verify(c => c.SetIdentifierCookie(
                It.IsAny<IResponseCookies>(),
                It.Is<string>(k => k == idUserSide)), Times.Once);

            // Glup is emitted
            _glupHelperMock.Verify(g => g.EmitGlup(
                    It.Is<EventType>(e => e == EventType.ReuseIfa),
                    It.Is<string>(h => h == _testOriginHost),
                    It.IsAny<string>(),
                    It.IsAny<LocalWebId?>(),
                    It.IsAny<CriteoId?>(),
                    It.IsAny<UserCentricAdId?>()),
                Times.Once);
        }

        [Test]
        public void TestDeleteIfa()
        {
            // Arrange
            var response = _unauthenticatedController.DeleteIfa();

            // Act
            var data = GetResponseData(response);
            Assert.IsNull(data);

            // Assert
            _cookieHelperMock.Verify(c => c.RemoveIdentifierCookie(It.IsAny<IResponseCookies>()), Times.Once);
        }

        #region Helpers

        private static dynamic GetResponseData(IActionResult response)
        {
            var responseContent = response as OkObjectResult;
            var data = responseContent?.Value;

            return data;
        }

        #endregion Helpers
    }
}
