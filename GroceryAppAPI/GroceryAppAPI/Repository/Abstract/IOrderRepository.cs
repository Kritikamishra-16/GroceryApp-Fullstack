using GroceryAppAPI.Models;

namespace GroceryAppAPI.Repository.Abstract
{
    public interface IOrderRepository
    {
        Task<List<Order>> GetByUserId(int UserId);
        Task<IEnumerable<Order>> GetAll();
        Task<Order> Add(Order order);
        Task<Order> Update(Order order);
        Task<bool> Delete(int id);

        List<int> GetTop5Orders(string month, int year);
    }
}
