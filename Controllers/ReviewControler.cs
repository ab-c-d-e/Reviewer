using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Reviewer.Models;

namespace Reviewer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReviewController : ControllerBase
    {
        public ReviewerContext Context { get; set; }

        public ReviewController(ReviewerContext context)
        {
            Context = context;
        }

        [Route("DeleteReview/{JMBGUser}/{IDReview}")]
        [HttpDelete]
        public async Task<ActionResult> deleteReviewer(string JMBGUser, int IDReview)
        {
            var user = await Context.Users.Where(pUser => pUser.JMBG == JMBGUser).FirstOrDefaultAsync();
            var review = await Context.Reviews.FindAsync(IDReview);
            if (JMBGUser.Length != 13)
            {
                return BadRequest("JMBG must be a 13 digit number!");
            }
            if (IDReview < 0)
            {
                return BadRequest("Reviewer does not have an ID!");
            }
            if (user == null)
            {
                return BadRequest("This user doesn't exist!");
            }
            if (review == null)
            {
                return BadRequest("Reviewer does not exist!");
            }
            if (user.ID != review.User.ID)
            {
                return BadRequest("User is not Correct");
            }
            try
            {
                Context.Reviews.Remove(review);
                await Context.SaveChangesAsync();
                return Ok($"Review has been successfully deleted!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("AddNewReview/{idObject}/{JMBGUser}")]
        [HttpPost]
        public async Task<ActionResult> addNewReview(int idObject, string JMBGUser, [FromBody] Review review)
        {
            if (JMBGUser.Length != 13)
            {
                return BadRequest("JMBG must be a 13 digit string");
            }
            if (review.Grade > 5 || review.Grade < 1)
            {
                return BadRequest("Not a Valid Grade!");
            }
            if (idObject < 0)
            {
                return BadRequest("Not a Valid id of an Object");
            }
            var reviewChecking = await Context.Reviews.Where(pReview => (pReview.User.JMBG == JMBGUser) && (pReview.Object.ID == idObject)).FirstOrDefaultAsync();
            if (reviewChecking != null)
            {
                return BadRequest($"One User Can only add one review for a movie! {reviewChecking.BodyOfReview}");
            }
            try
            {
                review.DateOfAdding = DateTime.Now;
                var objectRev = await Context.Objects.FindAsync(idObject);
                var user = Context.Users.Where(pUser => pUser.JMBG == JMBGUser).FirstOrDefault();
                if (user == null)
                {
                    return BadRequest("This user does not exist!");
                }
                if (objectRev == null)
                {
                    return BadRequest("This object does not exist!");
                }

                review.User = user;
                review.Object = objectRev;
                Context.Reviews.Add(review);
                await Context.SaveChangesAsync();
                var reviewsObj = await Context.Reviews.Where(pReview => pReview.Object.ID == idObject)
                                .ToListAsync();
                var grades = new List<int>();
                foreach (Review reviewObj in reviewsObj)
                {
                    grades.Add(reviewObj.Grade);
                }
                review.Object.AvrageGrade = Queryable.Average(grades.AsQueryable());
                await Context.SaveChangesAsync();
                return Ok($"New Review Successfully Added: {review.DateOfAdding}!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("GetAllReviews")]
        [HttpGet]
        public async Task<ActionResult> getAllReviews()
        {
            try
            {
                var reviews = await Context.Reviews.ToListAsync();
                return Ok(reviews);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}