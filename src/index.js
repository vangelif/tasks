import './style.css';
import Task from './class.js';

const itemsDisplay = document.getElementById('container');
const itemValue = document.getElementById('task');
const addItemBtn = document.getElementById('add');

const tasks = new Task();

const display = () => {
  itemsDisplay.innerHTML = '';

  for (let i = 0; i < tasks.todo.length; i += 1) {
    const task = document.createElement('div');

    task.className = 'todo-el';
    const isTicked = tasks.todo[i].completed ? 'checked' : '';
    task.innerHTML = `
      <input type="checkbox" ${isTicked} onfocus="store(${i})" onchange="toggleCheckbox(${i})">
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

    edit.addEventListener('keydown', (event) => {
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

addItemBtn.addEventListener('click', (e) => {
  e.preventDefault();
  tasks.addTask(itemValue.value);
  display();
  itemValue.value = '';
});

document.remove = (index) => {
  tasks.removeTask(index);
  tasks.updateStorage(tasks.todo);
  display();
};
display();
