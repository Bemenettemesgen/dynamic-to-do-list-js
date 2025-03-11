document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    classList.add
    function addTask(taskText = taskInput.value.trim(), save = true) {
        // Check if taskText is not empty
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create a new li element and set its textContent to taskText
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a new button element for removing the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Assign an onclick event to the remove button to remove the li from taskList
        removeBtn.onclick = function() {
            taskList.removeChild(li);
            if (save) {
                const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                const index = tasks.indexOf(taskText);
                if (index > -1) {
                    tasks.splice(index, 1);
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                }
            }
        };

        // Append the remove button to the li element, then append the li to taskList
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear the task input field
        taskInput.value = '';

        // Save the task to localStorage (if save is true)
        if (save) {
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            tasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(task => addTask(task, false));
    }

    loadTasks();

    // Add an event listener to addButton that calls addTask when clicked
    addButton.addEventListener('click', () => {
        addTask();
    });

    // Add an event listener to taskInput for the 'keypress' event,
    // checking if event.key equals 'Enter' before calling addTask
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask(classList.add);classList.add
            classList.add
        }
    });
});

