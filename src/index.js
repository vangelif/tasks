import './style.css';
import Task from './class.js';

const itemsDisplay = document.getElementById('container');
const itemValue = document.getElementById('task');
const addItemBtn = document.getElementById('add');
// const eraseAllBtn = document.querySelector('.eraser');

const tasks = new Task();

const display = () => {
  itemsDisplay.innerHTML = '';

  for (let i = 0; i < tasks.todo.length; i += 1) {
    const task = document.createElement('div');

    task.className = 'todo-el';
    const isTicked = tasks.todo[i].completed ? 'checked' : '';
    task.innerHTML = `
      <input type="checkbox" ${isTicked} onfocus="store(${i})" onchange="toggleCompleted(${i})">
      <p id="edit" contenteditable="true">${tasks.todo[i].description}</p>
      <div>
        <button class="dots"><i class="fa-solid fa-ellipsis-vertical"></i></button>
        <span class="trash" onclick="remove(${i})"><i class="fa-solid fa-trash-can"></i></span>
      </div>
      `;
    itemsDisplay.appendChild(task);

    // Edit task description
    const edit = task.querySelector('#edit');

    edit.addEventListener('blur', () => {
      tasks.todo[i].description = edit.textContent;
      tasks.updateStorage(tasks.todo);
    });

    edit.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        edit.blur();
      }
    });

    // Visibility for options: dots/trash when editing the task
    const dots = task.querySelector('.dots');
    const bin = task.querySelector('.trash');

    edit.addEventListener('click', () => {
      dots.style.display = 'none';
      bin.style.display = 'inline-block';
    });
  }
  tasks.updateStorage(tasks.todo);
};
// end of display function
// toggle completed: false/true
document.toggleCompleted = (index) => {
  tasks.todo[index].completed = !tasks.todo[index].completed;
  display();
};

// Add task given by user when clicked on 'Enter' icon
addItemBtn.addEventListener('click', (e) => {
  e.preventDefault();
  tasks.addTask(itemValue.value);
  display();
  itemValue.value = '';
});

// Removing a task
document.remove = (index) => {
  tasks.removeTask(index);
  tasks.updateStorage(tasks.todo);
  display();
};

// document.store = (i) => {
//   const storeIndex = i;
//   eraseAllBtn.addEventListener('click', () => {
//     console.log('hello');
//     // tasks.length = 0;
//     for (let i = 0; i < tasks.todo.length; i += 1) {
//       if (tasks.todo[i].completed === true) {
//         console.log(tasks.todo[i].index);
//         // const { index } = tasks.todo[i];
//         tasks.removeTask(storeIndex);
//         tasks.updateStorage(tasks.todo);
//         display();
//       }
//     }
//     // console.log(tasks.todo[1].completed);
//     tasks.updateStorage(tasks.todo);
//     display();
//   });
// };

display();
