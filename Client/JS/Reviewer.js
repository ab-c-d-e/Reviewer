import { Object } from "./object.js"
import { Genre } from "./genres.js"

export class Reviewer
{
    constructor(id, type, description)
    {
        this.id=id;
        this.type=type;
        this.description=description;
        this.containerReviewer=null;
        this.containerListObjects=null;
    }   

    drawReviewer(host)
    {
        if(!host)
        {
            throw new Error("Parent Element Does Not Exist!");
        }
        const divNavigation=document.createElement("div");
        divNavigation.className="divNavigation";
        host.appendChild(divNavigation);

        this.containerReviewer = document.createElement("div");
        this.containerReviewer.className="containerReviewer";
        host.appendChild(this.containerReviewer);
        
        this.containerListObjects = document.createElement("div");
        this.containerListObjects.className="containerListObjects";
        host.appendChild(this.containerListObjects);

        
        let buttonHome=document.createElement("button");
        buttonHome.innerHTML="HOME";
        buttonHome.className="buttonHome";
        divNavigation.appendChild(buttonHome);

        buttonHome.onclick=(ev)=>{
            window.open("home.html", '_self');
        }

        let buttonUsers=document.createElement("button");
        buttonUsers.innerHTML="USERS";
        buttonUsers.className="buttonUsers";
        divNavigation.appendChild(buttonUsers);

        buttonUsers.onclick=(ev)=>{

            window.open("usersMain.html", '_self');
        }

        const heroLeft=document.createElement("div");//flex-column
        heroLeft.classList.add("heroLeft");
        this.containerReviewer.appendChild(heroLeft);

        const heroRight=document.createElement("div");//flex-row
        heroRight.classList.add("heroRight");
        this.containerReviewer.appendChild(heroRight); 

        let formGenre=document.createElement("form");
        formGenre.action="genres.html";
        formGenre.className="formGenre";
        heroLeft.appendChild(formGenre);

        let buttonGenre=document.createElement("input");
        buttonGenre.type="submit";
        buttonGenre.value="Genres";
        formGenre.appendChild(buttonGenre);

        let formAuthor=document.createElement("form");
        formAuthor.action="authors.html";
        formAuthor.className="formAuthor";
        heroLeft.appendChild(formAuthor);

        let buttonAuthor=document.createElement("input");
        buttonAuthor.type="submit";
        buttonAuthor.value="Authors";
        formAuthor.appendChild(buttonAuthor);

        let formSearch=document.createElement("form");
        formSearch.action="objects.html";
        formSearch.className="formSearch";
        heroLeft.appendChild(formSearch);

        let textSearch=document.createElement("input");
        textSearch.type="text";
        textSearch.placeholder="...enter object";
        formSearch.appendChild(textSearch);

        let buttonSearch=document.createElement("input");
        buttonSearch.type="submit";
        buttonSearch.value="🔍";
        buttonSearch.onclick=(ev)=>
        {
            var search=textSearch.value;
            console.log(search);
            localStorage.setItem("objectsType","search");
            localStorage.setItem("objects",search);
        }
        formSearch.appendChild(buttonSearch);


        let buttonAddObject=document.createElement("input");
        buttonAddObject.type="button";
        buttonAddObject.className="buttonAddObject";
        buttonAddObject.value="ADD NEW OBJECT";
        heroLeft.appendChild(buttonAddObject);

        const addObjectDiv=document.createElement("div");
        addObjectDiv.className="addObjectDiv";
        heroRight.appendChild(addObjectDiv);

        this.addObjectForm(addObjectDiv);

        this.getTopTen(this.containerListObjects);
    }

