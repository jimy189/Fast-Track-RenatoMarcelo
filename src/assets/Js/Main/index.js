

let userLogged = JSON.parse(localStorage.getItem('userLogged'));
if (userLogged == null) {
    window.location.href = 'login.html'
}
let userNameHeader = document.getElementById('userLoggadeName')
userNameHeader.innerText = userLogged.name

function userLogout() {
    localStorage.removeItem('userLogged')
    window.location.href = 'login.html'
}


document.querySelector('#list__task-body').addEventListener('click', (event) => {
    
    let targetElement = event.target;   
    if (targetElement.tagName === 'TD') {      
        let taskRow = targetElement.closest('tr');       
        let taskId = Number(taskRow.dataset.id);      
        let tasks = JSON.parse(localStorage.getItem('listTask'));      
        let taskSelected = tasks.find(task => task.id === taskId);      
        let modalTitle = document.getElementById('exampleModalLabel');
        modalTitle.innerText = taskSelected.title;
        let modalBody = document.getElementById('modal__body');
        modalBody.innerHTML = `
            <p class="text-dark">${taskSelected.description}</p>
        `;     
        
        var target = taskRow.getAttribute('data-target');     
        var modalElement = document.querySelector(target);      
        var modal = new bootstrap.Modal(modalElement);       
        var closeButton = modalElement.querySelector('.close');
        closeButton.addEventListener('click', function () {
            modal.hide();
        });       
        modal.show();
    }
});


document.querySelector('#list__task-body').addEventListener('click', (event) => {
    let targetElement = event.target;    
    if (targetElement.tagName === 'BUTTON' && targetElement.closest('td')) {        
        let tdElement = targetElement.closest('td');        
        let trElement = tdElement.closest('tr');       
        let taskId = Number(trElement.dataset.id);
        let tasks = JSON.parse(localStorage.getItem('listTask'));      
        let taskSelected = tasks.find(task => task.id === taskId);
        localStorage.setItem('alterTaks',JSON.stringify(taskSelected))
    }
});

