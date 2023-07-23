using System.ComponentModel.DataAnnotations;

namespace GroceryAppAPI.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }

        public string Token { get; set; }
        public string Role { get; set; }      
    }
}
