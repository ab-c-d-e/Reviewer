import { Object } from "./object.js";

import { User } from "./user.js"

export class Review
{
    constructor(id, text, grade, date, spoiler,objectTitle,objectUrl, userName, userUrl/*,critic*/)
    {
        this.id=id;
        this.text=text;
        this.grade=grade;
        this.date=date;
        this.spoiler=spoiler;
        this.objectTitle=objectTitle;
        this.objectUrl=objectUrl;
        this.userName=userName;
        this.userUrl=userUrl;
        //this.critic=critic;
        this.containerReview=null;
    }

    drawReview(host)
    {
        if(!host)
        {
            throw new Error("Parent Element Does Not Exist!");
        }

        this.containerReview = document.createElement("div");
        this.containerReview.className="containerReview";
        host.prepend(this.containerReview);
        //prependChild(this.containerReview);

        var fromWhere=localStorage.getItem("fromWhere");
        if(fromWhere==="object")
        {
            let imageUser=document.createElement("img");
            imageUser.className="imageUser";
            imageUser.src="..\\..\\Images\\Useres\\"+this.userUrl;
            console.log(this.userUrl+" "+this.text);
            imageUser.alt="Image of "+this.userName;
            this.containerReview.appendChild(imageUser);

        }
        else if(fromWhere==="user")
        {
            let imageObject=document.createElement("img");
            imageObject.className="imageObject";
            imageObject.src="..\\..\\Images\\Objects\\"+this.objectUrl;
            imageObject.alt="Image of "+this.objectTitle;
            this.containerReview.appendChild(imageObject);
        }

        var containerBody=document.createElement("div");//flex-row
        containerBody.className="containerBody";
        this.containerReview.appendChild(containerBody);

        var containerBodyText=document.createElement("div");//flex-column
        containerBodyText.className="containerBodyText";
        containerBody.appendChild(containerBodyText);

        var containerBodyButtons=document.createElement("div");//flex-row
        containerBodyButtons.className="containerBodyButtons";
        containerBody.appendChild(containerBodyButtons);

        var containerGrade=document.createElement("div");
        containerGrade.className="containerGrade";
        containerBodyText.appendChild(containerGrade);//flex-row

        const gradeReview=document.createElement("h3");
        gradeReview.className="gradeReview";
        gradeReview.innerHTML=this.grade;
        containerGrade.appendChild(gradeReview);

        const s1=document.createElement("div");
        s1.classList.add("star");
        s1.classList.add("starfull");
        containerGrade.appendChild(s1);

        const s2=document.createElement("div");
        s2.classList.add("star");
        if(this.grade>=2)
        s2.classList.add("starfull");
        else
        s2.classList.add("starempty");
        containerGrade.appendChild(s2);

        const s3=document.createElement("div");
        s3.classList.add("star");
        if(this.grade>=3)
        s3.classList.add("starfull");
        else
        s3.classList.add("starempty");
        containerGrade.appendChild(s3);

        const s4=document.createElement("div");
        s4.classList.add("star");
        if(this.grade>=4)
        s4.classList.add("starfull");
        else
        s4.classList.add("starempty");
        containerGrade.appendChild(s4);

        const s5=document.createElement("div");
        s5.classList.add("star");
        if(this.grade>=5)
        s5.classList.add("starfull");
        else
        s5.classList.add("starempty");
        containerGrade.appendChild(s5);
        
        let textReview=document.createElement("h3");
        textReview.className="textReview";
        textReview.innerHTML=this.text;
        containerBodyText.appendChild(textReview);

        if(this.spoiler)
        {
            textReview.innerHTML="";
            let spoiler=document.createElement("button");
            spoiler.className="spoiler";
            spoiler.innerHTML="SPOILER!";
            containerBodyText.appendChild(spoiler);
            spoiler.onclick=(ev)=>
            {
                if(textReview.innerHTML.length!=0)
                textReview.innerHTML="";
                else
                textReview.innerHTML=this.text;
            }
        }

        const deleteReview=document.createElement("button");
        deleteReview.className="deleteReview"
        deleteReview.innerHTML="❌";
        containerBodyButtons.appendChild(deleteReview);
        deleteReview.onclick=(ev)=>
        {
            this.deleteReview(host);
        }

        const updateReview=document.createElement("button");
        updateReview.className="updateReview"
        updateReview.innerHTML="✏️";
        containerBodyButtons.appendChild(updateReview);
        updateReview.onclick=(ev)=>
        {
            this.formEditReview(host);
        }
    }

