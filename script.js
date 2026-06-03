// Create task "list"
let tasks = [];

// Display the tasks
function displayTasks(){
    let listItems = "";
    for (let i = 0; i < tasks.length; i++) {
        let checked = tasks[i].completed ? "checked" : "";
        let completedClass = tasks[i].completed
        ? "completed": "";
        listItems += `
        <li class="${completedClass}">
        <input type="checkbox" ${checked} onclick="toggleTask(${i})">
        ${tasks[i].text}
        <button onclick="removeTask(${i})">x</button>
        </li>`;
    }
    document.getElementById("list").innerHTML = listItems;
}

// Add a task
function addTask(){
    let taskInput = document.getElementById("task");
    let text = taskInput.value.trim();
    if (text === ""){
        return;
    }
    tasks.push({text: text, completed: false});
    taskInput.value = "";
    saveTasks();
    displayTasks();
}

// Mark a task as done
function toggleTask(i){
    tasks[i].completed = !tasks[i].completed;
    saveTasks();
    displayTasks();
}

// Remove a task
function removeTask(i){
    tasks.splice(i, 1);
    saveTasks();
    displayTasks();
}

// Save a task
function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load the tasks
function loadTasks(){
    let saved = localStorage.getItem("tasks");
    if (saved !== null) {
        tasks = JSON.parse(saved);
    }
}

loadTasks();
displayTasks();

document.getElementById("task")
.addEventListener("keydown",(event)=>{
    if(event.key === "Enter"){
        addTask();
    }
});
