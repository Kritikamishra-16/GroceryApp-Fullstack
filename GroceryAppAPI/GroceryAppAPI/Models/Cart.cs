using System.ComponentModel.DataAnnotations;

namespace GroceryAppAPI.Models
{
    public class Cart
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
