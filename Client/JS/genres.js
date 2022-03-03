import { Object } from "./object.js";

export class Genre
{
    constructor(id, title,url)
    {
        this.id=id;
        this.title=title;
        this.url=url;
        this.containerGenre=null;
        this.filterObjects=null;
    }   
    drawGenre(host)
    {
        if(!host)
        {
            throw new Error("Parent Element Does Not Exist!");
        }
        this.containerGenre = document.createElement("div");
        this.containerGenre.className="containerGenre";
        host.appendChild(this.containerGenre);

        let formSpecificGenre=document.createElement("form");
        formSpecificGenre.action="objects.html";
        this.containerGenre.appendChild(formSpecificGenre);

        let buttonSpecificGenre=document.createElement("input");
        buttonSpecificGenre.type="submit";
        buttonSpecificGenre.value=this.title;
        buttonSpecificGenre.onclick=(ev)=>
        {
            localStorage.setItem("objectsType","genres");
            localStorage.setItem("objects",this.id);
        }
        formSpecificGenre.prepend(buttonSpecificGenre);
    }

    filterObject(host, heroObjects)
    {
        if(!host)
        {
            throw new Error("Parent Element Does Not Exist!");
        }
        var selectSort=document.createElement("select");
        selectSort.name="selectReviewSort";
        selectSort.className="selectReviewSort";
        host.appendChild(selectSort);

        selectSort.onchange=(ev)=>
        {
            var id=localStorage.getItem("objects");
            console.log(id);
            if(selectSort.value==="newest")
            {
                heroObjects.innerHTML="";
                fetch("https://localhost:5001/Genre/SortedObjectsDate/"+id+"/true", 
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
                        newObject.drawObjectShorter(heroObjects);
                    });
                })
                })
            }
            else if(selectSort.value==="oldest")
            {
                heroObjects.innerHTML="";
                fetch("https://localhost:5001/Genre/SortedObjectsGrade/"+id+"/false", 
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
                            newObject.drawObjectShorter(heroObjects);
                        });
                    })
                    })
            }
            else if(selectSort.value==="smallest")
            {
                heroObjects.innerHTML="";
                fetch("https://localhost:5001/Genre/SortedObjectsGrade/"+id+"/false", 
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
                            newObject.drawObjectShorter(heroObjects);
                        });
                    })
                    })
            }
            else if(selectSort.value==="largest")
            {
                heroObjects.innerHTML="";
                fetch("https://localhost:5001/Genre/SortedObjectsGrade/"+id+"/true", 
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
        optionSmallest.innerHTML="Grade ⬇";
        selectSort.appendChild(optionSmallest);

        var optionLargerst=document.createElement("option");
        optionLargerst.value="largest";
        optionLargerst.innerHTML="Grade ⬆";
        selectSort.appendChild(optionLargerst);
}
}