using System.ComponentModel.DataAnnotations;

namespace GroceryAppAPI.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int ProductId { get; set; }


        public int Quantity { get; set; }

        public string OrderDate { get; set; }
    }
}
