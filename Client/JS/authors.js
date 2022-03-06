import { Object } from "./object.js";

export class Author
{
    constructor(id,name,lastName,url,about)
    {
        this.id=id;
        this.name=name;
        this.lastName=lastName;
        this.url=url;
        this.about=about;
        this.containerAuthor=null;
    }   
    drawAuthor(host)
    {
        if(!host)
        {
            throw new Error("Parent Element Does Not Exist!");
        }
        this.containerAuthor = document.createElement("div");
        this.containerAuthor.className="containerAuthor";
        host.prepend(this.containerAuthor);

        let imageAuthor=document.createElement("img");
        imageAuthor.src="..\\..\\Images\\Authors\\"+this.url;
        imageAuthor.classList.add("imageAuthor");
        this.containerAuthor.appendChild(imageAuthor);

        const divAuthor=document.createElement("div");
        divAuthor.className="divAuthor";
        this.containerAuthor.appendChild(divAuthor);

        let nameAuthor=document.createElement("h3");
        nameAuthor.innerHTML=this.name+" "+this.lastName;
        divAuthor.appendChild(nameAuthor);

        let aboutAuthor=document.createElement("p");
        aboutAuthor.innerHTML=this.about;
        divAuthor.appendChild(aboutAuthor);

        imageAuthor.onclick=(ev)=>
        {
            localStorage.setItem("objectsType","authors");
            localStorage.setItem("objects",this.id);
            localStorage.setItem("name", this.name+" "+this.lastName);
            window.open("objects.html", '_self');
        }
    }

    filterObject(host, heroObjects)
    {
        if(!host)
        {
            throw new Error("Parent Element Does Not Exist!");
        }
        var name=localStorage.getItem("name");
        console.log(name);
        var titleGenre=document.createElement("h3");
        titleGenre.className="titleGenre";
        titleGenre.innerHTML=name;
        host.appendChild(titleGenre);

        var selectSort=document.createElement("select");
        selectSort.name="selectReviewSort";
        selectSort.className="selectReviewSort";
        host.appendChild(selectSort);

        selectSort.onchange=(ev)=>
        {

            heroObjects.innerHTML="";
            if(selectSort.value==="newest")
            {
                fetch("https://localhost:5001/Author/SortedObjectsDate/"+this.id+"/true", 
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
                        let newObject = new Object(object.id, object.title, object.description, object.avrage, object.avrageCritic, object.avrageRegular, object.url);
                        newObject.drawObjectShorter(heroObjects);
                    });
                })
                })
            }
            else if(selectSort.value==="oldest")
            {
                fetch("https://localhost:5001/Author/SortedObjectsDate/"+this.id+"/false", 
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
                            let newObject = new Object(object.id, object.title, object.description, object.avrage, object.avrageCritic, object.avrageRegular, object.url);
                            newObject.drawObjectShorter(heroObjects);
                        });
                    })
                    })
            }
            else if(selectSort.value==="smallest")
            {
                fetch("https://localhost:5001/Author/SortedObjectsAvrage/"+this.id+"/false", 
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
                            let newObject = new Object(object.id, object.title, object.description, object.avrage, object.avrageCritic, object.avrageRegular, object.url);
                            newObject.drawObjectShorter(heroObjects);
                        });
                    })
                    })
            }
            else if(selectSort.value==="largest")
            {
                fetch("https://localhost:5001/Author/SortedObjectsAvrage/"+this.id+"/true", 
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
                        let newObject = new Object(object.id, object.title, object.description, object.avrage, object.avrageCritic, object.avrageRegular, object.url);
                        newObject.drawObjectShorter(heroObjects);
                    });
                })
                })
            }
        }

        var optionTitle=document.createElement("option");
        optionTitle.selected="true";
        optionTitle.disabled="true";
        optionTitle.innerHTML="Sort by";
        selectSort.appendChild(optionTitle);

        var optionOldest=document.createElement("option");
        optionOldest.value="oldest";
        optionOldest.innerHTML="Date Added(Newest)";
        selectSort.appendChild(optionOldest);

        var optionNewest=document.createElement("option");
        optionNewest.value="newest";
        optionNewest.innerHTML="Date Added(Oldest)";
        selectSort.appendChild(optionNewest);

        var optionSmallest=document.createElement("option");
        optionSmallest.value="smallest";
        optionSmallest.innerHTML="Grade ⬆";
        selectSort.appendChild(optionSmallest);

        var optionLargerst=document.createElement("option");
        optionLargerst.value="largest";
        optionLargerst.innerHTML="Grade ⬇";
        selectSort.appendChild(optionLargerst);
    }
}