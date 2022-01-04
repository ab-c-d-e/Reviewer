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
        [DisplayFormat(DataFormatString = "{MMMM dd yyyy}", ApplyFormatInEditMode = true)]
        public DateTime DateOfAdding { get; set; }

        [MaxLength(1000)]
        public string BodyOfReview { get; set; }
        [JsonIgnore]
        public User User { get; set; }
        public ReviewedObject Object { get; set; }
    }
}