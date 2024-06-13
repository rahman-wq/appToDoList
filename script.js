document.addEventListener("DOMContentLoaded", function () {
  const profileName = document.getElementById("profile-name");
  const profileRole = document.getElementById("profile-role");
  const currentDateElement = document.getElementById("current-date");
  const taskInput = document.getElementById("task-input");
  const priorityLevel = document.getElementById("priority-level");
  const deadlineDateInput = document.getElementById("deadline-date");
  const deadlineTimeInput = document.getElementById("deadline-time");
  const submitTask = document.getElementById("submit-task");
  const todoList = document.getElementById("todo-list");
  const doneList = document.getElementById("done-list");
  const deleteAll = document.getElementById("delete-all");
  const burgerBtn = document.getElementById("burger-btn");
  const closeSidebar = document.getElementById("close-sidebar");
  const sidebar = document.getElementById("sidebar");

  const staffData = {
    staff1: {
      name: "Atun",
      role: "Staff",
      todos: [],
      done: [],
    },
    staff2: {
      name: "Awliyan",
      role: "Staff",
      todos: [],
      done: [],
    },
    staff3: {
      name: "Haura",
      role: "Staff",
      todos: [],
      done: [],
    },
    manager: {
      name: "Rahman",
      role: "Manager",
      todos: [],
      done: [],
    },
  };

  let currentUser = "manager";

  function formatDate(d) {
    const year = d.getFullYear();
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const day = `0${d.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  }

  function formatDateTime(date, time) {
    return `${date}T${time}:00`;
  }

  function renderToDoLists() {
    todoList.innerHTML = "";
    doneList.innerHTML = "";

    const currentDate = new Date();

    staffData[currentUser].todos.forEach((task, index) => {
      const li = document.createElement("li");
      const taskDateTime = new Date(task.deadline);
      const isOverdue = taskDateTime < currentDate;
      li.classList.add(`priority-${task.priority}`);
      li.innerHTML = `<input type="checkbox" onclick="markAsDone(${index})" /> ${
        task.text
      } [${task.priority}] - ${task.deadline.replace("T", " ")} ${
        isOverdue ? '<span style="color:red;">(Overdue)</span>' : ""
      }`;
      todoList.appendChild(li);
    });

    staffData[currentUser].done.forEach((task) => {
      const li = document.createElement("li");
      li.classList.add(`priority-${task.priority}`);
      li.innerHTML = `<input type="checkbox" checked disabled /> <s>${
        task.text
      } [${task.priority}] - ${task.deadline.replace("T", " ")}</s>`;
      doneList.appendChild(li);
    });
  }

  submitTask.addEventListener("click", function () {
    const newTask = {
      text: taskInput.value,
      priority: priorityLevel.value,
      deadline: formatDateTime(
        deadlineDateInput.value,
        deadlineTimeInput.value
      ),
    };
    staffData[currentUser].todos.push(newTask);
    taskInput.value = "";
    deadlineDateInput.value = "";
    deadlineTimeInput.value = "";
    renderToDoLists();
  });

  deleteAll.addEventListener("click", function () {
    staffData[currentUser].done = [];
    renderToDoLists();
  });

  window.showToDoList = function (user) {
    currentUser = user;
    profileName.textContent = `Nama: ${staffData[user].name}`;
    profileRole.textContent = `Jabatan: ${staffData[user].role}`;
    renderToDoLists();
  };

  window.markAsDone = function (index) {
    const task = staffData[currentUser].todos.splice(index, 1)[0];
    staffData[currentUser].done.push(task);
    renderToDoLists();
  };

  // Set current date
  currentDateElement.textContent = `Tanggal: ${formatDate(new Date())}`;

  renderToDoLists();

  // Burger button toggle
  burgerBtn.addEventListener("click", function () {
    sidebar.classList.toggle("show");
  });

  closeSidebar.addEventListener("click", function () {
    sidebar.classList.remove("show");
  });
});
