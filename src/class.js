export default class Task {
  constructor() {
    const storedData = JSON.parse(localStorage.getItem('storage-task'));
    this.todo = Array.isArray(storedData) ? storedData : [];
  }

  // add function
  addTask(description) {
    const completed = false;
    const index = this.todo.length + 1;
    const updatedToDo = [...this.todo, { completed, description, index }];
    this.updateStorage(updatedToDo);
  }

  // remove function
  removeTask(index) {
    const updatedToDo = this.todo.filter((todo) => todo.index !== index + 1);
    for (let i = 0; i < updatedToDo.length; i += 1) {
      updatedToDo[i].index = i + 1;
    }
    this.updateStorage(updatedToDo);
  }

  // Get function
  getFromStorage() {
    return this.todo;
  }

  // update storage
  updateStorage(data) {
    localStorage.setItem('storage-task', JSON.stringify(data));
    this.todo = data;
  }
}
