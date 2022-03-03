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

        [Route("GetTopTen/{ID}")]
        [HttpGet]
        public async Task<ActionResult> GetTopTen(int ID)
        {
            var objects=await Context.Objects
            .Where(pObject=>pObject.Author.Reviewer.ID==ID).ToListAsync();
            
            var topTen=(from o in objects
                orderby o.Avrage descending
                select o).Take(objects.Count());
            if(objects.Count()>=10)
            {
            topTen=(from o in objects
                orderby o.Avrage descending
                select o).Take(10);
            }
            try
            {
                return Ok
                (
                    topTen.Select(pObject =>
                    new
                    {
                        ID = pObject.ID,
                        Title = pObject.Title,
                        Description=pObject.Description,
                        Avrage=pObject.Avrage,
                        AvrageCritic=pObject.AvrageCritic,
                        AvrageRegular=pObject.AvrageRegular,
                        Url=pObject.Url
                    }).ToList()
                );
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
                var reviewer = Context.Reviewers.Where(pReviewer => pReviewer.ID == ID);

                if(reviewer==null)
                {
                    return BadRequest("Reviewer Does Not Exist!");
                }

                return Ok
                (
                    await reviewer.Select(pReviewer =>
                    new
                    {
                        ID = pReviewer.ID,
                        Type = pReviewer.Type,
                        Description=pReviewer.Description
                    }).ToListAsync()
                );
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
                return Ok(await Context.Reviewers.ToListAsync());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}