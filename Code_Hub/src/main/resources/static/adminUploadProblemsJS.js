document.addEventListener("DOMContentLoaded", function(){

    const admin = sessionStorage.getItem("admin")
    if(admin!=null){
        const makeRequest = async (config) => {
            return await axios ({
                ...config,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        };

        const login_btn = document.querySelector(".login-btn");
        login_btn.innerHTML=`Log out`;
        login_btn.addEventListener("click",()=>{
            sessionStorage.removeItem("admin")
            window.location.href="homepage.html";
        })

        const id = sessionStorage.getItem('problemId')
        const name = sessionStorage.getItem("problemName")
        const link = sessionStorage.getItem("problemLink")
        const tutorial = sessionStorage.getItem("tutorial")
        const level = sessionStorage.getItem("problemLevel")
        console.log(id)
        console.log(level)

        document.querySelector('.pName').value = name || ''
        document.querySelector('.pLink').value = link || ''
        document.querySelector('.pTutorial').value = tutorial || ''
        document.querySelector('.problem-level-class').value=level || "Easy"


        const getData = (event) => {
            event.preventDefault();

            const form = document.getElementById("uploadProblem");
            const formData = new FormData(form);

            const selectedCategories = Array.from(document.querySelector('.problem-category-multiple').selectedOptions)
                .map(option => option.value);
            const selectedPlatform = document.querySelector('.problem-platform-class').value;
            const levelOfProblem = document.querySelector('.problem-level-class').value;

            // Convert FormData to a plain object
            const formObject = Object.fromEntries(formData.entries());

            formObject['problem-category'] = selectedCategories;
            formObject['problem-platform'] = selectedPlatform;
            formObject['problem-level'] = levelOfProblem;

            const url = id ? `/adminUploadNewProblem?id=${id}` : '/adminUploadNewProblem';

            makeRequest({
                method: 'post',
                url: url,
                data: formObject
            })
                .then((response) => {
                    const success = document.createElement('div');
                    success.classList.add('success-msg');
                    const msg = document.createElement('h3');
                    msg.textContent = response.data;
                    const btn = document.createElement('button');
                    btn.classList.add('success-btn');
                    btn.textContent = 'Okay';
                    btn.addEventListener("click", function () {
                        window.location.href = `adminUploadProblems.html`;
                    });
                    success.style.backgroundColor = '#222';
                    msg.style.color = 'white';
                    success.appendChild(msg);
                    success.appendChild(btn);

                    document.body.appendChild(success);

                })
                .catch((error) => {
                    console.error('Error uploading problem:', error);
                });
        };

        makeRequest({
            method: 'get',
            url: `getWebandCats`,
        })
            .then((response)=>{
                console.log(response);

                //loading websites from database
                const problemplatformclass= document.querySelector(".problem-platform-class");
                response.data.websites.forEach(website=>{
                    const web= document.createElement("option");
                    web.innerHTML=`${website.web_name}`;
                    web.value=`${website.web_name}`;
                    problemplatformclass.appendChild(web);
                })

                //loading categories from database
                const problemcategorymultiple= document.querySelector(".problem-category-multiple");
                response.data.categories.forEach(category=>{
                    const cat= document.createElement("option");
                    cat.innerHTML=`${category.cat_name}`;
                    cat.value=`${category.cat_name}`;
                    problemcategorymultiple.appendChild(cat);
                })

                document.getElementById("uploadProblem").addEventListener("submit", getData);
            })
            .catch((error) => {
                console.error('Error uploading problem:', error);
            });
    }
    else{
        window.location.href = "homepage.html"
    }

});
