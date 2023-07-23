using GroceryAppAPI.Context;
using GroceryAppAPI.Migrations;
using GroceryAppAPI.Models;
using GroceryAppAPI.Repository.Abstract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GroceryAppAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]/{action}")]
    [Authorize]
    public class CartController : ControllerBase
    {
        private readonly ICartRepository _cartRepository;

        public CartController(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }

        [HttpPost]      
        public async Task<ActionResult<Cart>> AddCart(Cart cartItem)
        {
            var addedCartItem = await _cartRepository.AddCartItem(cartItem);
            return Ok(addedCartItem);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Cart>> GetCart(int id)
        {
            var cartItem = await _cartRepository.GetCartItem(id);
            if (cartItem == null)
                return NotFound();

            return Ok(cartItem);
        }


        [HttpGet("{userId}")]
        public async Task<IActionResult> GetCartItems(int userId)
        {
            var cartItems = await _cartRepository.GetCartItemsByUserId(userId);
            return Ok(cartItems);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart>>> GetAllCartItems()
        {
            var cartItems = await _cartRepository.GetAllCartItems();
            return Ok(cartItems);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCartItem(Cart cartItem)
        {
            var updated = await _cartRepository.UpdateCartItem(cartItem);
            if (!updated)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{productId}")]
        public IActionResult DeleteCartItem(int productId)
        {
            var deleted =_cartRepository.DeleteCartItem(productId);
            if (!deleted)
                return Ok("error while deleting");

            return Ok(deleted);
        }


    }
}
