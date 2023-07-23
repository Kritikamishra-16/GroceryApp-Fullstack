using GroceryAppAPI.Models;

namespace GroceryAppAPI.Repository.Abstract
{
    public interface ICartRepository
    {
        Task<Cart> AddCartItem(Cart cartItem);
        Task<Cart> GetCartItem(int id);
        Task<IEnumerable<Cart>> GetAllCartItems();
        Task<bool> UpdateCartItem(Cart cartItem);
        bool DeleteCartItem(int productId);
        Task<List<Cart>> GetCartItemsByUserId(int userId);

    }
}
