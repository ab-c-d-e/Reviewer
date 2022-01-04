import{ User } from "./User.js"

import{ Reviewer } from "./Reviewer.js"


function getAllReviewers()
{
    drawStartPage(document.body);  
fetch("https://localhost:5001/Reviewer/GetAllReviewers", {
    method: "GET"
    })
.then
(
    pReviewer=>
    {
        pReviewer.json()
        .then
        (
            reviewers=>
            {
                reviewers.forEach(reviewer => {
                    var r=new Reviewer(reviewer.id, reviewer.title, reviewer.type, reviewer.superUser.userName);
                    r.drawReviewer(document.body);
                });
            })
    })
}

function getAllUsers()
{
    drawStartPage(document.body);   
    fetch("https://localhost:5001/User/GetAllUsers", {
        method: "GET"
        })
    .then
    (
        pUser=>
        {
            pUser.json()
            .then
            (
                users=>
                {
                    users.forEach(user => {
                        var u=new User(user.id,user.userName, user.name, user.lastName);
                        u.drawUser(document.body);
                    });
                })
        })
    
}
export function drawStartPage(host)
{
    if(!host)
        {
            throw new Error("Parent Element Does Not Exist!");
        }

        const divHeader = document.createElement("div");
        divHeader.className="divHeader";
        host.appendChild(divHeader);

        const divUser = document.createElement("div");
        divUser.className="divUser";
        divHeader.appendChild(divUser);

        const buttonUser = document.createElement("button");
        buttonUser.innerHTML="Users";
        buttonUser.onclick=function() {host.innerHTML=''; getAllUsers();}
        buttonUser.className="buttonUser";
        divUser.appendChild(buttonUser);

        const divReviewer = document.createElement("div");
        divReviewer.className="divReviewer";
        host.appendChild(divReviewer);

        const buttonReviewer = document.createElement("button");
        buttonReviewer.innerHTML="Reviewers";
        buttonReviewer.onclick=function() {host.innerHTML=''; getAllReviewers();}
        buttonReviewer.className="buttonReviewer";
        divUser.appendChild(buttonReviewer);
}

getAllReviewers();  