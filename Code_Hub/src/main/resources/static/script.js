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

const username = sessionStorage.getItem("username");
if (username == null) {
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
}
