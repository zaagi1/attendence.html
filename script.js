// script.js

document.addEventListener("DOMContentLoaded", function () {

    // 1. SIGNUP LOGIC
    let signupForm = document.getElementById("signupForm");

    if (signupForm) {
        signupForm.onsubmit = function (e) {
            e.preventDefault();

            let name = document.getElementById("suName").value;
            let email = document.getElementById("suEmail").value;
            let pass = document.getElementById("suPass").value;

            // --- QAYBTA CUSUB: Hubinta Magaca (Xarfo kaliya) ---
            // Regex-kan wuxuu ogolaanayaa xarfaha A-Z iyo meelaha banaan (spaces)
            let namePattern = /^[A-Za-z\s]+$/;

            if (!namePattern.test(name)) {
                alert("Fadlan magaca geli adigoo isticmaalaya xarfo kaliya! ❌");
                return;
            }
            // --------------------------------------------------

            if (pass.length < 6) {
                alert("Password-ku waa inuu ka badnaadaa 6 harfo!");
                return;
            }

            // Keydi xogta
            localStorage.setItem("email", email);
            localStorage.setItem("password", pass);
            localStorage.setItem("name", name);

            alert("Signup Successful ✅");
            window.location.href = "attendance.html";
        };
    }
    // 2. LOGIN LOGIC
    let loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.onsubmit = function (e) {
            e.preventDefault();
            let email = document.getElementById("liEmail").value;
            let pass = document.getElementById("liPass").value;

            let savedEmail = localStorage.getItem("email");
            let savedPass = localStorage.getItem("password");

            if (email === savedEmail && pass === savedPass) {
                alert("Login Successful! Ku soo dhawaada.");
                window.location.href = "attendance.html"; // Wuxuu geeynaa bogga attendance-ka
            } else {
                alert("Email ama Password khaldan ❌");
            }
        };
    }

    // 3. CONTACT FORM
    let contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.onsubmit = function (e) {
            e.preventDefault();
            alert("Farriintaada waa la diray! ✅");
            contactForm.reset();
        };
    }
});

// 4. ATTENDANCE LOGIC
let attendanceList = [];
let present = 0;
let absent = 0;

function addAttendance() {
    let name = document.getElementById("studentName").value.trim();
    let status = document.getElementById("status").value;
    let error = document.getElementById("error");

    // Regex: ogolaanaya kaliya xarfaha (A-Z, a-z)
    let namePattern = /^[A-Za-z]+$/;

    if (name === "" || status === "") {
        error.innerHTML = "<span style='color:red'>Fadlan buuxi meelaha bannaan!</span>";
        return;
    }

    // Validation: number iyo space lama ogola
    if (!namePattern.test(name)) {
        error.innerHTML = "<span style='color:red'>Magaca waa inuu ahaadaa xarfaha kaliya, number iyo space lama ogola!</span>";
        return;
    }

    attendanceList.push({ studentName: name, status: status });
    status === "Present" ? present++ : absent++;

    displayAttendance();
    document.getElementById("studentName").value = "";
    document.getElementById("status").value = "";
    error.innerHTML = "";
}


function displayAttendance() {
    let list = document.getElementById("list");
    list.innerHTML = "";
    attendanceList.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.studentName} - ${item.status}`;
        list.appendChild(li);
    });
    document.getElementById("presentCount").textContent = present;
    document.getElementById("absentCount").textContent = absent;
}