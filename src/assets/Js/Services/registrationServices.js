
document.getElementById('userRegistrationForm').addEventListener('submit', function (event) {
    event.preventDefault();

    let userName = document.getElementById('registrationFullName').value;
    let userEmail = document.getElementById('registrationEmail').value;
    let userPassword = document.getElementById('registrationPassword').value;
    let userRegistration = new User(userName, userEmail, userPassword);
    let userCheckExists = checkUserExists(userRegistration);
    if (userCheckExists == null) {        
        const listUsers = JSON.parse(localStorage.getItem('listUsers')) || [];
        userRegistration.id = listUsers.length + 1
        listUsers.push(userRegistration);
        localStorage.setItem('userLogged', JSON.stringify(userRegistration))
        localStorage.setItem('listUsers', JSON.stringify(listUsers))
        document.getElementById('alertUserCreate').classList.add('show');
        setTimeout(function () {
            document.getElementById('alertUserCreate').classList.remove('show');
            openMainPage()
        }, 3000);
        
    } else {
        document.getElementById('alertUserExist').classList.add('show');
        setTimeout(function () {
            document.getElementById('alertUserExist').classList.remove('show');
        }, 3000);
    }
})

function checkUserExists(userCheck) {
    const users = JSON.parse(localStorage.getItem('listUsers')) || [];
    const user = users.find(u => u.email === userCheck.email);
    if (user) {
        return user;
    } else {
        return null;
    }
}

function openMainPage() {
    window.location.href = "index.html"
}