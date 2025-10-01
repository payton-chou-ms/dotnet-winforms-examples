namespace WinFormsExamples.Domain.Entities;

public class Example : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string DifficultyLevel { get; set; } = string.Empty;
    public string[] Technologies { get; set; } = Array.Empty<string>();
    public string CodeSnippet { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public bool IsFavorite { get; set; }
    public int ViewCount { get; set; }
}
