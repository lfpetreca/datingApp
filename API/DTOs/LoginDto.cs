using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class LoginDto
    {
         [Required]
        public string Username { get; set; }
        
        [Required]
        [MinLength(6)]
        public string Password { get; set; }
    }
}