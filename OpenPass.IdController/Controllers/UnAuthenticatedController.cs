using Microsoft.AspNetCore.Mvc;
using OpenPass.IdController.Helpers;

namespace OpenPass.IdController.Controllers
{
    [Route("api/[controller]")]
    public class UnAuthenticatedController : Controller
    {
        private static readonly string _metricPrefix = "unauthenticated";

        private readonly ICookieHelper _cookieHelper;
        private readonly IMetricHelper _metricHelper;
        private readonly IIdentifierHelper _identifierHelper;
        private readonly ITrackingHelper _trackingHelper;

        public UnAuthenticatedController(
            IMetricHelper metricHelper,
            ICookieHelper cookieHelper,
            IIdentifierHelper identifierHelper,
            ITrackingHelper trackingHelper)
        {
            _metricHelper = metricHelper;
            _cookieHelper = cookieHelper;
            _identifierHelper = identifierHelper;
            _trackingHelper = trackingHelper;
        }

        [HttpPost]
        public IActionResult CreateIfa(
            [FromHeader(Name = "User-Agent")] string userAgent,
            [FromHeader(Name = "x-tracked-data")] string trackedData,
            [FromHeader(Name = "x-origin-host")] string originHost)
        {
            var prefix = $"{_metricPrefix}.create";

            if (_cookieHelper.TryGetUid2AdvertisingCookie(Request.Cookies, out var uid2Token))
            {
                _metricHelper.SendCounterMetric($"{prefix}.uid2");
            }

            var trackingModel = _trackingHelper.TryGetWidgetParameters(trackedData);
            var ifaToken = _identifierHelper.GetOrCreateIfaToken(Request.Cookies, trackingModel, prefix, originHost, userAgent);

            // Set cookie
            _cookieHelper.SetIdentifierForAdvertisingCookie(Response.Cookies, ifaToken);

            return Ok(new { ifaToken, uid2Token });
        }

        [HttpGet("delete")]
        public IActionResult DeleteIfa()
        {
            _metricHelper.SendCounterMetric($"{_metricPrefix}.delete");
            _cookieHelper.RemoveUid2AdvertisingCookie(Response.Cookies);

            return Ok();
        }
    }
}
