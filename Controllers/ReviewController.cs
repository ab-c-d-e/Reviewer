using System;
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

        [Route("DeleteReview/{ID}")]
        [HttpDelete]
        public async Task<ActionResult> deleteReview(int ID)
        {
            var review = await Context.Reviews.FindAsync(ID);
            if (review == null)
            {
                return BadRequest("Review does not exist!");
            }
            try
            {
                Context.Reviews.Remove(review);
                await Context.SaveChangesAsync();
                var sumReviewsObjReg = Context.Reviews.Where(pReview => pReview.Object.ID == ID && pReview.User.Critic==false)
                                .Sum(pReview=>pReview.Grade);
                var numReviewsObjReg=Context.Reviews.Where(pReview => pReview.Object.ID == ID && pReview.User.Critic==false)
                                .Count();
                if(numReviewsObjReg!=0)
                review.Object.AvrageRegular = sumReviewsObjReg/numReviewsObjReg;

                var sumReviewsObjCrit = Context.Reviews.Where(pReview => pReview.Object.ID == ID && pReview.User.Critic==true)
                                .Sum(pReview=>pReview.Grade);
                var numReviewsObjCrit=Context.Reviews.Where(pReview => pReview.Object.ID == ID && pReview.User.Critic==true)
                                .Count();
                if(numReviewsObjCrit!=0)
                review.Object.AvrageCritic = sumReviewsObjCrit/numReviewsObjCrit;

                if(numReviewsObjCrit+numReviewsObjReg!=0)
                review.Object.Avrage=(sumReviewsObjCrit+sumReviewsObjReg)/(numReviewsObjCrit+numReviewsObjReg);
                await Context.SaveChangesAsync();
                return Ok($"Review has been successfully deleted!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("AddNewReview/{idObject}/{idUser}")]
        [HttpPost]
        public async Task<ActionResult> addNewReview(int idObject, int idUser, [FromBody] Review review)
        {
            if(review==null)
            {
                return BadRequest("Not a Valid Review");
            }
            if (review.Grade > 5 || review.Grade < 1)
            {
                return BadRequest("Not a Valid Grade!");
            }
            if(review.Text.Length>500)
            {
                return BadRequest("Review Text can not be longer than 500 characters");
            }
            var num = Context.Reviews.Where(pReview => (pReview.User.ID == idUser) && (pReview.Object.ID == idObject)).Count();
            if (num >0)
            {
                return BadRequest("This User Alredy Added a Review!");
            }
            try
            {
                review.Date = DateTime.Now;

                var objectRev = await Context.Objects.FindAsync(idObject);
                var user = await Context.Users.FindAsync(idUser);
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

                var sumReviewsObjReg = Context.Reviews.Where(pReview => pReview.Object.ID == idObject && pReview.User.Critic==false)
                                .Sum(pReview=>pReview.Grade);
                var numReviewsObjReg=Context.Reviews.Where(pReview => pReview.Object.ID == idObject&& pReview.User.Critic==false)
                                .Count();
                if(numReviewsObjReg!=0)
                review.Object.AvrageRegular = sumReviewsObjReg/numReviewsObjReg;

                var sumReviewsObjCrit = Context.Reviews.Where(pReview => pReview.Object.ID == idObject && pReview.User.Critic==true)
                                .Sum(pReview=>pReview.Grade);
                var numReviewsObjCrit=Context.Reviews.Where(pReview => pReview.Object.ID == idObject&& pReview.User.Critic==true)
                                .Count();
                if(numReviewsObjCrit!=0)
                review.Object.AvrageCritic = sumReviewsObjCrit/numReviewsObjCrit;
                if(numReviewsObjReg+numReviewsObjCrit!=0)
                review.Object.Avrage=(sumReviewsObjCrit+sumReviewsObjReg)/(numReviewsObjCrit+numReviewsObjReg);
                await Context.SaveChangesAsync();
                return Ok($"New Review Successfully Added: {review.Date}!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("ChangeReview/{ID}/{Grade}/{Text}/{Spoiler}")]
        [HttpPut]
        public async Task<ActionResult> changeReview(int ID, int Grade, string Text, bool Spoiler)
        {
            if (Grade > 5 || Grade < 1)
            {
                return BadRequest("Not a Valid Grade!");
            }
            if(Text.Length>500)
            {
                return BadRequest("Review Text can not be longer than 500 characters");
            }
            var review=await Context.Reviews.FindAsync(ID);
            try
            {
                if(review==null)
                {
                    return BadRequest("Review Does not exist!");
                }                
                review.Date = DateTime.Now;
                review.Grade=Grade;
                review.Text=Text;
                review.Spoiler=Spoiler;
                await Context.SaveChangesAsync();

                var sumReviewsObjReg = Context.Reviews.Where(pReview => pReview.Object.ID == ID && pReview.User.Critic==false)
                                .Sum(pReview=>pReview.Grade);
                var numReviewsObjReg=Context.Reviews.Where(pReview => pReview.Object.ID == ID && pReview.User.Critic==false)
                                .Count();
                if(numReviewsObjReg!=0)
                review.Object.AvrageRegular = sumReviewsObjReg/numReviewsObjReg;

                var sumReviewsObjCrit = Context.Reviews.Where(pReview => pReview.Object.ID == ID && pReview.User.Critic==true)
                                .Sum(pReview=>pReview.Grade);
                var numReviewsObjCrit=Context.Reviews.Where(pReview => pReview.Object.ID == ID && pReview.User.Critic==true)
                                .Count();
                if(numReviewsObjCrit!=0)
                review.Object.AvrageCritic = sumReviewsObjCrit/numReviewsObjCrit;
                if(numReviewsObjCrit+numReviewsObjReg!=0)
                review.Object.Avrage=(sumReviewsObjCrit+sumReviewsObjReg)/(numReviewsObjCrit+numReviewsObjReg);
                await Context.SaveChangesAsync();
                return Ok($"Review Successfully Updated: {review.Date}!");
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