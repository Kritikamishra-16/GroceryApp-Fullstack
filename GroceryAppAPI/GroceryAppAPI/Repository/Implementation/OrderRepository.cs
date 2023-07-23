using GroceryAppAPI.Context;
using GroceryAppAPI.Models;
using GroceryAppAPI.Repository.Abstract;
using Microsoft.EntityFrameworkCore;
using System;

namespace GroceryAppAPI.Repository.Implementation
{
    public class OrderRepository : IOrderRepository
    {
        private readonly AppDbContext _context;

        public OrderRepository(AppDbContext context)
        {
            this._context = context;
        }

        public async Task<List<Order>> GetByUserId(int userId)
        {
            var orderItems = await _context.Orders
                .Where(c => c.UserId == userId)
                .ToListAsync();

            return orderItems;
        }

        public async Task<IEnumerable<Order>> GetAll()
        {
            return await _context.Orders.ToListAsync();
        }

        public async Task<Order> Add(Order order)
        {
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            return order;
        }

        public async Task<Order> Update(Order order)
        {
            _context.Orders.Update(order);
            await _context.SaveChangesAsync();
            return order;
        }

        public async Task<bool> Delete(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
                return false;

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
            return true;
        }

        public List<int> GetTop5Orders(string month, int year)
        {
            var orders = _context.Orders.Where(x => EF.Functions.Like(x.OrderDate, $"%{month}%") && EF.Functions.Like(x.OrderDate, $"%{year}%")).ToList();
            var productCounts = orders.GroupBy(x => x.ProductId).Select(g => new { ProductId = g.Key, Count = g.Count() }).ToList();
            var products = productCounts.OrderByDescending(x => x.Count).Take(5).Select(x => x.ProductId).ToList();



            return products;
        }
    }
}
