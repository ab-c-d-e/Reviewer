using System.ComponentModel.DataAnnotations;
using System;
using System.Text.Json.Serialization;

namespace Reviewer.Models
{
    public class Review
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [Range(1, 5)]
        public int Grade { get; set; }

        [DataType(DataType.Date)]
        public DateTime Date { get; set; }

        [MaxLength(500)]
        public string Text { get; set; }

        public bool Spoiler { get; set; }
        
        [JsonIgnore]
        public User User { get; set; }
        public ReviewedObject Object { get; set; }
    }
}