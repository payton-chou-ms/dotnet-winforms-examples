namespace WinFormsExamples.Application.DTOs;

public class SplashScreenConfigurationDto
{
    public string LogoUrl { get; set; } = string.Empty;
    public string AppTitle { get; set; } = string.Empty;
    public string AppVersion { get; set; } = string.Empty;
    public int DisplayDurationMs { get; set; } = 10000;
}
