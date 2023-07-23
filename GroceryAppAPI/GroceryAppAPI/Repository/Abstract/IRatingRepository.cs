using GroceryAppAPI.Models;

namespace GroceryAppAPI.Repository.Abstract
{
    public interface IRatingRepository
    {
        Task<List<Rating>> GetByProductIdAsync(int productId);
        Task AddAsync(Rating rating);
        Task DeleteAsync(int id);
    }
}
