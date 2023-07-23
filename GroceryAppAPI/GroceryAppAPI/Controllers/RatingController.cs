using GroceryAppAPI.Models;
using GroceryAppAPI.Repository.Abstract;
using GroceryAppAPI.Repository.Implementation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GroceryAppAPI.Controllers
{
    [Route("api/ratings")]
    [ApiController]
    [Authorize]
    public class RatingController : ControllerBase
    {
        private readonly IRatingRepository _ratingRepository;

        public RatingController(IRatingRepository ratingRepository)
        {
            _ratingRepository = ratingRepository;
        }

        [HttpPost]
        public async Task<IActionResult> AddRating([FromBody] Rating rating)
        {
            await _ratingRepository.AddAsync(rating);
            return Ok(rating);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRating(int id)
        {
            await _ratingRepository.DeleteAsync(id);
            return NoContent();
        }


        [HttpGet("{productId}")]
        public async Task<IActionResult> GetCartItems(int productId)
        {
            var cartItems = await _ratingRepository.GetByProductIdAsync(productId);
            return Ok(cartItems);
        }


    }
}
