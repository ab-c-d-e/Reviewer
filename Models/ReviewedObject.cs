using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;

namespace Reviewer.Models
{
    [Table("Object")]
    public class ReviewedObject
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string Title { get; set; }

        [Required]
        [MaxLength(50)]
        public string Author { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{MMMM dd yyyy}", ApplyFormatInEditMode = true)]
        public DateTime DateOfPublishing { get; set; }

        public string ImageUrl { get; set; }

        [MaxLength(400)]
        public string Description { get; set; }

        public virtual List<Review> Reviews { get; set; }

        public double AvrageGrade { get; set; }

        [JsonIgnore]
        public Reviewers Reviewer { get; set; }
    }
}