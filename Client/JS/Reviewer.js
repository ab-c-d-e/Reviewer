import {ReviewerDisplay} from "./ReviewerDisplay.js"
import { drawStartPage } from "./main.js";
export class Reviewer
{
    constructor(id, title, type, creatorUserName)
    {
        this.id=id;
        this.title=title;
        this.type=type;
        this.creatorUserName=creatorUserName;
    }   
    drawReviewer(host)
    {
        if(!host)
        {
            throw new Error("Parent Element Does Not Exist!");
        }
        this.containerReviewer = document.createElement("div");
        this.containerReviewer.className="containerReviewer";
        host.appendChild(this.containerReviewer );

        const linkReviewer = document.createElement("button");
        var id=this.id;
        linkReviewer.onclick=function() {document.body.innerHTML=''; getReviewer(id); }
        linkReviewer.className="linkReviewer";
        this.containerReviewer.appendChild(linkReviewer);

        const divTitle = document.createElement("div");
        divTitle.className="divTitle";
        linkReviewer.appendChild(divTitle);

        let labelTitle= document.createElement("h3");
        labelTitle.className="Title";
        labelTitle.innerHTML=this.title;
        divTitle.appendChild(labelTitle);
    }
}

    
function getReviewer(id)
{
    drawStartPage(document.body);
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
                        var r=new ReviewerDisplay(reviewer.id, reviewer.title, reviewer.type,reviewer.objects);
                        r.drawReviewerDisplay(document.body);
                    });
                })
        })
}