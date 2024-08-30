document.addEventListener("DOMContentLoaded", function () {

    const makeRequest = async (config) => {
        return await axios({
            ...config,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    };

    const username = sessionStorage.getItem("username");
    const admin = sessionStorage.getItem("admin");

    if(username!=null){
        const login_btn = document.querySelector(".login-btn");
        login_btn.innerHTML=`${username}`;
        login_btn.addEventListener("click",()=>{
            window.location.href="solverProfile.html";
        })
    }

    else if(admin!=null){
        const login_btn = document.querySelector(".login-btn");
        login_btn.innerHTML=`Log out`;
        login_btn.addEventListener("click",()=>{
            sessionStorage.removeItem("admin")
            window.location.href="homepage.html";
        })
    }

    else {

        const navbarMenu = document.querySelector(".navbar .menu-links");
        const hideMenuBtn = navbarMenu.querySelector(".close-menu-btn");
        const showPopupBtn = document.querySelector(".login-btn");
        const formPopup = document.querySelector(".form-popup");
        const hidePopupBtn = formPopup.querySelector(".close-btn");
        const signupLoginLink = formPopup.querySelectorAll(".bottom-link a");
        const adminPassLink = formPopup.querySelector(".admin-pass-link");
        const loginFormBox = formPopup.querySelector(".form-box.login");
        const adminLoginFormBox = formPopup.querySelector(".form-box.admin-login");
        const signupFormBox = formPopup.querySelector(".form-box.signup");

        showPopupBtn.innerHTML = "Join us";
        showPopupBtn.addEventListener("click", () => {
            document.body.classList.toggle("show-popup");
        });

        hidePopupBtn.addEventListener("click", () => showPopupBtn.click());

        adminPassLink.addEventListener("click", (e) => {
            e.preventDefault();
            formPopup.classList.add("show-admin");
        });

        signupLoginLink.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                if (link.id === 'signup-link') {
                    formPopup.classList.add("show-signup");
                    formPopup.classList.remove("show-admin");
                } else if (link.id === 'login-link') {
                    formPopup.classList.remove("show-signup");
                    formPopup.classList.remove("show-admin");
                }
            });
        });

        const login = sessionStorage.getItem("login");
        if (login != null) {
            sessionStorage.removeItem("login");
            showPopupBtn.click();
        }



        const signInSubmit = document.querySelector(".signInSubmit");

        signInSubmit.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent form from submitting the usual way

            const signInForm = document.querySelector(".signInForm");
            const formData = new FormData(signInForm);

            const postData = {};
            formData.forEach((value, key) => {
                postData[key] = value;
            });
            console.log(postData);

            makeRequest({
                method: 'post',
                url: `/signIn`, // Include the id in the URL
                data: postData,
            })
                .then((res) => {
                    console.log(res);
                    console.log(postData["username"]);
                    sessionStorage.setItem("username", postData["username"]);
                    const succespopup = document.querySelector(".notice");
                    succespopup.style.display = "block";
                    succespopup.innerHTML =
                        `<h1><i class="fa fa-check" aria-hidden="true" style="color: rgb(108, 108, 198)"></i></h1><br>
                     <h3>${res.data}</h3><br>
                     <button class="ok">Ok</button`
                    document.querySelector(".ok").addEventListener("click", () => {
                        window.location.href = "solverProfile.html";
                    })
                })
                .catch((err) => {
                    console.error(err);
                    const errorpopup = document.querySelector(".notice");
                    errorpopup.style.display = "block";
                    errorpopup.innerHTML =
                        `<h1><i class="fa fa-check" aria-hidden="true" style="color: rgb(108, 108, 198)"></i></h1><br>
                     <h3>${err.response.data}</h3><br>
                     <button class="ok">Ok</button>`
                    document.querySelector(".ok").addEventListener("click", () => {
                        errorpopup.style.display = "none";
                    })
                });
        });

        const signUpSubmit = document.querySelector(".signUpSubmit");

        signUpSubmit.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent form from submitting the usual way

            const signUpForm = document.querySelector(".signUpForm");
            const formData = new FormData(signUpForm);

            const postData = {};
            postData["policy"] = "off";
            formData.forEach((value, key) => {
                postData[key] = value;
            });
            console.log(postData);

            if (postData["policy"] == "off") {
                const notice = document.querySelector(".notice");
                notice.style.display = "block";
                notice.innerHTML = `<h3>Terms & Conditions must be agreed</h3><br>>
                                <button class="ok">OK</button>`;
                document.querySelector(".ok").addEventListener("click", () => {
                    notice.style.display = "none";
                })
            } else if (postData["cpassword"] != postData["upassword"]) {
                const notice = document.querySelector(".notice");
                notice.style.display = "block";
                notice.innerHTML = `<h3>Passwords did not match</h3><br>>
                                <button class="ok">OK</button>`;
                document.querySelector(".ok").addEventListener("click", () => {
                    notice.style.display = "none";
                })
            } else {
                makeRequest({
                    method: 'post',
                    url: `/signUp`, // Include the id in the URL
                    data: postData,
                })
                    .then((res) => {
                        console.log(res);
                        const succespopup = document.querySelector(".notice");
                        succespopup.style.display = "block";
                        succespopup.innerHTML =
                            `<h1><i class="fa fa-check" aria-hidden="true" style="color: rgb(108, 108, 198)"></i></h1><br>
                     <h3>Account has been created.</h3><br>
                     <button class="ok">Ok</button`
                        const user = res.data.solver.user_name
                        sessionStorage.setItem("username", user)
                        document.querySelector(".ok").addEventListener("click", () => {
                            window.location.href = "solverProfile.html";
                        })
                    })
                    .catch((err) => {
                        console.error(err);
                        const errorpopup = document.querySelector(".notice");
                        errorpopup.style.display = "block";
                        errorpopup.innerHTML =
                            `<h1><i class="fa fa-check" aria-hidden="true" style="color: rgb(108, 108, 198)"></i></h1><br>
                     <h3>${err.response.data}</h3><br>
                     <button class="ok">Ok</button>`
                        document.querySelector(".ok").addEventListener("click", () => {
                            errorpopup.style.display = "none";
                        })
                    });
            }
        });

        const adminSignInSubmit = document.querySelector(".adminSignInSubmit");

        adminSignInSubmit.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent form from submitting the usual way

            const adminSignInForm = document.querySelector(".adminSignInForm");
            const formData = new FormData(adminSignInForm);

            const postData = {};
            formData.forEach((value, key) => {
                postData[key] = value;
            });
            console.log(postData);

            makeRequest({
                method: 'post',
                url: `/adminSignIn`, // Include the id in the URL
                data: postData,
            })
                .then((res) => {
                    console.log(res);
                    console.log(postData["password"]);
                    sessionStorage.setItem("admin", "yes");
                    const succespopup = document.querySelector(".notice");
                    succespopup.style.display = "block";
                    succespopup.innerHTML =
                        `<h1><i class="fa fa-check" aria-hidden="true" style="color: rgb(108, 108, 198)"></i></h1><br>
                     <h3>${res.data}</h3><br>
                     <button class="ok">Ok</button`
                    document.querySelector(".ok").addEventListener("click", () => {
                        window.location.href = "problenlist.html";
                    })
                })
                .catch((err) => {
                    console.error(err);
                    const errorpopup = document.querySelector(".notice");
                    errorpopup.style.display = "block";
                    errorpopup.innerHTML =
                        `<h1><i class="fa fa-check" aria-hidden="true" style="color: rgb(108, 108, 198)"></i></h1><br>
                     <h3>${err.response.data}</h3><br>
                     <button class="ok">Ok</button>`
                    document.querySelector(".ok").addEventListener("click", () => {
                        errorpopup.style.display = "none";
                    })
                });
        });
    }
});
