var tasks= JSON.parse(localStorage.getItem('allTasks'));
if(tasks == null){
    tasks = []
}

const render = (data) =>{
    const element = document.getElementById("content");
    element.innerHTML='';
    data.map((val,key)=>{
        element.innerHTML += `
                 <div class="card border-0 shadow-sm mt-3">
                    <div class="card-body">
                        <h4 class="text-capitalize">${val.todo}</h4>
                        <button class="btn" onclick="edit(${key})"><i class="fas fa-edit"></i>edit</button>
                        <button class="btn" onclick="trash(${key})"><i class="fas fa-trash-alt"></i>trash</button>
                        <span class="badge bg-secondary float-end ${
                            val.status == 'pending'? "bg-secondary":
                            val.status == 'in-progress'? "bg-warning": "bg-success"
                        }">${val.status}</span>
                    </div> 
                </div>
                `
    });

    localStorage.setItem('allTasks',JSON.stringify(data));
}
render(tasks);

var addModal = new bootstrap.Modal(document.getElementById('addModal'));
var editModal = new bootstrap.Modal(document.getElementById('editModal'));


//create
document.getElementById("addForm").addEventListener('submit',(e)=>{
    e.preventDefault();
    let todo = document.getElementById("addTask").value;
    tasks.push({todo:todo, status:'pending'})
    render(tasks);
    document.getElementById("addTask").value='';
    addModal.hide();
});

//edit
const edit = (id)=>{
    editModal.show(); 
    document.getElementById("editTask").value = tasks[id].todo;
    document.getElementById("editStatus").value = tasks[id].status
    document.getElementById("taskId").value = id
    // localStorage.setItem("t askId",id);
}

//save edit
document.getElementById("editForm").addEventListener('submit',(e)=>{
    e.preventDefault();
    let todo = document.getElementById("editTask").value;
    let status = document.getElementById("editStatus").value;
    let id = document.getElementById("taskId").value;
    // let id = localStorage.getItem("taskId")
    tasks[id].todo=todo;
    tasks[id].status=status;
    render(tasks);
    // document.getElementById('success').innerHTML='Changes Saved!'
    editModal.hide();
});

//trash
const trash =(id) =>{
    if(confirm("Are you sure you want to delete?")){
    tasks.splice(id,1)
    render(tasks);
}
}
