using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AttendanceApp.Models
{
    [Table("timesheet")]
    public class Timesheet
    {
        [Key]
        public int Id { get; set; }

        [Column("employee")]
        [Required]
        public int Employee { get; set; }

        [Column("reason")]
        [Required]
        public int Reason { get; set; }

        [Column("start_date")]
        [Required]
        public DateTime StartDate { get; set; }

        [Column("duration")]
        [Required]
        public int Duration { get; set; }

        [Column("discounted")]
        [Required]
        public bool Discounted { get; set; }

        [Column("description")]
        [MaxLength(1024)]
        public string? Description { get; set; }
    }
}
