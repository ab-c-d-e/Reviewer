using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Reviewer.Models
{
    public class Reviewers
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string Title { get; set; }
        [Required]
        public string Type { get; set; }

        public string Description { get; set; }

        public User SuperUser { get; set; }

        public List<ReviewedObject> Objects { get; set; }
    }
}