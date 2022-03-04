import { Review } from "./review.js";
import { Genre } from "./genres.js";
export class Object
{
    constructor(id, title, description,avrage,avrageCritic,avrageRegular,url,author)
    {
        this.id=id;
        this.title=title;
        this.description=description;
        this.avrage=avrage;
        this.avrageCritic=avrageCritic;
        this.avrageRegular=avrageRegular;
        this.url=url;
        this.author=author;
        this.containerObject=null;
        this.containerGenres=null;
        this.listGenre=[];
        this.listReview=[];
        this.containerStatistic=null;
    }   

    drawObject(host)
    {
        if(!host)
        {
            throw new Error("Parent Element Does Not Exist!");
        }
        this.containerObject = document.createElement("div");
        this.containerObject.className="containerObject";
        host.appendChild(this.containerObject);


//Title 
        const divTitle=document.createElement("div");
        divTitle.className="divTitle";
        this.containerObject.appendChild(divTitle);

        const divNavigation=document.createElement("div");
        divNavigation.className="divNavigation";
        this.containerObject.appendChild(divNavigation);

        let buttonHome=document.createElement("button");
        buttonHome.innerHTML="BACK";
        buttonHome.className="buttonHome";
        divNavigation.appendChild(buttonHome);

        buttonHome.onclick=(ev)=>{
            window.open("reviewer.html", '_self');
        }

        let buttonUsers=document.createElement("button");
        buttonUsers.innerHTML="USERS";
        buttonUsers.className="buttonUsers";
        divNavigation.appendChild(buttonUsers);

        buttonUsers.onclick=(ev)=>{
            window.open("usersMain.html", '_self');
        }

        const Title=document.createElement("div");
        Title.className="Title";
        divTitle.appendChild(Title);

        let titleObject=document.createElement("h2");
        titleObject.className="titleObject";
        titleObject.innerHTML=this.title;
        Title.appendChild(titleObject);

        const divGrade=document.createElement("div");
        divGrade.className="divGrade";
        divTitle.appendChild(divGrade);
        //Avrage
        const divRating=document.createElement("div");
        divRating.className="divRating";
        divGrade.appendChild(divRating);

        let labelAvrage=document.createElement("label");
        labelAvrage.className="labelAvrage";
        labelAvrage.innerHTML="Rating"
        divRating.appendChild(labelAvrage);

        let avrageObject=document.createElement("h3");
        avrageObject.className="avrageObject";
        avrageObject.innerHTML=(+this.avrage.toFixed(2));
        divRating.appendChild(avrageObject);
        //Critics
        const divRatingCritic=document.createElement("div");
        divRatingCritic.className="divRatingCritic";
        divGrade.appendChild(divRatingCritic);

        let labelAvrageCritic=document.createElement("label");
        labelAvrageCritic.className="labelAvrage";
        labelAvrageCritic.innerHTML="Critics"
        divRatingCritic.appendChild(labelAvrageCritic);

        let avrageCriticObject=document.createElement("h4");
        avrageCriticObject.className="avrageCriticObject";
        avrageCriticObject.innerHTML=(+this.avrageCritic.toFixed(2));
        divRatingCritic.appendChild(avrageCriticObject);
        //Regular
        const divRatingRegular=document.createElement("div");
        divRatingRegular.className="divRatingRegular";
        divGrade.appendChild(divRatingRegular);

        let labelAvrageRegular=document.createElement("label");
        labelAvrageRegular.className="labelAvrage";
        labelAvrageRegular.innerHTML="Audience"
        divRatingRegular.appendChild(labelAvrageRegular);

        let avrageRegularObject=document.createElement("h4");
        avrageRegularObject.className="avrageRegularObject";
        avrageRegularObject.innerHTML=(+this.avrageRegular.toFixed(2));
        divRatingRegular.appendChild(avrageRegularObject);
//Title

        const divBody=document.createElement("div");
        divBody.className="divBody";
        this.containerObject.appendChild(divBody);

        let imageObject=document.createElement("img");
        imageObject.className="imageObject";
        imageObject.src="..\\..\\Images\\Objects\\"+this.url;
        imageObject.alt=this.title;
        divBody.appendChild(imageObject);

        const divBodyRight=document.createElement("div");
        divBodyRight.className="divBodyRight";
        divBody.appendChild(divBodyRight);this.containerGenres = document.createElement("div");
        this.containerGenres.className="containerGenras";
        divBody.appendChild(this.containerGenres);

        this.containerGenres = document.createElement("div");
        this.containerGenres.className = "containerGenres";
        divBodyRight.appendChild(this.containerGenres);

        const descriptionObject=document.createElement("p");
        descriptionObject.className="descriptionObject";
        descriptionObject.innerHTML=this.description;
        divBodyRight.appendChild(descriptionObject);

        const divAuthor=document.createElement("div");
        divAuthor.className="divAuthor";
        divBodyRight.appendChild(divAuthor);

        let imageAuthor=document.createElement("img");
        imageAuthor.className="imageAuthorForObject";
        imageAuthor.src="..\\..\\Images\\Authors\\"+this.author.url;
        imageAuthor.onclick=(ev)=>
        {
            localStorage.setItem("objectsType","authors")
            localStorage.setItem("objects",this.author.id);
            window.open("objects.html", '_self');
        }
        divAuthor.appendChild(imageAuthor);

        let srcAuthor=document.createElement("a");
        srcAuthor.className="sourceAuthor";
        srcAuthor.innerHTML=this.author.name+" "+this.author.lastName;
        srcAuthor.onclick=(ev)=>
            {
                localStorage.setItem("objectsType","authors");
                localStorage.setItem("objects",this.author.id);
                localStorage.setItem("authorTitle",this.author.name+" "+this.author.lastName);
                window.open("objects.html", '_self');
            }
        divAuthor.appendChild(srcAuthor);

        fetch("https://localhost:5001/ReviewedObject/GetObjectGenres/"+this.id, 
        {method: "GET"})
        .then
            (
                pGenre=>
                {
                    pGenre.json()
                    .then
                    (
                        genres=>
                        {
                            genres.forEach(genre =>
                            {
                                this.listGenre.push(genre.id);
                                let srcGenre=document.createElement("a");
                                srcGenre.className="sourceGenra";
                                srcGenre.innerHTML="#"+genre.titleGenre;
                                srcGenre.onclick=(ev)=>
                                {
                                    localStorage.setItem("objectsType","genres");
                                    localStorage.setItem("objects",genre.id);
                                    window.open("objects.html", '_self');
                                    localStorage.setItem("genreTitle",genre.titleGenre);
                                }
                                this.containerGenres.appendChild(srcGenre);
                            });
                        })
                })
        let addGenres=document.createElement("button");
        addGenres.onclick=(ev)=>
        {
            const divGenreList=document.createElement("div");
            divGenreList.className="divGenreList";
            host.appendChild(divGenreList);
            this.addGenres(divGenreList);
            
        }
        addGenres.innerHTML="+";
        this.containerGenres.appendChild(addGenres);

        let removeGenres=document.createElement("button");
        removeGenres.onclick=(ev)=>
        {
            const divGenreList=document.createElement("div");
            divGenreList.className="divGenreList";
            host.appendChild(divGenreList);
            this.removeGenres(divGenreList);
        }
        removeGenres.innerHTML="-";
        this.containerGenres.appendChild(removeGenres);

        this.containerStatistic=document.createElement("div");
        this.containerStatistic.className="containerStatistic";
        this.containerObject.appendChild(this.containerStatistic);

        const divGrades=document.createElement("div");
        divGrades.className="divGrades";
        this.containerStatistic.appendChild(divGrades);
        
        const divPie=document.createElement("div");
        divPie.className="piechart";
        this.containerStatistic.appendChild(divPie);

        const divAge=document.createElement("div");
        divAge.className="divAge";
        this.containerStatistic.appendChild(divAge);

        this.drawGradeStat(divGrades);
        this.drawGenderPie(divPie);
        this.drawAgeStat(divAge);
    }
    drawObjectShorter(host)
    {
        if(!host)
        {
            throw new Error("Parent Element Does Not Exist!");
        }
        this.containerObject = document.createElement("div");
        this.containerObject.className="containerObject";
        host.appendChild(this.containerObject);

        let imageObject=document.createElement("img");
        imageObject.className="imageObject";
        imageObject.src="..\\..\\Images\\Objects\\"+this.url;
        imageObject.alt=this.title;
        this.containerObject.appendChild(imageObject);

        const divBody=document.createElement("div");
        divBody.className="divBody";
        this.containerObject.appendChild(divBody);

//Title 
        const divTitle=document.createElement("div");
        divTitle.className="divTitle";
        divBody.appendChild(divTitle);

        const Title=document.createElement("div");
        Title.className="Title";
        divTitle.appendChild(Title);

        let titleObject=document.createElement("h2");
        titleObject.className="titleObject";
        titleObject.innerHTML=this.title;
        Title.appendChild(titleObject);

        const divGrade=document.createElement("div");
        divGrade.className="divGrade";
        divTitle.appendChild(divGrade);
        //Avrage
        const divRating=document.createElement("div");
        divRating.className="divRating";
        divGrade.appendChild(divRating);

        let labelAvrage=document.createElement("label");
        labelAvrage.className="labelAvrage";
        labelAvrage.innerHTML="Rating"
        divRating.appendChild(labelAvrage);

        let avrageObject=document.createElement("h3");
        avrageObject.className="avrageObject";
        avrageObject.innerHTML=(+this.avrage.toFixed(2));
        divRating.appendChild(avrageObject);
        //Critics
        const divRatingCritic=document.createElement("div");
        divRatingCritic.className="divRatingCritic";
        divGrade.appendChild(divRatingCritic);

        let labelAvrageCritic=document.createElement("label");
        labelAvrageCritic.className="labelAvrageCritic";
        labelAvrageCritic.innerHTML="Critics"
        divRatingCritic.appendChild(labelAvrageCritic);

        let avrageCriticObject=document.createElement("h4");
        avrageCriticObject.className="avrageCriticObject";
        avrageCriticObject.innerHTML=(+this.avrageCritic.toFixed(2));
        divRatingCritic.appendChild(avrageCriticObject);
        //Regular
        const divRatingRegular=document.createElement("div");
        divRatingRegular.className="divRatingRegular";
        divGrade.appendChild(divRatingRegular);

        let labelAvrageRegular=document.createElement("label");
        labelAvrageRegular.className="labelAvrageRegular";
        labelAvrageRegular.innerHTML="Audience"
        divRatingRegular.appendChild(labelAvrageRegular);

        let avrageRegularObject=document.createElement("h4");
        avrageRegularObject.className="avrageRegularObject";
        avrageRegularObject.innerHTML=(+this.avrageRegular.toFixed(2));
        divRatingRegular.appendChild(avrageRegularObject);
//Title

        const divBodyRight=document.createElement("div");
        divBodyRight.className="divBodyRight";
        divBody.appendChild(divBodyRight);this.containerGenres = document.createElement("div");
        this.containerGenres.className="containerGenras";
        divBody.appendChild(this.containerGenres);

        this.containerGenres = document.createElement("div");
        this.containerGenres.className = "containerGenres";
        divBodyRight.appendChild(this.containerGenres);

        const descriptionObject=document.createElement("p");
        descriptionObject.className="descriptionObject";
        descriptionObject.innerHTML=this.description;
        divBodyRight.appendChild(descriptionObject);

        const deleteObject=document.createElement("button");
        deleteObject.className="deleteObject"
        deleteObject.innerHTML="❌";
        this.containerObject.appendChild(deleteObject);
        deleteObject.onclick=(ev)=>
        {
            this.deleteObject(host);
        }
        titleObject.onclick=(ev)=>
        {
            localStorage.setItem("idObject",this.id);
            window.open("object.html", '_self');
        }
        imageObject.onclick=(ev)=>
        {
            localStorage.setItem("idObject",this.id);
            window.open("object.html", '_self');
        }
    }
    filterReviews(host)
    {
        if(!host)
        {
            throw new Error("Parent Element Does Not Exist!");
        }
        var selectSort=document.createElement("select");
        selectSort.name="selectReviewSort";
        selectSort.className="selectReviewSort";

        selectSort.onchange=(ev)=>
        {
            selectGrade.value="all";
            var heroReviews=document.querySelector(".heroReviews");
            heroReviews.innerHTML="";
            if(selectSort.value==="newest")
            {
                fetch("https://localhost:5001/ReviewedObject/SortedReviewsDate/"+this.id+"/true", 
                {method: "GET"})
                .then
                (
                pReview=>
                {
                pReview.json()
                .then
                (
                reviews=>
                {
                    reviews.forEach(review =>
                    {
                        let newReview = new Review(review.id, review.text, review.grade, review.date, review.spoiler, review.objectTitle, review.objectUrl, review.userName, review.userUrl);
                        newReview.drawReview(heroReviews);
                    });
                })
                })
            }
            else if(selectSort.value==="oldest")
            {
                fetch("https://localhost:5001/ReviewedObject/SortedReviewsDate/"+this.id+"/false", 
                {method: "GET"})
                .then
                (
                pReview=>
                {
                pReview.json()
                .then
                (
                reviews=>
                {
                    reviews.forEach(review =>
                    {
                        let newReview = new Review(review.id, review.text, review.grade, review.date, review.spoiler, review.objectTitle, review.objectUrl, review.userName, review.userUrl);
                        newReview.drawReview(heroReviews);
                    });
                })
                })
            }
            else if(selectSort.value==="smallest")
            {
                fetch("https://localhost:5001/ReviewedObject/SortedReviewsGrade/"+this.id+"/false", 
                {method: "GET"})
                .then
                (
                pReview=>
                {
                pReview.json()
                .then
                (
                reviews=>
                {
                    reviews.forEach(review =>
                    {
                        let newReview = new Review(review.id, review.text, review.grade, review.date, review.spoiler, review.objectTitle, review.objectUrl, review.userName, review.userUrl);
                        newReview.drawReview(heroReviews);
                    });
                })
                })
            }
            else if(selectSort.value==="largest")
            {
                fetch("https://localhost:5001/ReviewedObject/SortedReviewsGrade/"+this.id+"/true", 
                {method: "GET"})
                .then
                (
                pReview=>
                {
                pReview.json()
                .then
                (
                reviews=>
                {
                    reviews.forEach(review =>
                    {
                        let newReview = new Review(review.id, review.text, review.grade, review.date, review.spoiler, review.objectTitle, review.objectUrl, review.userName, review.userUrl);
                        newReview.drawReview(heroReviews);
                    });
                })
                })
            }
        }
        host.appendChild(selectSort);

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

        var selectGrade=document.createElement("select");
        selectGrade.name="selectReviewGrade";
        selectGrade.className="selectReviewGrade";

        selectGrade.onchange=(ev)=>
        {
            var heroReviews=document.querySelector(".heroReviews");
            heroReviews.innerHTML="";
            if(selectGrade.value==="all")
            {
                fetch("https://localhost:5001/ReviewedObject/SortedReviewsDate/"+this.id+"/true", 
                {method: "GET"})
                .then
                (
                pReview=>
                {
                pReview.json()
                .then
                (
                reviews=>
                {
                    reviews.forEach(review =>
                    {
                        let newReview = new Review(review.id, review.text, review.grade, review.date, review.spoiler, review.objectTitle, review.objectUrl, review.userName, review.userUrl);
                        newReview.drawReview(heroReviews);
                    });
                })
                })
            }
            else
            {
                fetch("https://localhost:5001/ReviewedObject/GetObjectReviewsGrade/"+this.id+"/"+selectGrade.value, 
                {method: "GET"})
                .then
                (
                pReview=>
                {
                pReview.json()
                .then
                (
                reviews=>
                {
                    reviews.forEach(review =>
                    {
                        let newReview = new Review(review.id, review.text, review.grade, review.date, review.spoiler, review.objectTitle, review.objectUrl, review.userName, review.userUrl);
                        newReview.drawReview(heroReviews);
                    });
                })
                })
            }
        }
        host.appendChild(selectGrade);

        var optionAll=document.createElement("option");
        optionAll.value="all";
        optionAll.selected=true;
        optionAll.innerHTML="All Grades";
        selectGrade.appendChild(optionAll);

        var option1=document.createElement("option");
        option1.value="1";
        option1.innerHTML="Grade 1";
        selectGrade.appendChild(option1);

        var option2=document.createElement("option");
        option2.value="2";
        option2.innerHTML="Grade 2";
        selectGrade.appendChild(option2);

        var option3=document.createElement("option");
        option3.value="3";
        option3.innerHTML="Grade 3";
        selectGrade.appendChild(option3);

        var option4=document.createElement("option");
        option4.value="4";
        option4.innerHTML="Grade 4";
        selectGrade.appendChild(option4);

        var option5=document.createElement("option");
        option5.value="5";
        option5.innerHTML="Grade 5";
        selectGrade.appendChild(option5);
    }
    deleteObject(host)
    {
        fetch("https://localhost:5001/ReviewedObject/DeleteObject/" + this.id, {
            method: "DELETE"
        }).then(pObject=> {
            if (pObject.ok) {
                alert("Object Succesfully Deleted!");
                host.removeChild(this.containerObject);
            }
            else
                alert("MistakeOccured!");
        })
    }
    addGenres(host)
    {
        host.innerHTML="";
        var listIDGenras=[];
        console.log(this.listGenre);
        var id=localStorage.getItem("idReviewer"); 
        fetch("https://localhost:5001/Genre/GetAllGenres/"+ id,
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
                        if(!this.listGenre.includes(genre.id))
                        {
                            const containerGenre = document.createElement("div");
                            containerGenre.className="containerGenre";
                            buttonsGenres.appendChild(containerGenre);
    
                            const genreButton = document.createElement("button");
                            genreButton.classList.add("genreButton");
                            genreButton.innerHTML=genre.title;
                            genreButton.value="notSelected";
                            containerGenre.appendChild(genreButton);

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
                        }
                        
                    });
                })
        })

        const buttonForAction=document.createElement("div");
        buttonForAction.className="buttonForAction";
        host.appendChild(buttonForAction);

        const buttonsGenres=document.createElement("div");
        buttonsGenres.className="buttonsGenres";
        host.appendChild(buttonsGenres);

        var addGenresToObject=document.createElement("button");
        addGenresToObject.className="addGenresToObject";
        addGenresToObject.innerHTML="ADD";
        buttonForAction.appendChild(addGenresToObject);

        var close=document.createElement("button");
        close.className="close";
        close.innerHTML="CLOSE";
        buttonForAction.appendChild(close);

        close.onclick=(ev)=>
        {
            host.innerHTML="";
            var docGenres=document.querySelector(".heroObject");
            docGenres.removeChild(host);
        }
        addGenresToObject.onclick=(ev)=>
        {
            
            host.innerHTML="";
            var docGenres=document.querySelector(".heroObject");
            docGenres.removeChild(host);
            let postRequest = encodeURI("https://localhost:5001/ReviewedObject/AddGenras/" + this.id + "?");
                
            var lastElement=listIDGenras.pop();
            listIDGenras.forEach((idGenre) => 
                {
                    postRequest += "idGenre="
                        + idGenre;
                    postRequest += "&";
                });
            postRequest+="idGenre="
            + lastElement;
            
            fetch(postRequest, 
                {
                    method: "PUT" 
                }).then
                    (
                        pObject=>
                        {
                            if(pObject.ok)
                            {
                                alert("Succesfully Added Genres!");
                                this.containerGenres.innerHTML="";
            let addGenres=document.createElement("button");
            addGenres.onclick=(ev)=>
            {
                const divGenreList=document.createElement("div");
                divGenreList.className="divGenreList";
                var docGenres=document.querySelector(".heroObject");
                docGenres.appendChild(divGenreList);
                this.addGenres(divGenreList);
            }
            addGenres.innerHTML="+";
            this.containerGenres.appendChild(addGenres);
        
            let removeGenres=document.createElement("button");
            removeGenres.onclick=(ev)=>
            {
                const divGenreList=document.createElement("div");
                divGenreList.className="divGenreList";
                var docGenres=document.querySelector(".heroObject");
                docGenres.appendChild(divGenreList);
                this.removeGenres(divGenreList);
            }
            removeGenres.innerHTML="-";
            this.containerGenres.appendChild(removeGenres);
            fetch("https://localhost:5001/ReviewedObject/GetObjectGenres/"+this.id, 
            {method: "GET"})
            .then
                (
                    pGenre=>
                    {
                        pGenre.json()
                        .then
                        (
                            genres=>
                            {
                                genres.forEach(genre =>
                                {
                                    this.listGenre.push(genre.id);
                                    let srcGenra=document.createElement("a");
                                    srcGenra.className="sourceGenra";
                                    localStorage.setItem("objectsType","genres");
                                    localStorage.setItem("objects",genre.id);
                                    srcGenra.innerHTML="#"+genre.titleGenre;
                                    srcGenra.href="objects.html";
                                    this.containerGenres.appendChild(srcGenra);
                                });
                            })
                    })
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
    removeGenres(host)
    {
        host.innerHTML="";
        var listIDGenras=[];
        fetch("https://localhost:5001/ReviewedObject/GetObjectGenres/"+ this.id,
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
                        const containerGenre = document.createElement("div");
                        containerGenre.className="containerGenre";
                        buttonsGenres.appendChild(containerGenre);

                        const genreButton = document.createElement("button");
                        genreButton.classList.add("genreButton");
                        genreButton.innerHTML=genre.titleGenre;
                        genreButton.value="notSelected";
                        containerGenre.appendChild(genreButton);

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

        const buttonForAction=document.createElement("div");
        buttonForAction.className="buttonForAction";
        host.appendChild(buttonForAction);

        const buttonsGenres=document.createElement("div");
        buttonsGenres.className="buttonsGenres";
        host.appendChild(buttonsGenres);

        var removeGenresToObject=document.createElement("button");
        removeGenresToObject.className="removeGenresToObject";
        removeGenresToObject.innerHTML="REMOVE";
        buttonForAction.appendChild(removeGenresToObject);

        var close=document.createElement("button");
        close.className="close";
        close.innerHTML="CLOSE";
        buttonForAction.appendChild(close);

        close.onclick=(ev)=>
        {
            var docGenres=document.querySelector(".heroObject");
            docGenres.removeChild(host);
        }

        removeGenresToObject.onclick=(ev)=>
        { 
            var docGenres=document.querySelector(".heroObject");
            docGenres.removeChild(host);
            host.innerHTML="";
            let postRequest = encodeURI("https://localhost:5001/ReviewedObject/DeleteGenras/" + this.id + "?");

        var lastElement=listIDGenras.pop();
        listIDGenras.forEach((idGenre) => 
            {
                postRequest += "idGenre="
                    + idGenre;
                postRequest += "&";
            });
        postRequest+="idGenre="
        + lastElement;

        fetch(postRequest, 
            {
                method: "PUT" 
            }).then
                (
                    pObject=>
                    {
                        if(pObject.ok)
                        {
                            alert("Succesfully Revoved Genres!");
                            this.containerGenres.innerHTML="";
        let addGenres=document.createElement("button");
        addGenres.onclick=(ev)=>
        {
            const divGenreList=document.createElement("div");
            divGenreList.className="divGenreList";
            var docGenres=document.querySelector(".heroObject");
            docGenres.appendChild(divGenreList);
            this.addGenres(divGenreList);
        }
        addGenres.innerHTML="+";
        this.containerGenres.appendChild(addGenres);

        let removeGenres=document.createElement("button");
        removeGenres.onclick=(ev)=>
        {
            const divGenreList=document.createElement("div");
            divGenreList.className="divGenreList";
            var docGenres=document.querySelector(".heroObject");
            docGenres.appendChild(divGenreList);
            this.removeGenres(divGenreList);
        }
        removeGenres.innerHTML="-";
        this.containerGenres.appendChild(removeGenres);
        this.listGenre=[];
        fetch("https://localhost:5001/ReviewedObject/GetObjectGenres/"+this.id, 
        {method: "GET"})
        .then
            (
                pGenre=>
                {
                    pGenre.json()
                    .then
                    (
                        genres=>
                        {
                            genres.forEach(genre =>
                            {
                                this.listGenre.push(genre.id);
                                let srcGenra=document.createElement("a");
                                srcGenra.className="sourceGenra";
                                localStorage.setItem("objectsType","genres");
                                localStorage.setItem("objects",genre.id);
                                srcGenra.innerHTML="#"+genre.titleGenre;
                                srcGenra.href="objects.html";
                                this.containerGenres.appendChild(srcGenra);
                            });
                        })
                })
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
    drawAgeStat(host)
    {
        var a1;
        var a2;
        var a3;
        var a4;

        fetch("https://localhost:5001/ReviewedObject/GetObjectStats/"+this.id, 
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
                        a1=object.less20;
                        a2=object.between2040;
                        a3=object.between4060;
                        a4=object.more60;
                
                        var one=document.createElement("div");
                        one.className="gradeContainer";
                        if(this.count!=0)
                        var precent=(parseInt(a1)*100)/object.count;
                        else
                        precent=0;
                        host.appendChild(one);
                
                        if(precent>0)
                       { 
                        var oneFilled=document.createElement("div");
                        oneFilled.className="filled";
                        oneFilled.innerHTML="<20";
                        oneFilled.style.setProperty("--d",precent+"%");
                        one.appendChild(oneFilled);
                      }
                      else
                      one.innerHTML="<20";
                        
                        var two=document.createElement("div");
                        two.className="gradeContainer";
                        if(this.count!=0)
                        precent=(a2/object.count)*100;
                        else
                        precent=0;
                        host.appendChild(two);
                
                        if(precent>0)
                        {
                        var twoFilled=document.createElement("div");
                        twoFilled.className="filled";
                        twoFilled.innerHTML="20-40";
                        twoFilled.style.setProperty("--d",precent+"%");
                        two.appendChild(twoFilled);
                        }
                        else
                        two.innerHTML="20-40";
                
                        var three=document.createElement("div");
                        if(this.count!=0)
                        precent=(a3/object.count)*100;
                        else 
                        precent=0;
                        three.className="gradeContainer";
                        host.appendChild(three);
                
                       if(precent>0)
                       { 
                        var threeFilled=document.createElement("div");
                        threeFilled.className="filled";
                        threeFilled.innerHTML="40-60";
                        threeFilled.style.setProperty("--d",precent+"%");
                        three.appendChild(threeFilled);
                       }
                       else
                       three.innerHTML="40-60";
                
                        var four=document.createElement("div");
                        four.className="gradeContainer";
                        if(this.count!=0)
                        precent=(a4/object.count)*100;
                        else
                        precent=0;
                        host.appendChild(four);

                        if(precent>0)
                        { 
                        var fourFilled=document.createElement("div");
                        fourFilled.className="filled";
                        fourFilled.innerHTML=">60";
                        fourFilled.style.setProperty("--d",precent+"%");
                        four.appendChild(fourFilled);
                        }
                        else
                        four.innerHTML=">60";
                    });
                })
        })
    }
    drawGenderPie(host)
    {
        var f;
        var m;
        fetch("https://localhost:5001/ReviewedObject/GetObjectStats/"+this.id, 
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
                        f=object.female;
                        m=object.male;

                        
                        if(this.count!=0)
                        var precent=(parseInt(f)*360)/object.count;
                        else precent=0;

                        host.style.setProperty("--l",precent+"deg");
                    });
                })
        })
    }
    drawGradeStat(host)
    {
        var a1;
        var a2;
        var a3;
        var a4;
        var a5;

        fetch("https://localhost:5001/ReviewedObject/GetObjectStats/"+this.id, 
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
                        a1=object.one;
                        a2=object.two;
                        a3=object.three;
                        a4=object.four;
                        a5=object.five; 
                
                        var one=document.createElement("div");
                        one.className="gradeContainer";
                        if(this.count!=0)
                        var precent=(parseInt(a1)*100)/object.count;
                        else
                        precent=0;
                        host.appendChild(one);
                
                        if(precent!=0)
                        {
                        var oneFilled=document.createElement("div");
                        oneFilled.className="filled";
                        oneFilled.innerHTML="1";
                        oneFilled.style.setProperty("--d",precent+"%");
                        one.appendChild(oneFilled);
                        }
                        else 
                        one.innerHTML="1";

                        var two=document.createElement("div");
                        two.className="gradeContainer";
                        if(this.count!=0)
                        precent=(a2/object.count)*100;
                        else
                        precent=0;
                        host.appendChild(two);

                        if(precent!=0)
                        {
                        var twoFilled=document.createElement("div");
                        twoFilled.className="filled";
                        twoFilled.innerHTML="2";
                        twoFilled.style.setProperty("--d",precent+"%");
                        two.appendChild(twoFilled);
                        }
                        else
                        two.innerHTML="2";

                        var three=document.createElement("div");
                        if(this.count!=0)
                        precent=(a3/object.count)*100;
                        else 
                        precent=0;
                        three.className="gradeContainer";
                        host.appendChild(three);
                
                        if(precent!=0)
                        {
                        var threeFilled=document.createElement("div");
                        threeFilled.className="filled";
                        threeFilled.innerHTML="3";
                        threeFilled.style.setProperty("--d",precent+"%");
                        three.appendChild(threeFilled);
                        }
                        else
                        three.innerHTML="3";
                
                        var four=document.createElement("div");
                        four.className="gradeContainer";
                        if(this.count!=0)
                        precent=(a4/object.count)*100;
                        else
                        precent=0;
                        host.appendChild(four);
                
                        if(precent!=0)
                        {
                        var fourFilled=document.createElement("div");
                        fourFilled.className="filled";
                        fourFilled.innerHTML="4";
                        fourFilled.style.setProperty("--d",precent+"%");
                        four.appendChild(fourFilled);
                        }
                        else
                        four.innerHTML="4";
                
                        var five=document.createElement("div");
                        five.className="gradeContainer";
                        if(this.count!=0)
                        precent=(a5/object.count)*100;
                        else
                        precent=0;
                        host.appendChild(five);
                
                        if(precent!=0)
                        {
                        var fiveFilled=document.createElement("div");
                        fiveFilled.className="filled";
                        fiveFilled.innerHTML="5";
                        fiveFilled.style.setProperty("--d",precent+"%");
                        five.appendChild(fiveFilled);
                        }
                        else
                        five.innerHTML="5";
                    });
                })
        })
    }
}