using WinFormsExamples.Application.DTOs;
using WinFormsExamples.Application.Interfaces;
using WinFormsExamples.Domain.Entities;

namespace WinFormsExamples.Application.Services;

public class ExampleService : IExampleService
{
    private readonly List<Example> _examples;

    public ExampleService()
    {
        // Initialize with some sample data
        _examples = new List<Example>
        {
            new Example
            {
                Id = 1,
                Title = "Animated Logo Splash Screen",
                Description = "A splash screen with animated GIF logo that displays for 10 seconds before transitioning to the main application.",
                Category = "UI Components",
                DifficultyLevel = "Beginner",
                Technologies = new[] { "Angular", "TypeScript", "RxJS" },
                CodeSnippet = "// Angular Component Example\n@Component({\n  selector: 'app-splash-screen',\n  templateUrl: './splash-screen.component.html'\n})\nexport class SplashScreenComponent implements OnInit {\n  progress = 0;\n  ngOnInit() {\n    // 10 second timer\n    timer(0, 100).subscribe(tick => {\n      this.progress = Math.min((tick / 100) * 100, 100);\n      if (tick >= 100) {\n        this.router.navigate(['/dashboard']);\n      }\n    });\n  }\n}",
                ImageUrl = "/assets/images/animated-logo-example.png",
                IsFavorite = false,
                ViewCount = 150,
                CreatedAt = DateTime.UtcNow.AddDays(-30)
            },
            new Example
            {
                Id = 2,
                Title = "Custom Button Styles",
                Description = "Custom styled buttons with hover effects and animations.",
                Category = "UI Components",
                DifficultyLevel = "Beginner",
                Technologies = new[] { "Angular", "SCSS", "Material Design" },
                CodeSnippet = "// SCSS Example\n.custom-button {\n  border-radius: 24px;\n  padding: 12px 24px;\n  transition: all 0.3s ease;\n  &:hover {\n    transform: scale(1.05);\n    box-shadow: 0 4px 8px rgba(0,0,0,0.2);\n  }\n}",
                ImageUrl = "/assets/images/custom-buttons-example.png",
                IsFavorite = true,
                ViewCount = 230,
                CreatedAt = DateTime.UtcNow.AddDays(-25)
            },
            new Example
            {
                Id = 3,
                Title = "Navigation Bar",
                Description = "Responsive navigation bar with dropdown menus and mobile support.",
                Category = "Navigation",
                DifficultyLevel = "Intermediate",
                Technologies = new[] { "Angular", "Material Design", "Flex Layout" },
                CodeSnippet = "// Navigation Component\n@Component({\n  selector: 'app-nav',\n  templateUrl: './nav.component.html'\n})\nexport class NavComponent {\n  menuItems = [\n    { label: 'Home', route: '/' },\n    { label: 'Examples', route: '/examples' },\n    { label: 'About', route: '/about' }\n  ];\n}",
                ImageUrl = "/assets/images/navigation-example.png",
                IsFavorite = false,
                ViewCount = 180,
                CreatedAt = DateTime.UtcNow.AddDays(-20)
            }
        };
    }

    public Task<PaginatedResultDto<ExampleDto>> GetAllExamplesAsync(int pageNumber = 1, int pageSize = 10, string? category = null)
    {
        var query = _examples.AsQueryable();

        if (!string.IsNullOrEmpty(category))
        {
            query = query.Where(e => e.Category == category);
        }

        var totalCount = query.Count();
        var items = query
            .OrderByDescending(e => e.CreatedAt)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(e => new ExampleDto
            {
                Id = e.Id,
                Title = e.Title,
                Description = e.Description,
                Category = e.Category,
                DifficultyLevel = e.DifficultyLevel,
                Technologies = e.Technologies,
                CodeSnippet = e.CodeSnippet,
                ImageUrl = e.ImageUrl,
                IsFavorite = e.IsFavorite,
                ViewCount = e.ViewCount,
                CreatedAt = e.CreatedAt
            })
            .ToList();

        var result = new PaginatedResultDto<ExampleDto>
        {
            Items = items,
            TotalCount = totalCount,
            PageNumber = pageNumber,
            PageSize = pageSize
        };

        return Task.FromResult(result);
    }

    public Task<ExampleDto?> GetExampleByIdAsync(int id)
    {
        var example = _examples.FirstOrDefault(e => e.Id == id);
        if (example == null) return Task.FromResult<ExampleDto?>(null);

        var dto = new ExampleDto
        {
            Id = example.Id,
            Title = example.Title,
            Description = example.Description,
            Category = example.Category,
            DifficultyLevel = example.DifficultyLevel,
            Technologies = example.Technologies,
            CodeSnippet = example.CodeSnippet,
            ImageUrl = example.ImageUrl,
            IsFavorite = example.IsFavorite,
            ViewCount = example.ViewCount,
            CreatedAt = example.CreatedAt
        };

        return Task.FromResult<ExampleDto?>(dto);
    }

    public Task<IEnumerable<string>> GetCategoriesAsync()
    {
        var categories = _examples
            .Select(e => e.Category)
            .Distinct()
            .OrderBy(c => c)
            .AsEnumerable();

        return Task.FromResult(categories);
    }
}
