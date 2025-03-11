document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask(taskText, save = true) {
        if (taskText.trim() === "") {
            alert("Please enter a task.");
            return;
        }

        const li = document.createElement('li');
        li.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';
        removeButton.onclick = () => {
            taskList.removeChild(li);
            if (save) {
                saveTasks();
            }
        };

        li.appendChild(removeButton);
        taskList.appendChild(li);

        taskInput.value = "";

        if (save) {
            saveTasks();
        }
    }

    // Event listener for the add button
    addButton.addEventListener('click', () => {
        addTask(taskInput.value);
    });

    // Event listener for the enter key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    // Function to load tasks from localStorage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Function to save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(li => tasks.push(li.textContent.replace('Remove', '').trim()));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks on page load
    loadTasks();
});
