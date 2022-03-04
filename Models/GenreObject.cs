using System.ComponentModel.DataAnnotations;

namespace Reviewer.Models
{
    public class GenreObject
    {
        [Key]
        public int ID { get; set; }

        //public int numOfVotes { get; set; }
        public ReviewedObject Object { get; set; }
        public Genre Genre { get; set; }
    }
}