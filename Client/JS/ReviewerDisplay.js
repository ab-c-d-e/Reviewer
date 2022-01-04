import { ReviewedObject } from "./ReviewedObject.js";

export class ReviewerDisplay
{
    constructor(id, title, type,objects)
    {
        this.id=id;
        this.title=title;
        this.type=type;
        this.objects=objects;
    }

    addNewObject(object)
    {
        this.objects.push(object);
    }

    drawReviewerDisplay(host)
    {
        if(!host)
        {
            throw new Error("Parent Element Does Not Exist!");
        }

        this.containerReviewerDisplay = document.createElement("div");
        this.containerReviewerDisplay.className="containerRevieweDisplay";
        host.appendChild(this.containerReviewerDisplay );

        const divAboutReviewer = document.createElement("div");
        divAboutReviewer.className="divAboutReviewer";
        this.containerReviewerDisplay.appendChild(divAboutReviewer);

        const divObjectList = document.createElement("div");
        divObjectList.className="divObjectList";
        this.containerReviewerDisplay.appendChild(divObjectList);

        const divTitle = document.createElement("div");
        divTitle.className="divTitle";
        divAboutReviewer.appendChild(divTitle);

        let labelTitle= document.createElement("h3");
        labelTitle.className="Title";
        labelTitle.innerHTML=this.title;
        divTitle.appendChild(labelTitle);

        const divType = document.createElement("div");
        divType.className="divType";
        divAboutReviewer.appendChild(divType);

        let labelType= document.createElement("p");
        labelType.className="Description";
        labelType.innerHTML=this.type;
        divType.appendChild(labelType);

        const divObjs=[];
        this.objects.forEach(obj => {
            const divObj = document.createElement("div");
            divObj.className="divObjects";
            const linkObj=document.createElement("button");
            linkObj.onclick=function(){getObject(obj.id);}
            linkObj.className="linkObj";
            divObj.appendChild(linkObj);
            let labelObj= document.createElement("h3");
            labelObj.className="labelObjects";
            labelObj.innerHTML=obj.title;
            linkObj.appendChild(labelObj);
            divObjs.push(divObj);
        });

        divObjs.forEach(objDiv => {
            divObjectList.appendChild(objDiv);
        });
    }
}

function getObject(id)
{
    console.log(id);
    fetch("https://localhost:5001/ReviewedObject/GetObject/"+id, 
    {method: "GET"})
    .then
    (
        pObject=>
        {
            pObject.json()
            .then
            (
                objects=>
                {
                    objects.forEach(object =>
                    {
                        var o=new ReviewedObject(object.id, object.title, object.author,object.reviews,object.avrageGrade);
                        o.drawObject(document.body);
                    });
                })
        })
}