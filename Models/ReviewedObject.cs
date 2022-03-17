using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;

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

        [DataType(DataType.Date)]
        public DateTime Date{ get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public double Avrage { get; set; }
        public double AvrageCritic { get; set; }
        public double AvrageRegular { get; set; }
        public Author Author { get; set; }

        public List<GenreObject> Genres { get; set; }

        public List<Review> Reviews { get; set; }
    }
}