using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;

namespace Reviewer.Models
{
    public class User
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(13)]
        [MinLength(13)]
        public string JMBG { get; set; }

        [DataType(DataType.Date)]
        public DateTime DateBirth{ get; set; }

        [MaxLength(50)]
        public string Name{ get; set; }

        [MaxLength(50)]
        public string LastName { get; set; }

        public string ImageUrl { get; set; }
        
        public int Age { get; set; }
        public bool Critic { get; set; }

        public char Gender { get; set; }

        public List<Review> Reviews { get; set; }
    }
}