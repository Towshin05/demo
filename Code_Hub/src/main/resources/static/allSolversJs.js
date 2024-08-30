document.addEventListener("DOMContentLoaded", function(){
    console.log("DOM loaded successfully")

    const makeRequest = async (config) => {
        try {
            return await axios(config);
        } catch (error) {
            console.error("Error making request:", error);
        }
    }
    const username = sessionStorage.getItem("username")
    if(username!=null) {
        const btn = document.createElement('button')
        btn.classList.add("login-btn")
        btn.innerHTML = `${username}`
        const navBar = document.querySelector('.navbar')
        navBar.appendChild(btn)
        btn.addEventListener("click", function (){
            window.location.href= "solverProfile.html"
        })
    }

    const admin = sessionStorage.getItem("admin")
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
    console.log(username)

    const getData = () =>{
        makeRequest({
            method: 'get',
            url: `/allSolvers`
        })
            .then((response) => {
                console.log(response)
                const solvers = response.data.allSolvers
                const totalSolved = response.data.totalSolved
                const tableBody = document.getElementById("solversTableBody")
                solvers.forEach(solver => {
                    const userName = solver.user_name;
                    const solvedCount = totalSolved[userName] || 0
                    const row = document.createElement("tr");

                    const userNameCell = document.createElement("td");
                    userNameCell.textContent = userName;
                    row.appendChild(userNameCell);

                    const solvedCountCell = document.createElement("td");
                    solvedCountCell.textContent = solvedCount;
                    row.appendChild(solvedCountCell);

                    const viewButtonCell = document.createElement("td");
                    const viewButton = document.createElement("button");
                    viewButton.textContent = "View";
                    viewButton.addEventListener("click", () => {
                        sessionStorage.setItem("visitedUserName", userName)
                        window.location.href = `visitSolver.html`
                    })
                    viewButtonCell.appendChild(viewButton);
                    row.appendChild(viewButtonCell);

                    tableBody.appendChild(row)
                })


                var tbody = document.querySelector("tbody");
                var pageUl = document.querySelector(".pagination");
                var itemShow = document.querySelector("#itemperpage");
                var tr = tbody.querySelectorAll("tr");
                var emptyBox = [];
                var index = 1;
                var itemPerPage = 8;

                var search = document.getElementById("search");
                search.onkeyup = e=>{
                    const text = e.target.value;
                    for(let i=0; i<tr.length; i++){
                        const matchText = tr[i].querySelectorAll("td")[0].innerText;
                        const matchText2 = tr[i].querySelectorAll("td")[1].innerText;
                        if(matchText.toLowerCase().indexOf(text.toLowerCase()) > -1){
                            tr[i].style.visibility = "visible";
                        }
                        else if(matchText2.toLowerCase().indexOf(text.toLowerCase()) > -1){
                            tr[i].style.visibility = "visible";
                        }
                        else{
                            tr[i].style.visibility= "collapse";
                        }
                    }
                }

                for(let i=0; i<tr.length; i++){ emptyBox.push(tr[i]);}

                itemShow.onchange = giveTrPerPage;
                function giveTrPerPage(){
                    itemPerPage = Number(this.value);
                    // console.log(itemPerPage);
                    displayPage(itemPerPage);
                    pageGenerator(itemPerPage);
                    getpagElement(itemPerPage);
                }

                function displayPage(limit){
                    tbody.innerHTML = '';
                    for(let i=0; i<limit; i++){
                        tbody.appendChild(emptyBox[i]);
                    }
                    const  pageNum = pageUl.querySelectorAll('.list');
                    pageNum.forEach(n => n.remove());
                }
                displayPage(itemPerPage);

                function pageGenerator(getem){
                    const num_of_tr = emptyBox.length;
                    if(num_of_tr <= getem){
                        pageUl.style.display = 'none';
                    }else{
                        pageUl.style.display = 'flex';
                        const num_Of_Page = Math.ceil(num_of_tr/getem);
                        for(i=1; i<=num_Of_Page; i++){
                            const li = document.createElement('li'); li.className = 'list';
                            const a =document.createElement('a'); a.href = '#'; a.innerText = i;
                            a.setAttribute('data-page', i);
                            li.appendChild(a);
                            pageUl.insertBefore(li,pageUl.querySelector('.next'));
                        }
                    }
                }
                pageGenerator(itemPerPage);
                let pageLink = pageUl.querySelectorAll("a");
                let lastPage =  pageLink.length - 2;

                function pageRunner(page, items, lastPage, active){
                    for(button of page){
                        button.onclick = e=>{
                            const page_num = e.target.getAttribute('data-page');
                            const page_mover = e.target.getAttribute('id');
                            if(page_num != null){
                                index = page_num;

                            }else{
                                if(page_mover === "next"){
                                    index++;
                                    if(index >= lastPage){
                                        index = lastPage;
                                    }
                                }else{
                                    index--;
                                    if(index <= 1){
                                        index = 1;
                                    }
                                }
                            }
                            pageMaker(index, items, active);
                        }
                    }

                }
                var pageLi = pageUl.querySelectorAll('.list'); pageLi[0].classList.add("active");
                pageRunner(pageLink, itemPerPage, lastPage, pageLi);

                function getpagElement(val){
                    let pagelink = pageUl.querySelectorAll("a");
                    let lastpage =  pagelink.length - 2;
                    let pageli = pageUl.querySelectorAll('.list');
                    pageli[0].classList.add("active");
                    pageRunner(pagelink, val, lastpage, pageli);

                }

                function pageMaker(index, item_per_page, activePage){
                    const start = item_per_page * index;
                    const end  = start + item_per_page;
                    const current_page =  emptyBox.slice((start - item_per_page), (end-item_per_page));
                    tbody.innerHTML = "";
                    for(let j=0; j<current_page.length; j++){
                        let item = current_page[j];
                        tbody.appendChild(item);
                    }
                    Array.from(activePage).forEach((e)=>{e.classList.remove("active");});
                    activePage[index-1].classList.add("active");
                }
            })
    }
    getData()
})
