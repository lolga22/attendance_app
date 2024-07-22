using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AttendanceApp.Models
{
    [Table("employees")]
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        [Column("last_name")]
        [Required]
        [MaxLength(128)]
        public string LastName { get; set; }

        [Column("first_name")]
        [Required]
        [MaxLength(128)]
        public string FirstName { get; set; }
    }
}
