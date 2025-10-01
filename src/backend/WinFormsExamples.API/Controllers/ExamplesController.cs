using Microsoft.AspNetCore.Mvc;
using WinFormsExamples.Application.DTOs;
using WinFormsExamples.Application.Interfaces;

namespace WinFormsExamples.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class ExamplesController : ControllerBase
{
    private readonly IExampleService _exampleService;
    private readonly ILogger<ExamplesController> _logger;

    public ExamplesController(
        IExampleService exampleService,
        ILogger<ExamplesController> logger)
    {
        _exampleService = exampleService;
        _logger = logger;
    }

    /// <summary>
    /// Get all examples with pagination
    /// 取得所有範例（分頁）
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(PaginatedResultDto<ExampleDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<PaginatedResultDto<ExampleDto>>> GetAllExamples(
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? category = null)
    {
        try
        {
            var result = await _exampleService.GetAllExamplesAsync(pageNumber, pageSize, category);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting examples");
            return StatusCode(500, new { message = "An error occurred while retrieving examples" });
        }
    }

    /// <summary>
    /// Get example by ID
    /// 根據 ID 取得範例
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(ExampleDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ExampleDto>> GetExampleById(int id)
    {
        try
        {
            var example = await _exampleService.GetExampleByIdAsync(id);
            if (example == null)
            {
                return NotFound(new { message = $"Example with ID {id} not found" });
            }
            return Ok(example);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting example {Id}", id);
            return StatusCode(500, new { message = "An error occurred while retrieving the example" });
        }
    }

    /// <summary>
    /// Get all categories
    /// 取得所有類別
    /// </summary>
    [HttpGet("categories")]
    [ProducesResponseType(typeof(IEnumerable<string>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<string>>> GetCategories()
    {
        try
        {
            var categories = await _exampleService.GetCategoriesAsync();
            return Ok(categories);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting categories");
            return StatusCode(500, new { message = "An error occurred while retrieving categories" });
        }
    }
}
