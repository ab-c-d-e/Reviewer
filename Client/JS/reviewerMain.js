import { Reviewer } from "./reviewer.js";

const heroReviewer=document.createElement("div");
heroReviewer.classList.add("heroReviewer");
document.body.appendChild(heroReviewer);

var id=localStorage.getItem("idReviewer"); 
console.log(id);

fetch("https://localhost:5001/Reviewer/GetReviewer/"+id, 
{method: "GET"})
.then
    (
        pReviewer=>
        {
            pReviewer.json()
            .then
            (
                reviewers=>
                {
                    reviewers.forEach(reviewer =>
                    {
                        let newReviewer = new Reviewer(reviewer.id,reviewer.type,reviewer.description);
                        newReviewer.drawReviewer(heroReviewer);
                    });
                })
        })

