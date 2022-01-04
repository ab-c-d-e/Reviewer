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
    public class ReviewerController : ControllerBase
    {
        public ReviewerContext Context { get; set; }

        public ReviewerController(ReviewerContext context)
        {
            Context = context;
        }

        [Route("DeleteReviewer/{JMBGUser}/{idReviewer}")]
        [HttpDelete]
        public async Task<ActionResult> deleteReviewer(string JMBGUser, int idReviewer)
        {
            var user = await Context.Users.Where(pUser => pUser.JMBG == JMBGUser).FirstOrDefaultAsync();
            var reviewer = await Context.Reviewers.FindAsync(idReviewer);
            if (JMBGUser.Length != 13)
            {
                return BadRequest("JMBG must be a 13 digit number!");
            }
            if (idReviewer < 0)
            {
                return BadRequest("Reviewer does not have an ID!");
            }
            if (user == null)
            {
                return BadRequest("This user doesn't exist!");
            }
            if (reviewer == null)
            {
                return BadRequest("Reviewer does not exist!");
            }
            if (user.ID != reviewer.SuperUser.ID)
            {
                return BadRequest("User is not Correct");
            }
            try
            {
                var objects = await Context.Objects.Where(pObject => pObject.Reviewer.ID == idReviewer).ToListAsync();
                objects.ForEach(async pObject =>
                {
                    var reviews = await Context.Reviews.Where(pReview => pReview.Object.ID == pObject.ID).ToListAsync();
                    reviews.ForEach(pRev =>
                    {
                        Context.Reviews.Remove(pRev);
                    });
                    Context.Objects.Remove(pObject);
                });
                Context.Reviewers.Remove(reviewer);
                await Context.SaveChangesAsync();
                return Ok($"Reviewer and all it's content is successfully deleted");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("AddNewReviewer/{JMBGUser}")]
        [HttpPost]
        public async Task<ActionResult> addNewReviewer(string JMBGUser, [FromBody] Reviewers reviewer)
        {
            var userid = await Context.Users.Where(pUser => pUser.JMBG == JMBGUser).FirstOrDefaultAsync();
            var users = await Context.Users.FindAsync(userid.ID);//Where(pUser => pUser.JMBG == JMBGUser).FirstOrDefault();
            if (string.IsNullOrEmpty(reviewer.Title) || string.IsNullOrEmpty(reviewer.Type))
            {
                return BadRequest("Title and Type must be added!");
            }

            if (JMBGUser.Length != 13)
            {
                return BadRequest("JMBG must be a 13 digit number!");
            }
            if (users == null)
            {
                return BadRequest("User does not exist!");
            }
            try
            {

                reviewer.SuperUser = users;
                Context.Reviewers.Add(reviewer);
                await Context.SaveChangesAsync();
                return Ok($"New Review Platform Successfully Added: {reviewer.ID}!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("GetAllReviewers")]
        [HttpGet]
        public async Task<ActionResult> getAllReviewers()
        {
            try
            {
                var reviewers = await Context.Reviewers
                .Include(qReviewer => qReviewer.SuperUser)
                .Include(pReviewer => pReviewer.Objects)
                .ToListAsync();
                return Ok(reviewers);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("GetReviewer/{ID}")]
        [HttpGet]
        public async Task<ActionResult> getReviewer(int ID)
        {
            try
            {
                var AllAboutReviewer = Context.Reviewers.Where(Reviewer => Reviewer.ID == ID)
                .Include(qReviewer => qReviewer.SuperUser)
                .Include(pReviewer => pReviewer.Objects);

                var reviewer = await AllAboutReviewer.ToListAsync();

                return Ok
                (
                    reviewer.Select(pReviewer =>
                    new
                    {
                        ID = pReviewer.ID,
                        Type = pReviewer.Type,
                        Title = pReviewer.Title,
                        UserName = pReviewer.SuperUser.UserName,
                        Objects = pReviewer.Objects
                            .Select(pObject =>
                            new
                            {
                                ID = pObject.ID,
                                Title = pObject.Title,
                                Description = pObject.Description,
                                AvrageGrade = pObject.AvrageGrade,
                            })
                    }).ToList()
                );
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}