using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;

namespace Reviewer.Models
{
    public class Genre
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string Title { get; set; }

        public string Url { get; set; }
   
        public Reviewers Reviewer { get; set; }

        public List<GenreObject> Objects { get; set; }
    }
}