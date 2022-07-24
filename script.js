// elements 
const addbtn = document.getElementById("submit-btn");
const input = document.getElementById("search-input");
const task = document.querySelector(".tasks"); // every box of task
const didTask = document.querySelector(".did-tasks");
const closeIcon = document.querySelector(".close-icon svg")
// localstorage


// list values of keys in localstorage 
const tasks = JSON.parse(localStorage.getItem('tasks'))
const didTasks = JSON.parse(localStorage.getItem("didTasks"))

// add function 
addbtn.addEventListener("click", () => {
    if (input.value.trim() != ''){
    
            // add the value to the array
            tasks.push(input.value); 
            
            // join the values into a delimeted string and store it
            localStorage.setItem('tasks', JSON.stringify(tasks)); 
            document.getElementById("notification").classList.remove('hide');
            document.getElementById("notification").classList.add('show');
            setTimeout(() => {
                document.getElementById("notification").classList.remove('show');
                document.getElementById("notification").classList.add('hide');
            },5000)
    }else{
        alert("please enter a word")
    }
    if (addbtn.value === 'edit'){
        addbtn.value = 'add';
    }
    input.value = '';
    task.innerHTML = ''; 
    showTasks()

})

// add task by clicking on enter 
input.addEventListener("keypress", e => {
    if (e.key == 'Enter'){
        addbtn.click();
    }
})
   
// delete function 
task.addEventListener("click", (e) => {
    if (e.target.classList.contains('delbtn')){
        taskText = e.target.parentElement.parentElement.querySelector(".text p");
        let deletedValIndex = tasks.indexOf(taskText.textContent);
        tasks.splice(deletedValIndex  ,1);

        localStorage.setItem('tasks', JSON.stringify(tasks));
        task.innerHTML = ''; 
        showTasks();
    }

})

// edit funtion
task.addEventListener("click", (e) => {
    if (e.target.classList.contains('editbtn')){
        chosen_task = e.target.parentElement.parentElement;
        input.value = chosen_task.getElementsByTagName('p')[0].innerHTML;
        
        addbtn.value = 'edit';

        let deletedValIndex = tasks.indexOf(input.value);
        tasks.splice(deletedValIndex ,1);
        localStorage.setItem('tasks', JSON.stringify(tasks));  
        task.innerHTML = ''; 
        showTasks();     
    }
})


// check a tasks ( do a tasks and transport it to did tasks div and LS)
task.addEventListener("click", (e) => {
    if (e.target.classList.contains('checkboxbtn')){
        text = e.target.parentElement.parentElement.querySelector(".text .task-text");

        let deletedValIndex = tasks.indexOf(text.textContent);
        tasks.splice(deletedValIndex ,1);
        localStorage.setItem('tasks', JSON.stringify(tasks))

        didTasks.push(text.textContent);
        localStorage.setItem('didTasks', JSON.stringify(didTasks));
        task.innerHTML = '';
        didTask.innerHTML = '';
        showTasks();
        showDidTasks();
    }
})

//weather api 
let weather = {
    fetchweather: function(){fetch('https://api.openweathermap.org/data/2.5/weather?q=tehran&appid=9b5f36ed48bfe552e2610df7b09605eb&units=metric')
    .then(res => res.json())
    .then(data => this.displayweather(data))
    },
    displayweather: function(data){
        const {name} = data;
        const {icon} = data.weather[0];
        const {temp} = data.main;
        document.querySelector(".icon-img").setAttribute('src', 'http://openweathermap.org/img/wn/' + icon + '.png');
        document.querySelector(".city").innerHTML = name;
        document.querySelector(".temp").innerHTML = temp + "°C";
    
    }
}

weather.fetchweather();

// delete did task 
didTask.addEventListener("click", e => {
    if (e.target.classList.contains("delbtn")){
        text = e.target.parentElement.parentElement.querySelector(".text .task-text");

        let deletedValIndex = didTasks.indexOf(text.textContent);
        didTasks.splice(deletedValIndex ,1);
        localStorage.setItem('didTasks', JSON.stringify(didTasks));
        e.target.parentElement.parentElement.parentElement.innerHTML = '';
        didTask.innerHTML = '';
        showDidTasks();
    }
})

// uncheck did task 
didTask.addEventListener("click", e => {
    if (e.target.classList.contains("checkboxbtn")){
        text = e.target.parentElement.parentElement.querySelector(".text .task-text");

        let deletedValIndex = didTasks.indexOf(text.textContent);
        didTasks.splice(deletedValIndex ,1);
        localStorage.setItem('didTasks', JSON.stringify(didTasks));
        
        tasks.push(text.textContent);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        task.innerHTML = '';
        didTask.innerHTML = '';
        showDidTasks();
        showTasks();
    }
})


function showTasks(){
    tasks.forEach(element => {
        adding_task = document.createElement("div");
        adding_task.classList.add("task");
        adding_task.innerHTML += `
        <div class="text">
            <input class="checkboxbtn" id="checkboxBtn" type="checkbox">
            <p class="task-text" id="task-text">${element}</p>
        </div>
        <div class="btns-container">
            <button class="editbtn" id="editBtn">edit</button>
            <button class="delbtn" id="delBtn">delete</button>
        </div>
        `
        document.getElementById("tasks").appendChild(adding_task);
    });
}

function showDidTasks(){
    didTasks.forEach(element => {
        adding_compeleted_task = document.createElement("div");
        adding_compeleted_task.classList.add("task");
    
        adding_compeleted_task.innerHTML += `
        <div class="text">
            <input class="checkboxbtn" id="checkboxBtn" type="checkbox" checked>
            <p class="task-text compeleted" id="task-text">${element}</p>
        </div>
        <div class="btns-container">
            <button class="delbtn" id="delBtn">delete</button>
        </div>
        `
        document.getElementById("did-tasks").appendChild(adding_compeleted_task);
    });
}

closeIcon.addEventListener("click", () => {
    document.getElementById("notification").classList.remove('show');
    document.getElementById("notification").classList.add('hide');
})



showDidTasks()
showTasks()
