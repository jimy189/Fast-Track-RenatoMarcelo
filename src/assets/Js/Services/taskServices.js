let user = JSON.parse(localStorage.getItem('userLogged'));
let listBody = document.getElementById('list__task-body')
listBody.innerHTML = ''
RenderListTasks(user.id)


//Create Task
document.getElementById('task__form-create').addEventListener('submit', (event) => {
    listBody.innerHTML = ''    
    const user = JSON.parse(localStorage.getItem('userLogged'));
    let task = new Task();
    const listTask = JSON.parse(localStorage.getItem('listTask')) || [];
    task.id = listTask.length + 1;
    task.userID = user.id;
    task.title = document.getElementById('taskTitle').value;
    task.dateStart = document.getElementById('dateStart').value;
    task.timeStart = document.getElementById('timeStart').value;
    task.dateEnd = document.getElementById('dateEnd').value;
    task.timeEnd = document.getElementById('timeEnd').value;
    task.status = 0;
    task.description = document.getElementById('description').value;
    listTask.push(task);
    localStorage.setItem('listTask', JSON.stringify(listTask))
    RenderListTasks(user.id)
})

//Get Tasks to Render
function RenderListTasks(userID) {    
    let listBody = document.getElementById('list__task-body')
    let listTasks = JSON.parse(localStorage.getItem('listTask')) || []
    let userTasks = listTasks.filter(task => task.userID == userID)
    if (userTasks.length > 0) {
        let listHead = document.getElementById('list__task-head')
        listHead.innerHTML = `
    <tr>
    <td>Tarefa</td>
    <td>Início</td>
    <td>Término</td>
    <td>Status</td>
    <td>Alterar</td>
    </tr>
    `
        userTasks.map((task) => {
            listBody.innerHTML +=
                `
        <tr  data-id="${task.id}" class="task__row-table" data-toggle="modal" data-target="#exampleModal">
        <td>${task.title}</td>
        <td>${(() => {
                    const dateStart = new Date(task.dateStart)
                    const formatter = Intl.DateTimeFormat('pt-BR', {
                        timeZone: 'UTC',
                        dateStyle: 'short'
                    });
                    return formatter.format(dateStart)
                })()
                } às ${task.timeStart}</td>
        <td>${(() => {
                    const dateStart = new Date(task.dateEnd)
                    const formatter = Intl.DateTimeFormat('pt-BR', {
                        timeZone: 'UTC',
                        dateStyle: 'short'
                    });
                    return formatter.format(dateStart)
                })()} às ${task.timeEnd}</td>
        <td class="${(() => {
                    let dateStart = new Date(`${task.dateStart}T${task.timeStart}`);
                    let dateEnd = new Date(`${task.dateEnd}T${task.timeEnd}`);
                    let dateNow = new Date();
                    let colorStatus;

                    if (task.status != 3) {
                        if (dateEnd < dateNow) {
                            colorStatus = 'text-danger';
                            task.status = 2;
                        } else if (dateStart <= dateNow && dateEnd > dateNow) {
                            colorStatus = 'text-primary';
                            task.status = 1;
                        } else if (dateStart > dateNow) {
                            colorStatus = 'text-warning';
                            task.status = 0;
                        }
                    } else {
                        colorStatus = 'text-success';
                        task.status = 3;
                    }
                    return colorStatus;

                })()}">
        ${(() => {
                    switch (task.status) {
                        case 0:
                            return 'Pendente'
                        case 1:
                            return 'Em Andamento'
                        case 2:
                            return 'Em Atraso'
                        case 3:
                            return 'Realizada'
                    }

                })()}
        </td>
        <td><a href="edit-task.html"><button class="btn btn-warning w-100">Alterar</button></a></td>
        </tr>
        `
        })
    }
}

