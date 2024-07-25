// ===================================================

// age: 28
// birthDate : "1996-5-30"
// email : "emily.johnson@x.dummyjson.com"
// firstName: "Emily"
// gender: "female"
// id : 1
// image: "https://dummyjson.com/icon/emilys/128"
// lastName: "Johnson"
// maidenName: "Smith"
// password : "emilyspass"
// phone : "+81 965-431-3024"
// university : "University of Wisconsin--Madison"
// username : "emilys"

// ===================================================

document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(`1-->`, user);
    if (user) {
        let profile = document.getElementById("profile");

        profile.innerHTML += `
            <img
                src="${user.image}"
                alt="${user.firstName}"
                class="profile-image"
            />
            <h2>Welcome, ${user.username}</h2>
            <div>
                <p><strong>firstName: </strong> ${user.firstName}</p>
                <p><strong>lastName: </strong> ${user.lastName}</p>
                <p><strong>Age: </strong> ${user.age}</p>
                <p><strong>birthDate: </strong>  ${user.birthDate}</p>
                <p><strong>gender: </strong>  ${user.gender}</p>
                <p><strong>university: </strong> ${user.university}</p>
                <p>
                    <strong>phone: </strong> 
                    <a href="tel:${user.phone}"> ${user.phone}</a>
                </p>
                <p>
                    <strong>email: </strong>
                    <a href="mailto:${user.email}">
                        ${user.email}
                    </a>
                </p>
                <p><strong>password: </strong> 
                 <input
                            type="password"
                            id="password"
                            name="password"
                            value="${user.password}"
                        />
                </p>
                <p><strong>ID: </strong> ${user.id}</p>
            </div>
            <button id="logout">Logout</button>
        `;
        // <p><strong>password: </strong> ${user.password}</p>

        document
            .getElementById("logout")
            .addEventListener("click", function () {
                localStorage.removeItem("user");
                window.location.href = "login.html";
            });
    } else {
        window.location.href = "login.html";
    }
});
