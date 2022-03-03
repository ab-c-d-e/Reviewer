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

        [Route("AddNewReview/{idObject}/{idUser}/{text}/{grade}/{spoiler}")]
        [HttpPost]
        public async Task<ActionResult> addNewReview(int idObject, int idUser,string text, int grade, bool spoiler)
        {
            if (grade > 5 ||grade < 1)
            {
                return BadRequest("Not a Valid Grade!");
            }
            if(text.Length>500)
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
                var date = DateTime.Now;

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

                var review=new Review
                {
                    Text=text,
                    Grade=grade,
                    Date=date,
                    Spoiler=spoiler,
                    Object=objectRev,
                    User=user
                };

                Context.Reviews.Add(review);
                await Context.SaveChangesAsync();

                var sumReviewsObjReg = Context.Reviews.Where(pReview => pReview.Object.ID == idObject && pReview.User.Critic==false)
                                .Sum(pReview=>pReview.Grade);
                var numReviewsObjReg=Context.Reviews.Where(pReview => pReview.Object.ID == idObject&& pReview.User.Critic==false)
                                .Count();
                if(numReviewsObjReg!=0)
                review.Object.AvrageRegular = sumReviewsObjReg/(double)numReviewsObjReg;
                else
                review.Object.AvrageRegular=0;

                var sumReviewsObjCrit = Context.Reviews.Where(pReview => pReview.Object.ID == idObject && pReview.User.Critic==true)
                                .Sum(pReview=>pReview.Grade);
                var numReviewsObjCrit=Context.Reviews.Where(pReview => pReview.Object.ID == idObject&& pReview.User.Critic==true)
                                .Count();
                if(numReviewsObjCrit!=0)
                review.Object.AvrageCritic = sumReviewsObjCrit/(double)numReviewsObjCrit;
                else
                review.Object.AvrageCritic=0;
                if(numReviewsObjReg+numReviewsObjCrit!=0)
                review.Object.Avrage=(sumReviewsObjCrit+sumReviewsObjReg)/(double)(numReviewsObjCrit+numReviewsObjReg);
                else
                review.Object.Avrage=0;
                await Context.SaveChangesAsync();
                return Ok
                (
                    await Context.Reviews
                    .Where(pReview=>pReview.ID==review.ID)
                    .Select(pReview =>
                    new
                    {
                        ID=pReview.ID,
                        Spoiler=pReview.Spoiler,
                        Text=pReview.Text,
                        Grade=pReview.Grade,
                        Date=pReview.Date,
                        UserName=user.Name+" "+user.LastName,
                        UserUrl=user.ImageUrl
                    }).ToListAsync()
                );
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("DeleteReview/{ID}")]
        [HttpDelete]
        public async Task<ActionResult> deleteReview(int ID)
        {
            var review=await Context.Reviews
            .Include(pRev=>pRev.User)
            .Include(pRev=>pRev.Object)
            .Where(pRev=>pRev.ID==ID).FirstAsync();
            if (review == null)
            {
                return BadRequest("Review does not exist!");
            }
            try
            {
                Context.Reviews.Remove(review);
                await Context.SaveChangesAsync();
                var sumReviewsObjReg = Context.Reviews.Where(pReview => pReview.Object.ID == review.Object.ID && pReview.User.Critic==false)
                                .Sum(pReview=>pReview.Grade);
                var numReviewsObjReg=Context.Reviews.Where(pReview => pReview.Object.ID == review.Object.ID && pReview.User.Critic==false)
                                .Count();
                if(numReviewsObjReg!=0)
                review.Object.AvrageRegular = sumReviewsObjReg/(double)numReviewsObjReg;
                else
                review.Object.AvrageRegular=0;

                var sumReviewsObjCrit = Context.Reviews.Where(pReview => pReview.Object.ID == review.Object.ID && pReview.User.Critic==true)
                                .Sum(pReview=>pReview.Grade);
                var numReviewsObjCrit=Context.Reviews.Where(pReview => pReview.Object.ID == review.Object.ID && pReview.User.Critic==true)
                                .Count();
                if(numReviewsObjCrit!=0)
                review.Object.AvrageCritic = sumReviewsObjCrit/(double)numReviewsObjCrit;
                else
                review.Object.AvrageCritic=0;

                if(numReviewsObjCrit+numReviewsObjReg!=0)
                review.Object.Avrage=(sumReviewsObjCrit+sumReviewsObjReg)/(double)(numReviewsObjCrit+numReviewsObjReg);
                else
                review.Object.Avrage=0;

                await Context.SaveChangesAsync();
                return Ok($"Review has been successfully deleted!");
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
            var review=await Context.Reviews
            .Include(pRev=>pRev.User)
            .Include(pRev=>pRev.Object)
            .Where(pRev=>pRev.ID==ID).FirstAsync();
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

                var sumReviewsObjReg = Context.Reviews.Where(pReview => pReview.Object.ID == review.Object.ID && pReview.User.Critic==false)
                                .Sum(pReview=>pReview.Grade);
                var numReviewsObjReg=Context.Reviews.Where(pReview => pReview.Object.ID == review.Object.ID && pReview.User.Critic==false)
                                .Count();
                if(numReviewsObjReg!=0)
                review.Object.AvrageRegular = sumReviewsObjReg/(double)numReviewsObjReg;
                else
                review.Object.AvrageRegular=0;

                var sumReviewsObjCrit = Context.Reviews.Where(pReview => pReview.Object.ID == review.Object.ID && pReview.User.Critic==true)
                                .Sum(pReview=>pReview.Grade);
                var numReviewsObjCrit=Context.Reviews.Where(pReview => pReview.Object.ID == review.Object.ID && pReview.User.Critic==true)
                                .Count();
                if(numReviewsObjCrit!=0)
                review.Object.AvrageCritic = sumReviewsObjCrit/(double)numReviewsObjCrit;
                else
                review.Object.AvrageCritic=0;

                if(numReviewsObjCrit+numReviewsObjReg!=0)
                review.Object.Avrage=(sumReviewsObjCrit+sumReviewsObjReg)/(double)(numReviewsObjCrit+numReviewsObjReg);
                else
                review.Object.Avrage=0;
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