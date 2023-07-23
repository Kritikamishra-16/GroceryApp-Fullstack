using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GroceryAppAPI.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string ProductName { get; set; }
        [Required]
        public string ProductCategory { get; set; }
        public string ProductDescription { get; set; }

        [Required]
        public double ProductPrice { get; set; }

        public int AvailableQuantity { get; set; }

        public int Discount { get; set; }

        public string Specification { get; set; }

        public string? ProductImage { get; set; }
        //this property will not going to save in our database
        [NotMapped]
        public IFormFile? ImageFile { get; set; }



    }
}
