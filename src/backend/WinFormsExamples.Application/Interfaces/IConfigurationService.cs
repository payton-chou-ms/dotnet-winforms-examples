using WinFormsExamples.Application.DTOs;

namespace WinFormsExamples.Application.Interfaces;

public interface IConfigurationService
{
    Task<SplashScreenConfigurationDto> GetSplashScreenConfigurationAsync();
}
