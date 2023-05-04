import './style.css';
import Task from './class.js';

const itemsDisplay = document.getElementById('container');
const itemValue = document.getElementById('task');
const addItemBtn = document.getElementById('add');
const eraseAll = document.querySelector('.eraser');

const tasks = new Task();

const display = () => {
  itemsDisplay.innerHTML = '';

  for (let i = 0; i < tasks.todo.length; i += 1) {
    const task = document.createElement('div');

    task.className = 'todo-el';
    const isTicked = tasks.todo[i].completed ? 'checked' : '';
    task.innerHTML = `
      <input type="checkbox" ${isTicked} onchange="toggleCheckbox(${i})">
      <p id="edit" contenteditable="true">${tasks.todo[i].description}</p>
      <div>
      <span class="trash" onclick="remove(${i})"><i class="fa-solid fa-trash-can">  </i></span>
        <button class="dots"><i class="fa-solid fa-ellipsis-vertical"></i></button>
      </div>
      `;
    itemsDisplay.appendChild(task);

    const edit = task.querySelector('#edit');

    edit.addEventListener('blur', () => {
      tasks.todo[i].description = edit.textContent;
      tasks.updateStorage(tasks.todo);
    });

    edit.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        edit.blur();
      }
    });
  }

  tasks.updateStorage(tasks.todo);
};

document.toggleCheckbox = (index) => {
  tasks.todo[index].completed = !tasks.todo[index].completed;
  display();
};

const addUserTask = () => {
  tasks.addTask(itemValue.value);
  display();
  itemValue.value = '';
};

addItemBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addUserTask();
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addUserTask();
  }
});

document.remove = (index) => {
  tasks.removeTask(index);
  tasks.updateStorage(tasks.todo);
  display();
};

const eraseTicked = (tasks) => {
  tasks.todo = tasks.todo.filter((task) => !task.completed);
  for (let i = 0; i < tasks.todo.length; i += 1) {
    tasks.todo[i].index = i + 1;
  }
};

eraseAll.addEventListener('click', () => {
  eraseTicked(tasks);
  tasks.updateStorage(tasks.todo);
  display();
});

display();
