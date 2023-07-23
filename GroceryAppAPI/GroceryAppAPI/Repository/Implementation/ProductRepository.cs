using GroceryAppAPI.Context;
using GroceryAppAPI.Models;
using GroceryAppAPI.Repository.Abstract;
using Microsoft.EntityFrameworkCore;

namespace GroceryAppAPI.Repository.Implementation
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;

        public ProductRepository(AppDbContext context)
        {
            this._context = context;
        }
        public bool Add(Product model)
        {
            try
            {
                _context.Products.Add(model);
                _context.SaveChanges();
                return true;

            }catch(Exception ex)
            {

                return false;
            }
        }

        public IEnumerable<Product> GetAll()
        {
            return _context.Products.ToList();
        }

        public async Task<Product> GetProductByIdAsync(int productId)
        {
            return await _context.Products.FirstOrDefaultAsync(p => p.Id == productId);
        }

        public bool UpdateProductAsync(int id, Product model)
        {
            var existingProduct = _context.Products.FirstOrDefault(x=> x.Id==id);
            if (existingProduct != null)
            {
                existingProduct.ProductName = model.ProductName;
                existingProduct.ProductCategory = model.ProductCategory;
                existingProduct.ProductDescription = model.ProductDescription;
                existingProduct.ProductPrice = model.ProductPrice;
                existingProduct.AvailableQuantity = model.AvailableQuantity;
                existingProduct.Discount = model.Discount;
                existingProduct.Specification = model.Specification;
                existingProduct.ProductImage = model.ProductImage;

                _context.SaveChanges();
                return true;
            }

            return false;

        }

        public  bool DeleteProduct(int id)
        {
            var product = _context.Products.FirstOrDefault(x=> x.Id ==id);
            if (product != null)
            {
                _context.Products.Remove(product);
                _context.SaveChanges();
                return true;
            }
            return false;
           
        }

    }
}
