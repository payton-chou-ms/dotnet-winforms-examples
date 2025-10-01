using Microsoft.AspNetCore.Mvc;
using WinFormsExamples.Application.DTOs;
using WinFormsExamples.Application.Interfaces;

namespace WinFormsExamples.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class ConfigurationController : ControllerBase
{
    private readonly IConfigurationService _configurationService;
    private readonly ILogger<ConfigurationController> _logger;

    public ConfigurationController(
        IConfigurationService configurationService,
        ILogger<ConfigurationController> logger)
    {
        _configurationService = configurationService;
        _logger = logger;
    }

    /// <summary>
    /// Get splash screen configuration
    /// 取得啟動畫面配置
    /// </summary>
    [HttpGet("splash-screen")]
    [ProducesResponseType(typeof(SplashScreenConfigurationDto), StatusCodes.Status200OK)]
    public async Task<ActionResult<SplashScreenConfigurationDto>> GetSplashScreenConfiguration()
    {
        try
        {
            var config = await _configurationService.GetSplashScreenConfigurationAsync();
            return Ok(config);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting splash screen configuration");
            return StatusCode(500, new { message = "An error occurred while retrieving configuration" });
        }
    }
}
