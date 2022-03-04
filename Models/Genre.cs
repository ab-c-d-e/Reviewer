using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
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
   
   [JsonIgnore]
        public Reviewers Reviewer { get; set; }

        public List<GenreObject> Objects { get; set; }
    }
}