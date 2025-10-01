using WinFormsExamples.Application.DTOs;

namespace WinFormsExamples.Application.Interfaces;

public interface IExampleService
{
    Task<PaginatedResultDto<ExampleDto>> GetAllExamplesAsync(int pageNumber = 1, int pageSize = 10, string? category = null);
    Task<ExampleDto?> GetExampleByIdAsync(int id);
    Task<IEnumerable<string>> GetCategoriesAsync();
}
