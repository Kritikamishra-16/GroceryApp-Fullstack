using GroceryAppAPI.Models;
using GroceryAppAPI.Repository.Abstract;
using GroceryAppAPI.Repository.Implementation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GroceryAppAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]/{action}")]
    [Authorize]
    public class OrderController : Controller
    {
        private readonly IOrderRepository _orderRepository;

        public OrderController(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> AddOrder(Order orderItem)
        {
            var addedOrderItem = await _orderRepository.Add(orderItem);
            return Ok(addedOrderItem);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetByUserId(int userId)
        {
            var orderItems = await _orderRepository.GetByUserId(userId);
            return Ok(orderItems);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteOrder(int id)
        {
            var deleted = await _orderRepository.Delete(id);
            if (!deleted)
                return Ok("error while deleting");

            return Ok(deleted);
        }

        [HttpGet("searchTop5Orders")]
        public IActionResult GetTopFiveOrders(string month,int year)
        {
            //var orders = await appDbContext.Orders.Where(x => EF.Functions.Like(x.OrderDate,$"%{month}%") && EF.Functions.Like(x.OrderDate,$"%{year}%")).ToListAsync();
            //var productCounts = orders.GroupBy(x => x.ProductId).Select(g => new { ProductId = g.Key, Count = g.Count() }).ToList();
            //var products=productCounts.OrderByDescending(x => x.Count).Take(5).Select(x=>x.ProductId).ToList();
            
            var products = _orderRepository.GetTop5Orders(month, year);
            if (products == null)
            {
                return NotFound();
            }
            return Ok(products);

        }

    }
}