    getTopTen(host)
    {
        const titleTopTen=document.createElement("h3");
        titleTopTen.className="titleTopTen";
        titleTopTen.innerHTML="Top Ten Best Rated:"
        host.appendChild(titleTopTen);
        fetch("https://localhost:5001/Reviewer/GetTopTen/"+this.id,
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
                        let o=new Object(object.id, object.title, object.description, object.avrage, object.avrageCritic, object.avrageRegular, object.url);
                        o.drawObjectShorter(host);
                    });
                })
        })
    }

    addObjectForm(host)
    {
        host.innerHTML="";
        let formForAdding=document.createElement("form");
        formForAdding.className="fromForAdding";
        host.appendChild(formForAdding);

        let titleAddObject=document.createElement("input");
        titleAddObject.className="titleAddObject";
        formForAdding.appendChild(titleAddObject);
        titleAddObject.placeholder="Title?";

        let descriptionAddObject=document.createElement("textarea");
        descriptionAddObject.className="descriptionAddObject";
        formForAdding.appendChild(descriptionAddObject);
        descriptionAddObject.placeholder="Description?";

        let enterAuthor=document.createElement("input");
        enterAuthor.placeholder="...search author?";
        enterAuthor.className="enterAuthor";
        formForAdding.appendChild(enterAuthor);

        let selectAuthor=document.createElement("select");
        selectAuthor.className="selectAuthor";
        formForAdding.appendChild(selectAuthor);

        enterAuthor.oninput=(ev)=>
        {
            selectAuthor.innerHTML="";
            let text=enterAuthor.value;
            if(text.length!=0)
            {
            fetch("https://localhost:5001/Author/GetAuthorsSearch/"+this.id+"/"+text, 
            {method: "GET"})
            .then
            (
                pauthor=>
                {
                    pauthor.json()
                    .then
                    (
                        authors=>
                        {
                            authors.forEach(author =>
                            {
                                let optionAuthor=document.createElement("option");
                                optionAuthor.innerHTML=author.name+" "+author.lastName;
                                optionAuthor.value=author.id;
                                selectAuthor.appendChild(optionAuthor);
                            });
                        })
                })
            }
        }
        
        let pictureObject=document.createElement("input");
        pictureObject.type="file";
        formForAdding.appendChild(pictureObject);

        let buttonGenre=document.createElement("input");
        buttonGenre.value="Add Genre";
        buttonGenre.className="buttonGenre";
        buttonGenre.type="button";
        formForAdding.appendChild(buttonGenre);

        const divListOfGenras=document.createElement("div");
        divListOfGenras.className="listOfGenras";
        divListOfGenras.style.display="none";
        host.appendChild(divListOfGenras);

        const divColumn1=document.createElement("div");
        divColumn1.className="divColumn";
        divListOfGenras.appendChild(divColumn1);

        const divColumn2=document.createElement("div");
        divColumn2.className="divColumn";
        divListOfGenras.appendChild(divColumn2);

        const divColumn3=document.createElement("div");
        divColumn3.className="divColumn";
        divListOfGenras.appendChild(divColumn3);

        buttonGenre.onclick=(ev)=>
        {
            if(divListOfGenras.style.display=="none")
            {
                divListOfGenras.style.display="flex";
            }
            else
            {
                divListOfGenras.style.display="none";
            }
        }

        var listIDGenras=[];
        var i=0;
        fetch("https://localhost:5001/Genre/GetAllGenres/"+this.id, 
        {method: "GET"})
        .then
        (
        pGenres=>
        {
            pGenres.json()
            .then
            (
                genres=>
                {
                    genres.forEach(genre =>
                    {
                        
                        const genreButton = document.createElement("button");
                        genreButton.classList.add("genreButton");
                        if(i%3==0)
                        {
                            const containerGenre = document.createElement("div");
                            containerGenre.className="containerGenre";
                            divColumn1.appendChild(containerGenre);

                            genreButton.innerHTML=genre.title;
                            genreButton.value="notSelected";
                            containerGenre.appendChild(genreButton);
                        }
                        if(i%3==1)
                        {
                            const containerGenre = document.createElement("div");
                            containerGenre.className="containerGenre";
                            divColumn2.appendChild(containerGenre);
    
                            genreButton.innerHTML=genre.title;
                            genreButton.value="notSelected";
                            containerGenre.appendChild(genreButton);
                        }
                        if(i%3==2)
                        {
                            const containerGenre = document.createElement("div");
                            containerGenre.className="containerGenre";
                            divColumn3.appendChild(containerGenre);

                            genreButton.innerHTML=genre.title;
                            genreButton.value="notSelected";
                            containerGenre.appendChild(genreButton);
                        }

                        i++;
                        genreButton.onclick=(ev)=>
                        {
                            if(genreButton.value==="notSelected")
                            {
                                genreButton.classList.add("genreButtonSelected");
                                genreButton.value="Selected";
                                listIDGenras.push(genre.id);
                            }
                            else if(genreButton.value==="Selected")
                            {
                                genreButton.classList.remove("genreButtonSelected");
                                genreButton.value="notSelected";
                                listIDGenras=listIDGenras.filter(function(value){ 
                                    return value != genre.id;
                                });
                            }
                        }
                    });
                })
        })

        let addButtonFinal=document.querySelector(".buttonAddObject");
    


        addButtonFinal.onclick=(ev)=>
        {
            let postRequest;
            var ok=true;
            if(selectAuthor.value!=null&&selectAuthor.value.length!=0)
            {
            postRequest = encodeURI("https://localhost:5001/ReviewedObject/AddNewObject/"
            + selectAuthor.value + "?");
            }//local....?id=1&id=2...&
            else
            {
                ok=false;
                alert("Add Author!");
            }
        listIDGenras.forEach((idGenre) => 
            {
                postRequest += "idGenre="
                    + idGenre;
                postRequest += "&";
            });

        if(titleAddObject.value!=null&&titleAddObject.value.length!=0&&ok)
        postRequest+="Title="+titleAddObject.value+"&";
        else if(ok)
        {
            ok=false;
            alert("Add Title!");
        }

        if(descriptionAddObject.value!=null&&descriptionAddObject.value.length!=0&&ok)
        postRequest+="Description="+descriptionAddObject.value+"&";
        else if(ok)
        {
            ok=false;
            alert("Add Description!");
        }

        let pictureObjectUrl=pictureObject.value.split("\\");
        let pictureUrl=pictureObjectUrl[2];
        if(pictureUrl!=undefined&&pictureObject!=null)
        {
            postRequest+="Url="+pictureUrl;
        }
        else
        {
            postRequest+="Url="+"placeholder.png";
        }
        if(ok)
        {
        fetch(postRequest, 
        {
            method: "POST" 
        }).then
        (
            pObject=>
            {
                if(pObject.ok)
                {
                    alert("Succesfully Added Object!");
                    this.addObjectForm(host);
                }
                else
                {
                    pObject.text().then
                    (
                        object=>
                        {
                            alert(object);
                        }
                    )
                }
                
            })
                
        }
        }
    }

}