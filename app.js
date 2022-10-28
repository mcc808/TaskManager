function saveTask(){
    //console.log("Saving task...");
    let title = $('#txtTitle').val();
    let desc = $('#txtDescription').val();
    let priority = $('#selPriority').val();
    let dueDate = $('#selDueDate').val();
    let contact = $('#txtContact').val();
    let participants = $('#txtParticipants').val();
    let color = $('#selColor').val();

    let task = new Task(isImportant,title,desc,priority,dueDate, contact, participants, color);

    console.log(task);
    display(task);
    clearForm();
}

function clearForm(){
    $('#txtTitle').val("");
    $('#txtDescription').val("");
    $('##selPriority').val("");
    $('##selDueDate').val("");
    $('#txtContact').val("");
    $('#txtParticipants').val("");
    $('#selColor').val("");
}

function display(task){
    console.log(task.title);

    let syntax = `<div class="task">
        <div class"head">
            <h5>${task.title}</h5>
            <p>${task.description}</p>
        </div>

        <div class="middle">
            <label>${task.priority}</label>
            <label>${task.dueDate}</label>
        </div>

        <div class="tail">
            <label>${task.title}</label>
            <label>${task.description}</label>
        </div>
    </div>`;

    $("#task-list").append(syntax);
}

function init(){
    console.log("Task Manager");
    //load data


    //hook events
    $('#btnSave').click(saveTask);
    $('#iImportant').click(toggleImportant);
    $('#btnHideForm').click(toggleForm);
}

window.onload = init;