var iconImportant = "fas fa-exclamation";
var iconNonImportant = "far fa-exclamation";
var isImportant = false;
var isVisible = true;

function toggleImportant(){
    if(isImportant){
        //should not be important
        $("#iImportant").removeClass(iconImportant);
        $("#iImportant").addClass(iconNonImportant);
        isImportant = false;
    }else{
        //should be important
        $("#iImportant").removeClass(iconNonImportant);
        $("#iImportant").addClass(iconImportant);
        isImportant = true;
    }
}

function toggleForm(){
    if(isVisible){
        $(".form").hide();
        isVisible = false;
    }else{
        $(".form").show();
        isVisible = true; 
    }
}

function saveTask(){
    let title = $('#txtTitle').val();
    let description = $('#txtDescription').val();
    let priority = $('#selPriority').val();
    let dueDate = $('#selDueDate').val();
    let contact = $('#txtContact').val();
    let participants = $('#txtParticipants').val();
    let color = $('#selColor').val();

    let task = new Task(isImportant,title,description,priority,dueDate,contact,participants,color);
    console.log(task);

    //save the task on the server
    
    //CREATE A POST REQUEST TO: http://fsdiapi.azurewebsites.net/api/tasks/

    $.ajax({
        type: "POST",
        url: "http://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(task),
        contentType:"application/json",
        success:function(res){
            display(task);
            clearForm(task);
        },
        error:function(error){
            console.log(error);
        }
    });

    //console.log("Saving task...");
    //console.log(task);

    //display(task);
    //clearForm(task);
}

function clearForm(){
    $('#txtTitle').val("");
    $('#txtDescription').val("");
    $('#selPriority').val("");
    $('#selDueDate').val("");
    $('#txtContact').val("");
    $('#txtParticipants').val("");
    $('#selColor').val("#000000");
}

function display(task){
    console.log(task.title);

    let syntax = `<div class="task" style="boder-color:${task.color}">
        <div class"head">
            <h5>${task.title}</h5>
            <p>${task.description}</p>
        </div>

        <div class="middle">
            <label>${task.priority}</label>
            <label>${task.dueDate}</label>
        </div>

        <div class="tail">
            <label>${task.contact}</label>
            <label>${task.participants}</label>
        </div>
    </div>`;

    $("#task-list").append(syntax);
}

function testGet(){
    $.ajax({type: "GET",url:"http://fsdiapi.azurewebsites.net/",
    success:function(response){
        console.log(response);
    },
    error:function(error){
        console.log(error);
 }});

}

function fetchTasks(){
    //load the tasks from the server and display name
    //send the request to: http://fsdiapi.azurewebsites.net/api/tasks
    //console log the response from the server

    $.ajax({
        type: "GET", 
        url: "http://fsdiapi.azurewebsites.net/api/tasks",
        success: function(res){
            let list = JSON.parse(res);
            for (let i = 0; i < list.length; i++) {
                let task = list[i];
                //if the task is yours, then display
                if(task.developer === "Manuel"){
                    display(task);
                }
            }
        },
        error: function(details){
            console.log(details);
        }
    });
}

function init(){
    console.log("Task Manager");
    //load data
    fetchTasks();

    //hook events
    $('#btnSave').click(saveTask);
    $('#iImportant').click(toggleImportant);
    $('#btnHideForm').click(toggleForm);
}

window.onload = init;