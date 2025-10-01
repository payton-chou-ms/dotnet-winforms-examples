using WinFormsExamples.Application.DTOs;
using WinFormsExamples.Application.Interfaces;

namespace WinFormsExamples.Application.Services;

public class ConfigurationService : IConfigurationService
{
    public Task<SplashScreenConfigurationDto> GetSplashScreenConfigurationAsync()
    {
        var config = new SplashScreenConfigurationDto
        {
            LogoUrl = "/assets/images/animated-logo.gif",
            AppTitle = "WinForms Examples Web",
            AppVersion = "1.0.0",
            DisplayDurationMs = 10000
        };

        return Task.FromResult(config);
    }
}
