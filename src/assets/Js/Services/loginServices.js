document.getElementById('userLoginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    let userEmail = document.getElementById('loginEmail').value;
    let userPassword = document.getElementById('loginPassword').value;
    let users = JSON.parse(localStorage.getItem('listUsers'))||[]
    let user = users.find(u => u.email == userEmail)

    if (user!=null && user.password == userPassword) {
        document.getElementById('alertLoginSucess').classList.add('show')
        setTimeout(()=>{
            document.getElementById('alertLoginSucess').classList.remove('show')
            window.location.href = "index.html"
        },3000)
        localStorage.setItem('userLogged',JSON.stringify(user))       
    }else{
        document.getElementById('alertLoginFail').classList.add('show')
        setTimeout(()=>{
            document.getElementById('alertLoginFail').classList.remove('show')
        },3000)
    }
})