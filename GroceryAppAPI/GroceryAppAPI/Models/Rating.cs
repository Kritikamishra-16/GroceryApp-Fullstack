using System.ComponentModel.DataAnnotations;

namespace GroceryAppAPI.Models
{
    public class Rating
    {
        [Key]
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int UserId { get; set; }
        public int RatingValue { get; set; }
    }
}
