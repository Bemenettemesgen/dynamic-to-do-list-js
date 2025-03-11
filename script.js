document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask(taskText, save = true) {
        taskText = taskText.trim(); // Trim the task input value
        if (taskText === "") { // Check if the taskText is not empty
            alert("Please enter a task.");
            return;
        }

        // Create a new li element and set its textContent to taskText
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Assign an onclick event to the remove button to remove the li element from taskList
        removeButton.onclick = () => {
            taskList.removeChild(li);
            if (save) {
                saveTasks();
            }
        };

        // Append the remove button to the li element and the li element to taskList
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Clear the task input field
        taskInput.value = "";

        // Save tasks to localStorage if save is true
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
