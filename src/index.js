// imports 
import "jquery";
import "../styles/styles.css";

// elements 
const addbtn = $("#submit-btn");
const input = $("#search-input");
const task = $(".tasks"); // every box of task
const didTask = $(".did-tasks");
const closeIcon = $(".close-icon svg")
// localstorage
if (localStorage.getItem('tasks') === null){
    localStorage.setItem("tasks", JSON.stringify([]))
}

if (localStorage.getItem("didTasks") === null){
    localStorage.setItem("didTasks", JSON.stringify([]))
}
// list vals of keys in localstorage 
var tasks = JSON.parse(localStorage.getItem('tasks'))
var didTasks = JSON.parse(localStorage.getItem("didTasks"))

// add function
addbtn.click( () => {
    if (input.val() != ''){
    
            // add the val to the array
            tasks.push(input.val()); 

            if (addbtn.text() === 'edit'){
                addbtn.html('add');
                $(".notif-text").text("task edited successfully");
        
            }else{
                $(".notif-text").text("task added successfully");

            }
            
            // join the vals into a delimeted string and store it
            localStorage.setItem('tasks', JSON.stringify(tasks)); 
            $("#notification").removeClass('hide');
            $("#notification").addClass('show');
            setTimeout(() => {
                $("#notification").removeClass('show');
                $("#notification").addClass('hide');
            },5000)
    }else{
        alert("please enter a word")
    }
    if (addbtn.text() === 'edit'){
        addbtn.html('add');
        $("#notification").html("task added successfully");

    }
    input.val('');
    task.html(''); 
    showTasks()

})

// add task by clicking on enter 
input.keypress(e => {
    if (e.key == 'Enter'){
        addbtn.click();
    }
})
   
// delete function 
task.click((e) => {
    if (e.target.classList.contains('delbtn')){
        let taskText = e.target.parentElement.parentElement.querySelector(".text p");
        let deletedValIndex = tasks.indexOf(taskText.textContent);
        tasks.splice(deletedValIndex  ,1);

        localStorage.setItem('tasks', JSON.stringify(tasks));
        task.html(''); 
        showTasks();
    }

})

// edit funtion
task.click((e) => {
    if (e.target.classList.contains('editbtn')){
        let chosen_task = e.target.parentElement.parentElement;
        input.val(chosen_task.getElementsByTagName('p')[0].innerHTML);
        
        addbtn.html('edit');

        let deletedValIndex = tasks.indexOf(input.val);
        tasks.splice(deletedValIndex ,1);
        localStorage.setItem('tasks', JSON.stringify(tasks));  
        task.html(''); 
        showTasks();     
    }
})


// check a tasks ( do a tasks and transport it to did tasks div and LS)
task.click((e) => {
    if (e.target.classList.contains('checkboxbtn')){
        let text = e.target.parentElement.parentElement.querySelector(".text .task-text");

        let deletedValIndex = tasks.indexOf(text.textContent);
        tasks.splice(deletedValIndex ,1);
        localStorage.setItem('tasks', JSON.stringify(tasks))

        didTasks.push(text.textContent);
        localStorage.setItem('didTasks', JSON.stringify(didTasks));
        task.html('');
        didTask.html('');
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
        $(".icon-img").attr('src', 'http://openweathermap.org/img/wn/' + icon + '.png');
        $(".city").html(name);
        $(".temp").html(temp + "°C");
    
    }
}

weather.fetchweather();

// delete did task 
didTask.click(e => {
    if (e.target.classList.contains("delbtn")){
        let text = e.target.parentElement.parentElement.querySelector(".text .task-text");

        let deletedValIndex = didTasks.indexOf(text.textContent);
        didTasks.splice(deletedValIndex ,1);
        localStorage.setItem('didTasks', JSON.stringify(didTasks));
        e.target.parentElement.parentElement.parentElement.innerHTML = '';
        didTask.html = '';
        showDidTasks();
    }
})

// uncheck did task 
didTask.click(e => {
    if (e.target.classList.contains("checkboxbtn")){
        let text = e.target.parentElement.parentElement.querySelector(".text .task-text");

        var deletedValIndex = didTasks.indexOf(text.textContent);
        didTasks.splice(deletedValIndex ,1);
        localStorage.setItem('didTasks', JSON.stringify(didTasks));
        
        tasks.push(text.textContent);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        task.html('');
        didTask.html('');
        showDidTasks();
        showTasks();
    }
})


function showTasks(){
    jQuery.each(tasks, function(index, element){
        var adding_task = document.createElement("div");
        adding_task.classList.add("task");
        adding_task.innerHTML += `
        <div class="text">
            <input class="checkboxbtn" id="checkboxBtn" type="checkbox">
            <p class="task-text" id="task-text">${element}</p>
        </div>
        <div class="btns-container ">
            <button class="editbtn" id="editBtn">edit</button>
            <button class="delbtn" id="delBtn">delete</button>
        </div>
        `
        $("#tasks").append(adding_task);
    });
}

function showDidTasks(){
    jQuery.each(didTasks, function(index, element){
        let adding_compeleted_task = document.createElement("div");
        adding_compeleted_task.classList.add("task");
    
        adding_compeleted_task.innerHTML += `
        <div class="text">
            <input class="checkboxbtn" id="checkboxBtn" type="checkbox" checked>
            <p class="task-text compeleted" id="task-text">${element}</p>
        </div>
        <div class="btns-container ">
            <button class="delbtn text-sm" id="delBtn">delete</button>
        </div>
        `
        $("#did-tasks").append(adding_compeleted_task);
    });
}

closeIcon.click(() => {
    $("#notification").removeClass('show');
    $("#notification").addClass('hide');
})


showDidTasks()
showTasks()