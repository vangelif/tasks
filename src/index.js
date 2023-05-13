import './style.css';
import Task from './class.js';

const itemsDisplay = document.getElementById('container');
const itemValue = document.getElementById('task');
const addItemBtn = document.getElementById('add');
const eraseAll = document.querySelector('.eraser');

const tasks = new Task();

const createTaskElement = (task, index) => {
  const taskElement = document.createElement('div');
  taskElement.className = 'todo-el';

  const isTicked = task.completed ? 'checked' : '';
  taskElement.innerHTML = `
    <input type="checkbox" ${isTicked} onchange="toggleCheckbox(${index})">
    <p id="edit" contenteditable="true">${task.description}</p>
    <div>
      <span class="trash" onclick="remove(${index})"><i class="fa-solid fa-trash-can">  </i></span>
      <button class="dots"><i class="fa-solid fa-ellipsis-vertical"></i></button>
    </div>
  `;
  // display();
  return taskElement;
};

const attachBlurListener = (taskElement, task) => {
  const edit = taskElement.querySelector('#edit');

  edit.addEventListener('blur', () => {
    task.description = edit.textContent;
    tasks.updateStorage(tasks.todo);
  });

  edit.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      edit.blur();
    }
  });
};

const display = () => {
  itemsDisplay.innerHTML = '';

  for (let i = 0; i < tasks.todo.length; i += 1) {
    const task = tasks.todo[i];
    const taskElement = createTaskElement(task, i);
    itemsDisplay.appendChild(taskElement);
    attachBlurListener(taskElement, task, i);
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
