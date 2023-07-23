using GroceryAppAPI.Context;
using GroceryAppAPI.Models;
using GroceryAppAPI.Repository.Abstract;
using Microsoft.EntityFrameworkCore;

namespace GroceryAppAPI.Repository.Implementation
{
    public class RatingRepository : IRatingRepository
    {
        private readonly AppDbContext _context;
        public RatingRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Rating>> GetByProductIdAsync(int productId)
        {
            var ratingItems = await _context.Ratings
                .Where(c => c.ProductId == productId)
                .ToListAsync();

            return ratingItems;
        }
        public async Task AddAsync(Rating rating)
        {
            _context.Ratings.Add(rating);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var rating = await _context.Ratings.FindAsync(id);
            if (rating != null)
            {
                _context.Ratings.Remove(rating);
                await _context.SaveChangesAsync();
            }
        }

       
    }
}
