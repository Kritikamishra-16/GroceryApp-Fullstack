using GroceryAppAPI.Context;
using GroceryAppAPI.Models;
using GroceryAppAPI.Repository.Abstract;
using Microsoft.EntityFrameworkCore;

namespace GroceryAppAPI.Repository.Implementation
{
    public class CartRepository : ICartRepository
    {
        private readonly AppDbContext _context;

        public CartRepository(AppDbContext context)
        {
            this._context = context;
        }

        public async Task<Cart> AddCartItem(Cart cartItem)
        {

            _context.Cart.Add(cartItem);
            await _context.SaveChangesAsync();
            return cartItem;
        }

        public bool DeleteCartItem(int productId)
        {
            var cartItem = _context.Cart.FirstOrDefault(c => c.ProductId == productId);

            if (cartItem == null)
            {
                return false;
            }
            _context.Cart.Remove(cartItem);
            _context.SaveChanges();

            return true;
        }

        public async Task<IEnumerable<Cart>> GetAllCartItems()
        {
            return await _context.Cart.ToListAsync();
        }

        public async Task<Cart> GetCartItem(int id)
        {
            return await _context.Cart.FindAsync(id);

        }

        public async Task<List<Cart>> GetCartItemsByUserId(int userId)
        {
            var cartItems = await _context.Cart
                .Where(c => c.UserId == userId)
                .ToListAsync();

            return cartItems;
        }

        public  async Task<bool> UpdateCartItem(Cart cartItem)
        {

            _context.Cart.Update(cartItem);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
