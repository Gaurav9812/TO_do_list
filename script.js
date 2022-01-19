//fetching required elements
let list =document.getElementById("List");

//checking if local storage has tasks
var tasks = JSON.parse(localStorage.getItem("tasks"));
if(tasks){
for(let i=0;i< tasks.length;i++)
{
    addTasks(tasks[i]);
}}

//adding event listener on form to reloading the page
document.getElementById('Myform').addEventListener('submit',submitForm);
function submitForm(e){
    
    e.preventDefault();
    
    let val=document.getElementById('task').value;
    tasks = JSON.parse(localStorage.getItem("tasks"));
    //if value is empty not adding it if OR value already exist 
    if(( !tasks|| ifExist(val,tasks)==-1 ) && val!="")
        addTasks(val);
    else 
        return  alert('Already added');


    //adding val to Local storage
    if(tasks)
    {
        tasks.push(val);
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }else{
        //if tasks doesn't exist in local storage adding it in local sorage
        var names = [];
        names.push(val);
        localStorage.setItem("tasks", JSON.stringify(names));
    }
    
}
//function to delete selected
function deleteSelected(tar,val)
{
    tasks=JSON.parse(localStorage.getItem("tasks"));
    let index=ifExist(val,tasks);
    tasks.splice(index,1)
    
    localStorage.setItem("tasks", JSON.stringify(tasks));
    tar.remove();

}
// function to check if Element already exist 
function ifExist(val,tasks)
{
    for(let i=0;i<tasks.length;i++)
    {
        if(tasks[i]==val)
        {
            return i;
        }
    }
    return -1;
}
// function to save edited
function saveEdited(val,input)
{
    tasks=JSON.parse(localStorage.getItem("tasks"));
    let index=ifExist(val,tasks);
    if(input.value=="")
    {
        input.value=val;
        return alert('field cannot be empty');
    }
    tasks[index]=input.value;
    input.disabled=true;
    
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// function to add task
function addTasks(val)
{
    let div=document.createElement('div');
    div.classList.add('tasks')
    let input=document.createElement('input');

    input.value=val;
    input.disabled=true;
    div.appendChild(input);
    let div1=document.createElement('div');
    let icon1=document.createElement('button');
    //check
    icon1.innerHTML='<i class="fas fa-check-square"></i>'
    div1.appendChild(icon1);
    icon1.classList.add('save-icon');
    // adding event listner on save icon 
    icon1.addEventListener('click',function(){
            saveEdited(val,input);
            input.classList.remove('addBorder');
            val=input.value;
            
    },false);

    let icon2=document.createElement('button');
    //edit
    icon2.classList.add('edit-icon');
    icon2.innerHTML='<i class="fas fa-edit"></i>'
    div1.appendChild(icon2);
    // adding event listener on edit icon
    icon2.addEventListener('click',function(){
        input.classList.add('addBorder');
        input.disabled=false;
    },false);
    
    let icon3=document.createElement('button');
    //delete
    icon3.classList.add('trash-icon');
    icon3.innerHTML='<i class="fas fa-trash"></i>';
    // adding event listener on delete 
    icon3.addEventListener('click',function(){
            deleteSelected(div,val)
    },false);
    div1.classList.add('buttons');
    div1.appendChild(icon3);
    
    div.appendChild(div1);
    list.appendChild(div);
}

// event listener on clear items
document.getElementById('clearItem').addEventListener('click',function(){
    let elem=document.getElementsByClassName('tasks');
    for(let i=0;i<elem.length;i++)
    {
        elem[i--].remove();
    }
    localStorage.removeItem('tasks');
})