    deleteReview(host)
    {
        fetch("https://localhost:5001/Review/DeleteReview/" + this.id, {
            method: "DELETE"
        }).then(pReview => {
            if (pReview.ok) {
                alert("Review Succesfully Deleted!");
                var id=localStorage.getItem("idObject");
                var idUser=localStorage.getItem("idUser");
                var heroObject=document.querySelector(".heroObject");
                var heroUser=document.querySelector(".heroUser");
                console.log(heroObject);
                if(heroObject!=null)
                {
                heroObject.innerHTML="";
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
                                        let newObject = new Object(object.id, object.title, object.description, object.avrage, object.avrageCritic, object.avrageRegular, object.url, object.author);
                                        newObject.drawObject(heroObject);
                                    });
                                })
                        })
                    }
                    else if(heroUser!=null)
                    {
                     heroUser.innerHTML="";
                    fetch("https://localhost:5001/User/GetUser/"+idUser, 
                    {method: "GET"})
                    .then
                        (
                            pUser=>
                            {
                                pUser.json()
                                .then
                                (
                                    users=>
                                    {
                                        users.forEach(user =>
                                        {
                                            let newUser = new User(user.id,user.jmbg,user.name, user.lastName, user.dateBirth, user.url,user.gender, user.age, user.critic, user.count);
                                            newUser.drawUser(heroUser);
                                        });
                                    })
                            })
                        }
                host.removeChild(this.containerReview);
            }
            else
                alert("MistakeOccured!");
        })
    }

    formEditReview(host)
    {
        this.containerReview.innerHTML="";
        
        var textFormReview=document.createElement("textarea");
        textFormReview.innerHTML=this.text;
        textFormReview.className="textFormReview";
        this.containerReview.appendChild(textFormReview);

        var gradeFormReview=document.createElement("input");
        gradeFormReview.type="number";
        gradeFormReview.min=1;
        gradeFormReview.max=5;
        gradeFormReview.value=this.grade;
        gradeFormReview.className="gradeFormReview";
        this.containerReview.appendChild(gradeFormReview);

        var labelSpoiler=document.createElement("label");
        labelSpoiler.className="labelSpoiler";
        labelSpoiler.innerHTML="SPOILER";
        this.containerReview.appendChild(labelSpoiler);

        var checkSpoiler=document.createElement("input");
        checkSpoiler.type="checkbox";
        checkSpoiler.className="checkSpoiler";
        if(this.spoiler)
        checkSpoiler.checked=true;
        this.containerReview.appendChild(checkSpoiler);
        
        var buttonEditReview=document.createElement("button");
        buttonEditReview.className="buttonEditReview";
        buttonEditReview.innerHTML="EDIT";
        buttonEditReview.onclick=(ev)=>
        {
            this.updateReview(host);
        }
        this.containerReview.appendChild(buttonEditReview);

        var cancelEditReview=document.createElement("button");
        cancelEditReview.className="cancelEditReview";
        cancelEditReview.innerHTML="CANCEL";
        cancelEditReview.onclick=(ev)=>
        {
            host.removeChild(this.containerReview);
            this.drawReview(host);
        }
        this.containerReview.appendChild(cancelEditReview);
    }

    updateReview(host)
    {
        var text=host.querySelector("textarea").value;
        this.text=text;
        var grade=host.querySelector(".gradeFormReview").value;
        this.grade=grade;
        var spoiler=host.querySelector(".checkSpoiler").checked;
        this.spoiler=spoiler;

        host.removeChild(this.containerReview);
        fetch("https://localhost:5001/Review/ChangeReview/"+this.id+"/"+this.grade+"/"+this.text+"/"+this.spoiler, {
            method: "PUT"
        }).then(pReview => {
            if (pReview.ok) {
                alert("Succesfully Updated Review");
                var id=localStorage.getItem("idObject");
                var idUser=localStorage.getItem("idUser");
                var heroObject=document.querySelector(".heroObject");
                var heroUser=document.querySelector(".heroUser");
                if(heroObject!=null)
                {
                heroObject.innerHTML="";
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
                                        let newObject = new Object(object.id, object.title, object.description, object.avrage, object.avrageCritic, object.avrageRegular, object.url, object.author);
                                        newObject.drawObject(heroObject);
                                    });
                                })
                        })
                    }

                else if(heroUser!=null)
                {
                 heroUser.innerHTML="";
                fetch("https://localhost:5001/User/GetUser/"+idUser, 
                {method: "GET"})
                .then
                    (
                        pUser=>
                        {
                            pUser.json()
                            .then
                            (
                                users=>
                                {
                                    users.forEach(user =>
                                    {
                                        let newUser = new User(user.id,user.jmbg,user.name, user.lastName, user.dateBirth, user.url,user.gender, user.age, user.critic, user.count);
                                        newUser.drawUser(heroUser);
                                    });
                                })
                        })
                    }
                this.drawReview(host);
            }
            else
                alert("Mistake Occured!");
        });
    }
}