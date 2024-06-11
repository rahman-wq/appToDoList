document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const priorityLevel = document.getElementById("priority-level");
  const submitTask = document.getElementById("submit-task");
  const todoList = document.getElementById("todo-list");
  const doneList = document.getElementById("done-list");
  const deleteAll = document.getElementById("delete-all");
  const currentDate = document.getElementById("current-date");

  const updateDate = () => {
    const now = new Date();
    currentDate.textContent = `Tanggal: ${now.toLocaleDateString()}`;
  };

  const addTask = () => {
    const taskText = taskInput.value.trim();
    const priority = priorityLevel.value;

    if (taskText === "") return;

    const li = document.createElement("li");
    li.innerHTML = `
          <span>${taskText} - ${priority}</span>
          <input type="checkbox">
      `;
    li.querySelector("input").addEventListener("change", (e) => {
      if (e.target.checked) {
        li.classList.add("done");
        doneList.appendChild(li);
      } else {
        li.classList.remove("done");
        todoList.appendChild(li);
      }
    });
    todoList.appendChild(li);
    taskInput.value = "";
  };

  const deleteAllTasks = () => {
    todoList.innerHTML = "";
    doneList.innerHTML = "";
  };

  submitTask.addEventListener("click", addTask);
  deleteAll.addEventListener("click", deleteAllTasks);

  updateDate();
});
