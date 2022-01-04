export class User
{
    constructor(id, userName, name, lastName)
    {
        this.id=id;
        this.userName=userName;
        this.name=name;
        this.lastName=lastName;
    }

    drawUser(host)
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
        linkReviewer.onclick=function() { console.log("Otvara se stranica za Usera"); }
        linkReviewer.className="linkReviewer";
        this.containerReviewer.appendChild(linkReviewer);

        const divTitle = document.createElement("div");
        divTitle.className="divTitle";
        linkReviewer.appendChild(divTitle);

        let labelTitle= document.createElement("h3");
        labelTitle.className="Title";
        labelTitle.innerHTML=this.userName;
        divTitle.appendChild(labelTitle);
    }
}