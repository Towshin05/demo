document.addEventListener("DOMContentLoaded", function () {

    let username= sessionStorage.getItem("username");
    let admin= sessionStorage.getItem("admin");

    if(username!=null){
        const btn = document.createElement('button')
        btn.classList.add("login-btn")
        btn.innerHTML = "Log out"
        const navBar = document.querySelector('.navbar')
        navBar.appendChild(btn)
        btn.addEventListener("click", function (){
            sessionStorage.removeItem("username")
            window.location.href= "homepage.html"
        })
    }
    if(admin!=null){
        const btn = document.createElement('button')
        btn.classList.add("login-btn")
        btn.innerHTML = "Log out"
        const navBar = document.querySelector('.navbar')
        navBar.appendChild(btn)
        btn.addEventListener("click", function (){
            sessionStorage.removeItem("admin")
            window.location.href= "homepage.html"
        })
    }
    const makeRequest = async (config) => {
        return await axios({
            ...config,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    };

    const getData = () => {
        makeRequest({
            method: 'get',
            url: `/getProblems`
        })
            .then((res) => {
                console.log(res);

                // getting username if logged in
                const username= sessionStorage.getItem("username");
                const admin= sessionStorage.getItem("admin");

                if(username==null || admin!=null){
                    const myProfileForSolvers = document.querySelector(".myProfileForSolvers");
                    myProfileForSolvers.style.display="none";
                }

                //initializing global parameters
                let Website="all";
                let Category= "all";
                let Level = "all";
                let Searched= null;
                let Mine= null;

                //creating solution list
                let solutionBySolver = {};
                res.data.solveds.forEach(solved=>{
                    if(solved.solver.user_name==username){
                        solutionBySolver[solved.problem.prob_id]=solved.solution_link;
                    }
                })

                const update_table = (website,category,level,searched,mine) =>{

                    let sortedProblem = res.data.problems;
                    //console.log(sortedProblem[0]);

                    // sort by category
                    let cproblems= [];
                    if(category!="all"){
                        // let index=0;
                        res.data.fallIns.forEach(fallin=>{
                            if(fallin.category.cat_id==category){
                                cproblems.push(fallin.problem);
                                // index++;
                            }
                        })
                        sortedProblem=cproblems;
                    }

                    //sort by website
                    if(website!="all"){
                        sortedProblem = sortedProblem.filter(problem=>{
                            return problem.website.web_id==website;
                        })
                    }

                    //sort by level
                    if(level!="all"){
                        sortedProblem = sortedProblem.filter(problem=>{
                            return problem.level==level;
                        })
                    }

                    //sort by mine
                    if(mine!=null){
                        sortedProblem = sortedProblem.filter(problem=>{
                            return solutionBySolver[problem.prob_id]!=null;
                        })
                    }

                    //sort by searched
                    if(searched!=null){
                        const inputValue = searched.toLowerCase();
                        sortedProblem = sortedProblem.filter(problem=>{
                            return `${problem.title}`.toLowerCase().includes(inputValue);
                        })
                    }

                    //finally sort easy->medium->hard
                    sortedProblem.sort((a,b) => a.level - b.level);

                    //updating category progress bar max
                    const catprogress= document.querySelector(".catprogress");
                    catprogress.max= sortedProblem.length;
                    catprogress.value=0;

                    const defineLevel = {
                        1 : "Easy",
                        2 : "Medium",
                        3 : "Hard"
                    };

                    const status= {
                        "Solved" : "<i class=\"fa-solid fa-circle-check\" area-hidden=\"true\" style='color: #07dc10'></i>",
                        "Unsolved" : "<i class=\"fa fa-circle\" aria-hidden=\"true\" style='color: #9b9898'></i>"
                    }

                    const createtrData = (page)=>{

                        const one_problem = document.querySelector(".one_problem");
                        one_problem.innerHTML="";
                        const problem=sortedProblem;
                        // console.log(problem);

                        for (let i=((page-1)*maxperpage);i<(page*maxperpage) && i<problem.length;i++){
                            const tr = document.createElement("tr");
                            let slv="Unsolved";
                            let solutionLink= "<span style='color: deepskyblue; cursor: pointer'>Add</span>";
                            if(solutionBySolver[problem[i].prob_id]!=null){
                                slv= "Solved";
                                solutionLink=`<div class="linkoptions">
                                          <a href="${solutionBySolver[problem[i].prob_id]}" target="_blank"><i class="fas fa-link"></i></a>
                                          <div class="theoptions">
                                          <button class="edit${problem[i].prob_id}">Edit</button>
                                          <button class="delete${problem[i].prob_id}">Delete</button>
                                          </div>
                                          </div>`;

                                //Updating progress bar values
                                catprogress.value++;
                            }

                            let tutorialLink= "<span style='color: darkred'>Unavailable</span>";
                            if(problem[i].tutorial_link!=null){
                                tutorialLink=`<a href="${problem[i].tutorial_link}" target="_blank"><i class="fas fa-link"></i></a>`;
                            }
                            console.log(tutorialLink);

                            tr.innerHTML = `<td>${status[slv]}</td>
                                        <td class="probtitle${problem[i].prob_id}">${problem[i].title}</td>
                                        <td>${problem[i].website.web_name}</td>
                                        <td><a href="${problem[i].link}" target="_blank"><i class="fas fa-link"></i></a></td>
                                        <td>${defineLevel[problem[i].level]}</td>
                                        <td>${tutorialLink}</td>
                                        <td class="giveSolutionLink${problem[i].prob_id}">${solutionLink}</td>`;

                            one_problem.appendChild(tr);

                            const div1 = document.createElement("div");


                            div1.innerHTML=`<a href="adminUploadProblems.html"><button class="adminOptions" id="editButtonOfProb${problem[i].prob_id}">Edit</button></a>
                                           <button class="adminOptions" id="deleteProblem${problem[i].prob_id}">Delete</button>`;

                            div1.style.display="none";
                            one_problem.appendChild(div1);

                            console.log(slv);
                            if(slv=="Unsolved"){
                                //console.log("lala");
                                document.querySelector(`.giveSolutionLink${problem[i].prob_id}`).addEventListener("click",()=>{
                                    const addpopup = document.querySelector(".notice");
                                    addpopup.style.display= "block";
                                    if(username==null && admin==null){
                                        addpopup.innerHTML=
                                            `<h3>Please Log in as a solver to add a solution link.</h3><br>
                                         <button class="ok" id="golog">Go to log in</button><br><br>
                                         <button class="ok" id="later">Later</button>`;
                                        document.querySelector("#golog").addEventListener("click",()=>{
                                            sessionStorage.setItem("login","on");
                                            window.location.href="homepage.html";
                                        })
                                        document.querySelector("#later").addEventListener("click",()=>{
                                            addpopup.style.display= "none";
                                        })
                                    }
                                    else if(admin!=null){
                                        addpopup.innerHTML=
                                            `<h3>Please Log in as a solver to add a solution link.</h3><br>
                                             <button class="ok" id="later">Ok</button>`;
                                        document.querySelector("#later").addEventListener("click",()=>{
                                            addpopup.style.display= "none";
                                        })
                                    }
                                    else{
                                        addpopup.innerHTML=
                                            `<h2>Please provide the link to your solution here</h2>
                                        <h3>(the link of the page where your solution is located)</h3>
                                        <input type="text" class="linkput" placeholder="e.g. https://codeforces.com/" required><br><br>
                                        <button type="submit" class="ok" id="adds">Add</button>
                                        <button class="ok" id="later" style="margin-left: 50px;">Later</button>`;
                                        document.querySelector("#adds").addEventListener("click",()=>{
                                            const inputvalue = document.querySelector(".linkput").value;
                                            if(inputvalue==""){
                                                alert("Please give a link first");
                                            }
                                            else{
                                                const postdata = {
                                                    "username" : username,
                                                    "problem" : problem[i].prob_id,
                                                    "solutionLink" : inputvalue
                                                };
                                                makeRequest({
                                                    method: 'post',
                                                    url: `/submitSolutionLink`,
                                                    data: postdata
                                                })
                                                    .then((res)=>{
                                                        console.log(res);
                                                        const succespopup = document.querySelector(".notice");
                                                        succespopup.style.display= "block";
                                                        succespopup.innerHTML=
                                                            `<h1><i class="fa fa-check" aria-hidden="true" style="color: #967d00"></i></h1><br>
                                                            <h3>${res.data}</h3><br>
                                                            <button class="ok">Ok</button>`
                                                        document.querySelector(".ok").addEventListener("click",()=>{
                                                            window.location.href="problenlist.html";
                                                        })
                                                    })
                                                    .catch((err) => console.error(err));
                                            }
                                        })
                                        document.querySelector("#later").addEventListener("click",()=> {
                                            addpopup.style.display = "none";
                                        })
                                    }
                                })
                            }
                            else{
                                document.querySelector(`.edit${problem[i].prob_id}`).addEventListener("click",()=>{
                                    const addpopup = document.querySelector(".notice");
                                    addpopup.style.display="block";
                                    addpopup.innerHTML=
                                        `<h2>Edit the solution link here</h2>
                                        <h3>(the link of the page where your solution is located)</h3>
                                        <input type="text" class="linkput" required><br><br>
                                        <button type="submit" class="ok" id="adds">Edit</button>
                                        <button class="ok" id="later" style="margin-left: 50px;">Later</button>`;
                                    const input = document.querySelector(".linkput");
                                    input.value=`${solutionBySolver[problem[i].prob_id]}`;
                                    document.querySelector("#adds").addEventListener("click",()=>{
                                        const inputvalue = input.value;
                                        if(inputvalue==""){
                                            alert("Please give a link first");
                                        }
                                        else{
                                            const postdata = {
                                                "username" : username,
                                                "problem" : problem[i].prob_id,
                                                "solutionLink" : inputvalue
                                            };
                                            makeRequest({
                                                method: 'post',
                                                url: `/submitSolutionLink`,
                                                data: postdata
                                            })
                                                .then((res)=>{
                                                    console.log(res);
                                                    const succespopup = document.querySelector(".notice");
                                                    succespopup.style.display= "block";
                                                    succespopup.innerHTML=
                                                        `<h1><i class="fa fa-check" aria-hidden="true" style="color: #967d00"></i></h1><br>
                                                     <h3>${res.data}</h3><br>
                                                     <button class="ok">Ok</button>`
                                                    document.querySelector(".ok").addEventListener("click",()=>{
                                                        window.location.href="problenlist.html";
                                                    })
                                                })
                                                .catch((err) => console.error(err));
                                        }
                                    })
                                    document.querySelector("#later").addEventListener("click",()=> {
                                        addpopup.style.display = "none";
                                    })
                                })

                                document.querySelector(`.delete${problem[i].prob_id}`).addEventListener("click",()=>{
                                    const addpopup = document.querySelector(".notice");
                                    addpopup.style.display="block";
                                    addpopup.innerHTML=
                                        `<h3>Do you want to delete this solution?</h3>
                                   <button type="submit" class="ok" id="deleteyes">Yes</button>
                                   <button class="ok" id="deleteno" style="margin-left: 50px;">No</button>`;

                                    document.querySelector("#deleteyes").addEventListener("click",()=>{
                                        const postdata = {
                                            "username" : username,
                                            "problem" : problem[i].prob_id,
                                        };
                                        makeRequest({
                                            method: 'post',
                                            url: `/deleteSolutionLink`,
                                            data: postdata
                                        })
                                            .then((res)=>{
                                                console.log(res);
                                                const succespopup = document.querySelector(".notice");
                                                succespopup.style.display= "block";
                                                succespopup.innerHTML=
                                                    `<h1><i class="fa fa-check" aria-hidden="true" style="color: #967d00"></i></h1><br>
                                                     <h3>${res.data} "${problem[i].title}"</h3><br>
                                                     <button class="ok">Ok</button>`
                                                document.querySelector(".ok").addEventListener("click",()=>{
                                                    window.location.href="problenlist.html";
                                                })
                                            })
                                            .catch((err) => console.error(err));
                                    })
                                    document.querySelector("#deleteno").addEventListener("click",()=> {
                                        addpopup.style.display = "none";
                                    })
                                })
                            }

                            if(admin!=null){
                                const upprob = document.querySelector(".upprob");
                                upprob.style.display="block";

                                const probtitle = document.querySelector(`.probtitle${problem[i].prob_id}`);
                                console.log(probtitle);
                                probtitle.style.cursor="pointer";
                                probtitle.addEventListener("click",()=>{
                                    let cursorofdiv1 = div1.style.display;
                                    if(cursorofdiv1=="block") div1.style.display="none";
                                    else div1.style.display="block";
                                    document.querySelector(`#deleteProblem${problem[i].prob_id}`).addEventListener("click",()=>{

                                        const addpopup = document.querySelector(".notice");
                                        addpopup.style.display="block";
                                        addpopup.innerHTML=
                                            `<h3>Do you want to delete this Problem?</h3><br>
                                             <button type="submit" class="ok" id="deleteyes">Yes</button>
                                             <button class="ok" id="deleteno" style="margin-left: 50px;">No</button>`;

                                        document.querySelector("#deleteyes").addEventListener("click",()=>{
                                            const postdata = {
                                                "problem" : problem[i].prob_id,
                                            };
                                            makeRequest({
                                                method: 'post',
                                                url: `/deleteProblem`,
                                                data: postdata
                                            })
                                                .then((res)=>{
                                                    console.log(res);
                                                    const succespopup = document.querySelector(".notice");
                                                    succespopup.style.display= "block";
                                                    succespopup.innerHTML=
                                                        `<h1><i class="fa fa-check" aria-hidden="true" style="color: #967d00"></i></h1><br>
                                                     <h3>${res.data} "${problem[i].title}"</h3><br>
                                                     <button class="ok">Ok</button>`
                                                    document.querySelector(".ok").addEventListener("click",()=>{
                                                        window.location.href="problenlist.html";
                                                    })
                                                })
                                                .catch((err) => console.error(err));
                                        })
                                        document.querySelector("#deleteno").addEventListener("click",()=> {
                                            addpopup.style.display = "none";
                                        })
                                    })

                                    let editBtn = document.getElementById(`editButtonOfProb${problem[i].prob_id}`);
                                    editBtn.addEventListener("click", function (){

                                        sessionStorage.setItem("problemId", problem[i].prob_id)
                                        sessionStorage.setItem("problemName", problem[i].title)
                                        sessionStorage.setItem("problemLink", problem[i].link)
                                        sessionStorage.setItem("problemLevel", defineLevel[problem[i].level])
                                        console.log(`${problem[i].prob_id}`)

                                        if(problem[i].tutorial_link != null && problem[i].tutorial_link != ""){
                                            sessionStorage.setItem("tutorial", problem[i].tutorial_link)
                                        }
                                    })
                                })
                            }
                        }
                    }

                    let Page = 1, maxperpage = 7;

                    const previous = document.querySelector("#previous");
                    const next = document.querySelector("#next");
                    if(Page*maxperpage>=sortedProblem.length){
                        next.classList.remove("next");
                        next.classList.add("nextnone");
                    }
                    createtrData(Page);

                    previous.addEventListener("click",()=>{
                        if(Page>1){
                            Page--;
                            createtrData(Page);
                            next.classList.remove("nextnone");
                            next.classList.add("next");
                            if(Page==1){
                                previous.classList.remove("previous");
                                previous.classList.add("previousnone");
                            }
                        }
                    })

                    next.addEventListener("click",()=>{
                        if(Page*maxperpage<sortedProblem.length) {
                            Page++;
                            createtrData(Page);
                            previous.classList.remove("previousnone");
                            previous.classList.add("previous");
                            if(Page*maxperpage>=sortedProblem.length){
                                next.classList.remove("next");
                                next.classList.add("nextnone");
                            }
                        }
                    })
                }
                update_table(Website,Category,Level,Searched,Mine);

                //select website

                const sortedWebsiteList= res.data.websites;
                sortedWebsiteList.sort((a,b) => a.web_name.localeCompare(b.web_name));

                const dropdown_content= document.querySelector(".dropdown-content");
                const dropbtn= document.querySelector(".dropbtn");

                sortedWebsiteList.forEach(website=>{
                    const web= document.createElement("a");
                    web.innerHTML=`${website.web_name}`;
                    dropdown_content.appendChild(web);

                    web.addEventListener("click",()=>{
                        dropbtn.innerHTML=`${website.web_name}`;
                        Website=website.web_id;
                        update_table(Website,Category,Level,Searched,Mine);
                    })
                })

                document.querySelector(".allweb").addEventListener("click",()=>{
                    dropbtn.innerHTML="All Platform";
                    Website="all";
                    update_table(Website,Category,Level,Searched,Mine);
                })

                //select website

                const sortedCategoryList= res.data.categories;
                sortedCategoryList.sort((a, b) => a.cat_name.localeCompare(b.cat_name));

                const category_content= document.querySelector(".category-content");
                const selcat= document.querySelector(".selcat");

                sortedCategoryList.forEach(category=>{
                    const cat= document.createElement("a");
                    cat.innerHTML=`${category.cat_name}`;
                    category_content.appendChild(cat);

                    cat.addEventListener("click",()=>{
                        selcat.innerHTML=`${category.cat_name}`;
                        Category=category.cat_id;
                        update_table(Website,Category,Level,Searched,Mine);
                    })
                })

                document.querySelector(".allcat").addEventListener("click",()=>{
                    selcat.innerHTML="All Category";
                    Category="all";
                    update_table(Website,Category,Level,Searched,Mine);
                })

                //select level

                const alllev = document.querySelector("#alllev");
                const easy = document.querySelector("#easy");
                const medium = document.querySelector("#medium");
                const hard = document.querySelector("#hard");

                alllev.addEventListener("click",()=>{
                    alllev.classList.add("active");
                    easy.classList.remove("active");
                    medium.classList.remove("active");
                    hard.classList.remove("active");
                    Level="all";
                    update_table(Website,Category,Level,Searched,Mine);
                })

                easy.addEventListener("click",()=>{
                    alllev.classList.remove("active");
                    easy.classList.add("active");
                    medium.classList.remove("active");
                    hard.classList.remove("active");
                    Level=1;
                    update_table(Website,Category,Level,Searched,Mine);
                })

                medium.addEventListener("click",()=>{
                    alllev.classList.remove("active");
                    easy.classList.remove("active");
                    medium.classList.add("active");
                    hard.classList.remove("active");
                    Level=2;
                    update_table(Website,Category,Level,Searched,Mine);
                })

                hard.addEventListener("click",()=>{
                    alllev.classList.remove("active");
                    easy.classList.remove("active");
                    medium.classList.remove("active");
                    hard.classList.add("active");
                    Level=3;
                    update_table(Website,Category,Level,Searched,Mine);
                })

                //updating level and header prgress bars
                const headprogress = document.querySelector(".headprogress");
                const alllevprogress = document.querySelector(".alllevprogress");
                const easyprogress = document.querySelector(".easyprogress");
                const medprogress = document.querySelector(".medprogress");
                const hardprogress = document.querySelector(".hardprogress");

                headprogress.max=res.data.problems.length;
                alllevprogress.max=res.data.problems.length;
                easyprogress.max=0;
                medprogress.max=0;
                hardprogress.max=0;

                headprogress.value=0;
                alllevprogress.value=0;
                easyprogress.value=0;
                medprogress.value=0;
                hardprogress.value=0;

                let e=0,m=0,h=0;
                res.data.problems.forEach(problem=>{
                    if(problem.level==1) easyprogress.max=++e;
                    if(problem.level==2) medprogress.max=++m;
                    if(problem.level==3) hardprogress.max=++h;

                    if(solutionBySolver[problem.prob_id]!=null){
                        headprogress.value++;
                        alllevprogress.value++;
                        if(problem.level==1) easyprogress.value++;
                        if(problem.level==2) medprogress.value++;
                        if(problem.level==3) hardprogress.value++;
                    }
                })

                console.log(easyprogress.max);
                console.log(medprogress.max);
                console.log(hardprogress.max);

                //update progress-header span
                const outof = document.querySelector(".outof");
                outof.innerHTML=`${headprogress.value}/${headprogress.max}`;

                //search
                const searching= document.querySelector(".searching");
                searching.addEventListener("input", () => {
                    if (searching.value != "") {
                        Searched = searching.value.toLowerCase();
                        update_table(Website,Category,Level,Searched,Mine);
                    }
                    else{
                        Searched = null;
                        update_table(Website,Category,Level,Searched,Mine);
                    }
                });

                //show only solved ones
                const quiz_btn = document.querySelector(".quiz-btn");
                quiz_btn.addEventListener("click",()=>{
                    if(Mine==null){
                        Mine="NOT NULL";
                        quiz_btn.classList.add("active");
                        update_table(Website,Category,Level,Searched,Mine);
                    }
                    else{
                        Mine=null;
                        quiz_btn.classList.remove("active");
                        update_table(Website,Category,Level,Searched,Mine);
                    }
                })

            })
            .catch((err) => console.error(err));
    };

    getData();  // Call the function using the correct name

    //removing the sessionstorage values in case admin is returning back from add problem page
    sessionStorage.removeItem("problemId")
    sessionStorage.removeItem("problemName")
    sessionStorage.removeItem("problemLink")
    sessionStorage.removeItem("tutorial")
    sessionStorage.removeItem("problemLevel")
});
