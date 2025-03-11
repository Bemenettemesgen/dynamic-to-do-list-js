document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const clearButton = document.getElementById('clear-btn');   
    const taskCount = document.getElementById('task-count');
    const completedCount = document.getElementById('completed-count');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const allTasks = [];
    let currentFilter = 'all';
    function addTask(taskText, save = true) {
        // Retrieve and trim the value from the task input field
        taskText = taskText.trim();

        // Check if taskText is not empty
        if (taskText === "") {
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

        // Assign an onclick event to the remove button that, when triggered, removes the li element from taskList
        removeButton.onclick = () => {
            taskList.removeChild(li);
            if (save) {
                saveTasks();
            }
        };

        // Append the remove button to the li element, then append the li to taskList
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Clear the task input field by setting taskInput.value to an empty string
        taskInput.value = "";

        // Save tasks to localStorage if save is true
        if (save) {
            saveTasks();
        }
    }

    // Attach event listeners
    addButton.addEventListener('click', () => {
        addTask(taskInput.value);
    });

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(li => tasks.push(li.textContent.replace('Remove', '').trim()));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks on page load
    loadTasks();
});
