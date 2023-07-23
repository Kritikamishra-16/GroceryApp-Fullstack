using GroceryAppAPI.Models;

namespace GroceryAppAPI.Repository.Abstract
{
    public interface IProductRepository
    {
        bool Add(Product model);
        IEnumerable<Product> GetAll();

        Task<Product> GetProductByIdAsync(int productId);

        bool UpdateProductAsync(int id,Product model);

        bool DeleteProduct(int id);


    }
}
