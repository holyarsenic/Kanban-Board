
const todo = document.querySelector(".todo");
const progress = document.querySelector(".progress");
const done = document.querySelector(".done");
const cols = [todo, progress, done];

const tasks = document.querySelectorAll(".tasks");
let dragElement = null;

function updateCount() {
  cols.forEach(col => {
    const tasks = col.querySelectorAll(".tasks");
    const count = col.querySelector(".right");

    count.innerText = tasks.length;
  });
}

tasks.forEach(task => {
  const btn = task.querySelector("button");

  if (btn) {
    btn.addEventListener("click", () => {
      task.remove();
      updateCount();
      saveTasks();
    });
  }
});

function saveTasks() {
  const data = {
    todo: todo.innerHTML,
    progress: progress.innerHTML,
    done: done.innerHTML
  };

  localStorage.setItem("kanban-data", JSON.stringify(data));
}

tasks.forEach(task => {
  task.addEventListener("drag", (e) => {
    dragElement = task;
  })
})

function animation(container) {
  container.addEventListener("dragenter", (e) => {
    e.preventDefault();
    container.classList.add("hover-out")
  })
  container.addEventListener("dragleave", (e) => {
    e.preventDefault();
    container.classList.remove("hover-out")
  })

  container.addEventListener("dragover", (e) => {
    e.preventDefault();
  })

  container.addEventListener("drop", (e) => {
    e.preventDefault();
    container.appendChild(dragElement);
    container.classList.remove("hover-out");

    updateCount();
    saveTasks();
  });
}

animation(todo);
animation(progress);
animation(done);

const toggleModalButton = document.querySelector('.toggle-modal');
const modal = document.querySelector('.modal');
const bg = document.querySelector('.bg');
const Taskbtn = document.querySelector('.add-new-task');

toggleModalButton.addEventListener("click", () => {
  modal.classList.toggle("active");
})

bg.addEventListener("click", () => {
  modal.classList.remove("active");
})

Taskbtn.addEventListener("click", () => {
  const taskTitle = document.querySelector(".input-box").value
  const taskBox = document.querySelector(".task-box").value

  const div = document.createElement("div")

  div.classList.add("tasks")
  div.setAttribute("draggable", "true")

  div.innerHTML = `
      <h2>${taskTitle}</h2>
      <p>${taskBox}</p>
      <button>Delete</button>`;

  if (taskTitle === "" || taskBox === "") return;

  todo.appendChild(div);

  div.addEventListener("drag", (e) => {
    dragElement = div;
  });

  div.querySelector("button").addEventListener("click", () => {
    div.remove();
    updateCount();
    saveTasks();
  })

  updateCount();
  saveTasks();
  modal.classList.remove("active");

  document.querySelector(".input-box").value = "";
  document.querySelector(".task-box").value = "";


});

window.addEventListener("load", () => {
  const data = JSON.parse(localStorage.getItem("kanban-data"));

  if (data) {
    todo.innerHTML = data.todo;
    progress.innerHTML = data.progress;
    done.innerHTML = data.done;
  }

  document.querySelectorAll(".tasks").forEach(task => {

    task.addEventListener("dragstart", () => {
      dragElement = task;
    });

    const btn = task.querySelector("button");
    if (btn) {
      btn.addEventListener("click", () => {
        task.remove();
        updateCount();
        saveTasks();
      });
    }
  });

  updateCount();
});


