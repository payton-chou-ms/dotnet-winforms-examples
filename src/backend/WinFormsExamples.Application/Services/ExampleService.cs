using WinFormsExamples.Application.DTOs;
using WinFormsExamples.Application.Interfaces;
using WinFormsExamples.Domain.Entities;

namespace WinFormsExamples.Application.Services;

public class ExampleService : IExampleService
{
    private readonly List<Example> _examples;

    public ExampleService()
    {
        // Initialize with WinForms examples data
        _examples = new List<Example>
        {
            new Example
            {
                Id = 1,
                Title = "Resizeable Borderless Form Example",
                Description = "A borderless window that can be moved, resized, minimized, and maximized like a standard window.",
                Category = "Window Management",
                DifficultyLevel = "Advanced",
                Technologies = new[] { "WinForms", "C#", "Windows API" },
                CodeSnippet = "// Borderless form with custom resize logic\nprotected override void WndProc(ref Message m)\n{\n    base.WndProc(ref m);\n    if (m.Msg == WM_NCHITTEST && (int)m.Result == HTCLIENT)\n        m.Result = (IntPtr)HTCAPTION;\n}",
                ImageUrl = "/assets/images/resizeable-borderless-form.svg",
                IsFavorite = false,
                ViewCount = 320,
                CreatedAt = DateTime.UtcNow.AddDays(-50)
            },
            new Example
            {
                Id = 2,
                Title = "Slider Puzzle Example",
                Description = "Interactive sliding puzzle game with customizable grid size and images.",
                Category = "Games",
                DifficultyLevel = "Intermediate",
                Technologies = new[] { "WinForms", "C#", "Graphics" },
                CodeSnippet = "// Puzzle tile click handler\nprivate void Tile_Click(object sender, EventArgs e)\n{\n    var tile = (Button)sender;\n    if (IsAdjacentToEmpty(tile))\n        SwapTiles(tile, emptyTile);\n}",
                ImageUrl = "/assets/images/slider-puzzle.svg",
                IsFavorite = true,
                ViewCount = 450,
                CreatedAt = DateTime.UtcNow.AddDays(-45)
            },
            new Example
            {
                Id = 3,
                Title = "Fade In Fade Out Example",
                Description = "Smooth fade in and fade out animations for forms and controls using opacity transitions.",
                Category = "Animations",
                DifficultyLevel = "Beginner",
                Technologies = new[] { "WinForms", "C#", "Timer" },
                CodeSnippet = "// Fade animation using Timer\nprivate void FadeIn()\n{\n    timer.Tick += (s, e) =>\n    {\n        Opacity += 0.05;\n        if (Opacity >= 1.0) timer.Stop();\n    };\n    timer.Start();\n}",
                ImageUrl = "/assets/images/fade-in-fade-out.svg",
                IsFavorite = false,
                ViewCount = 280,
                CreatedAt = DateTime.UtcNow.AddDays(-40)
            },
            new Example
            {
                Id = 4,
                Title = "2D Collision Example",
                Description = "Demonstrates 2D circle collision detection with physics-based movement and bouncing.",
                Category = "Games",
                DifficultyLevel = "Intermediate",
                Technologies = new[] { "WinForms", "C#", "Math", "Graphics" },
                CodeSnippet = "// Circle collision detection\nvar dx = circle1.X - circle2.X;\nvar dy = circle1.Y - circle2.Y;\nvar distance = Math.Sqrt(dx * dx + dy * dy);\nif (distance < circle1.Radius + circle2.Radius)\n    HandleCollision();",
                ImageUrl = "/assets/images/2d-collision.svg",
                IsFavorite = true,
                ViewCount = 510,
                CreatedAt = DateTime.UtcNow.AddDays(-35)
            },
            new Example
            {
                Id = 5,
                Title = "Custom Button Examples",
                Description = "Collection of custom-styled buttons including circular buttons and custom bordered buttons with hover effects.",
                Category = "UI Components",
                DifficultyLevel = "Beginner",
                Technologies = new[] { "WinForms", "C#", "GDI+", "Custom Controls" },
                CodeSnippet = "// Custom button with rounded corners\nprotected override void OnPaint(PaintEventArgs e)\n{\n    var path = GetRoundedRectPath(ClientRectangle, radius);\n    e.Graphics.FillPath(brush, path);\n}",
                ImageUrl = "/assets/images/custom-buttons.svg",
                IsFavorite = true,
                ViewCount = 390,
                CreatedAt = DateTime.UtcNow.AddDays(-30)
            },
            new Example
            {
                Id = 6,
                Title = "Navigation Bar Example",
                Description = "Responsive navigation bar with collapsible menu items and smooth transitions.",
                Category = "UI Components",
                DifficultyLevel = "Intermediate",
                Technologies = new[] { "WinForms", "C#", "Custom Controls" },
                CodeSnippet = "// Navigation bar with menu items\nprivate void AddMenuItem(string text, EventHandler onClick)\n{\n    var item = new ToolStripMenuItem(text);\n    item.Click += onClick;\n    menuStrip.Items.Add(item);\n}",
                ImageUrl = "/assets/images/navigation-bar.svg",
                IsFavorite = false,
                ViewCount = 260,
                CreatedAt = DateTime.UtcNow.AddDays(-25)
            },
            new Example
            {
                Id = 7,
                Title = "Transparent Screen Selector Form",
                Description = "A transparent overlay form that allows users to select a region of the screen with visual feedback.",
                Category = "Utilities",
                DifficultyLevel = "Advanced",
                Technologies = new[] { "WinForms", "C#", "Graphics", "Screen Capture" },
                CodeSnippet = "// Transparent screen selector\nprotected override CreateParams CreateParams\n{\n    get\n    {\n        var cp = base.CreateParams;\n        cp.ExStyle |= 0x00080000; // WS_EX_LAYERED\n        return cp;\n    }\n}",
                ImageUrl = "/assets/images/transparent-screen-selector.svg",
                IsFavorite = false,
                ViewCount = 340,
                CreatedAt = DateTime.UtcNow.AddDays(-20)
            },
            new Example
            {
                Id = 8,
                Title = "Animated Control Resize",
                Description = "Helper method for smoothly animating control size changes with easing functions.",
                Category = "Animations",
                DifficultyLevel = "Intermediate",
                Technologies = new[] { "WinForms", "C#", "Timer", "Animation" },
                CodeSnippet = "// Animated resize helper\npublic void AnimateResize(Control control, Size targetSize, int duration)\n{\n    var startSize = control.Size;\n    var timer = new Timer { Interval = 10 };\n    var elapsed = 0;\n    timer.Tick += (s, e) => {\n        elapsed += timer.Interval;\n        var progress = Math.Min(1.0, elapsed / (double)duration);\n        control.Size = Lerp(startSize, targetSize, progress);\n        if (progress >= 1.0) timer.Stop();\n    };\n    timer.Start();\n}",
                ImageUrl = "/assets/images/animated-resize.svg",
                IsFavorite = false,
                ViewCount = 220,
                CreatedAt = DateTime.UtcNow.AddDays(-15)
            },
            new Example
            {
                Id = 9,
                Title = "Panels With Rounded Corners",
                Description = "Custom panel controls with rounded corners and customizable border styles.",
                Category = "UI Components",
                DifficultyLevel = "Beginner",
                Technologies = new[] { "WinForms", "C#", "GDI+", "Custom Controls" },
                CodeSnippet = "// Panel with rounded corners\nprotected override void OnPaint(PaintEventArgs e)\n{\n    e.Graphics.SmoothingMode = SmoothingMode.AntiAlias;\n    var path = GetRoundedRectPath(ClientRectangle, cornerRadius);\n    e.Graphics.FillPath(backgroundBrush, path);\n    e.Graphics.DrawPath(borderPen, path);\n}",
                ImageUrl = "/assets/images/rounded-panels.svg",
                IsFavorite = true,
                ViewCount = 310,
                CreatedAt = DateTime.UtcNow.AddDays(-10)
            },
            new Example
            {
                Id = 10,
                Title = "Animated Logo On Launch",
                Description = "Splash screen with animated GIF logo that displays during application startup.",
                Category = "UI Components",
                DifficultyLevel = "Beginner",
                Technologies = new[] { "WinForms", "C#", "PictureBox", "Timer" },
                CodeSnippet = "// Animated splash screen\nprivate void SplashScreen_Load(object sender, EventArgs e)\n{\n    pictureBox.Image = Image.FromFile(\"logo.gif\");\n    timer.Interval = 3000;\n    timer.Tick += (s, ev) => {\n        this.Close();\n        mainForm.Show();\n    };\n    timer.Start();\n}",
                ImageUrl = "/assets/images/animated-logo.svg",
                IsFavorite = false,
                ViewCount = 410,
                CreatedAt = DateTime.UtcNow.AddDays(-5)
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
