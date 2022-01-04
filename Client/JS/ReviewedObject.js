export class ReviewedObject
{
    constructor(id, title, author,reviews,avrageGrade)
    {
        this.id=id;
        this.title=title;
        this.author=author;
        this.reviews=reviews;
        this.avrageGrade=avrageGrade
    }
    drawObject(host)
    {
        if(!host)
        {
            throw new Error("Parent Element Does Not Exist!");
        }

        host.innerHTML='';

        this.containerObjectDisplay = document.createElement("div");
        this.containerObjectDisplay.className="containerObjectDisplay";
        host.appendChild(this.containerObjectDisplay );

        const divAboutObject = document.createElement("div");
        divAboutObject.className="divAboutObject";
        this.containerObjectDisplay.appendChild(divAboutObject);

        const divReviewList = document.createElement("div");
        divReviewList.className="divReviewList";
        this.containerObjectDisplay.appendChild(divReviewList);

        const divTitle = document.createElement("div");
        divTitle.className="divTitle";
        divAboutObject.appendChild(divTitle);

        let labelTitle= document.createElement("h3");
        labelTitle.className="Title";
        labelTitle.innerHTML=this.title;
        divTitle.appendChild(labelTitle);

        let labelGrade=document.createElement("h3");
        labelGrade.className="AvrageGrade";
        if(this.avrageGrade>0)
            labelGrade.innerHTML=this.avrageGrade;
        else 
            labelGrade.innerHTML="No reviews available";
        divTitle.appendChild(labelGrade);

        const divAuthor = document.createElement("div");
        divAuthor.className="divAuthor";
        divAboutObject.appendChild(divAuthor);

        let labelAuthor= document.createElement("p");
        labelAuthor.className="labelAutror";
        labelAuthor.innerHTML=this.author;
        divAuthor.appendChild(labelAuthor);

        const divRevs=[];
        this.reviews.forEach(rev => {
            const divRev = document.createElement("div");
            divRev.className="divReviews";
            let gradeRev= document.createElement("h4");
            gradeRev.className="gradeReviews";
            gradeRev.innerHTML=rev.grade;
            let bodyRev= document.createElement("p");
            bodyRev.className="bodyReviews";
            bodyRev.innerHTML=rev.bodyOfReview;
            divRev.appendChild(gradeRev);
            divRev.appendChild(bodyRev);
            divRevs.push(divRev);
        });

        divRevs.forEach(revDiv => {
            divReviewList.appendChild(revDiv);
        });
    }
}