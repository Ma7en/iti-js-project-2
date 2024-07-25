// =========================================
// =========================================

// user: 1
// username => emilys
// password => emilyspass

//user: 30
// username => addisonw
// password => addisonwpass

// =========================================
// =========================================
// https://dummyjson.com/users
// https://www.w3schools.com/jsref/jsref_find.asp

// =========================================
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        window.location.href = "profile.html";
    } else {
        const loginForm = document.getElementById("login-form");
        loginForm.addEventListener("submit", handleLogin);
    }
});

function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("https://dummyjson.com/users")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const users = data.users;
            const user = users.find(
                (user) =>
                    user.username === username && user.password === password
            );
            console.log(`100->`, user);

            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
                window.location.href = "profile.html";
            } else {
                // console.log("Invalid username or password");
                alert("Invalid username or password");
            }
        });
}
