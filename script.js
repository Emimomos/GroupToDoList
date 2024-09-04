const groups = {};  // Objeto para almacenar los grupos y sus tareas

document.getElementById('create-group').addEventListener('click', function() {
    const groupName = document.getElementById('group-name').value;
    if (groupName === '') {
        alert('Please enter a group name');
        return;
    }

    // Verificar si el grupo ya existe
    if (groups[groupName]) {
        alert('Group already exists');
        return;
    }

    // Crear el grupo y añadirlo al selector de grupos
    groups[groupName] = [];
    const groupSelect = document.getElementById('groups');
    const newOption = document.createElement('option');
    newOption.textContent = groupName;
    newOption.value = groupName;
    groupSelect.appendChild(newOption);

    document.getElementById('group-name').value = '';  // Limpiar el campo de texto
});

document.getElementById('groups').addEventListener('change', function() {
    const selectedGroup = this.value;
    const taskSection = document.getElementById('task-section');
    const taskList = document.getElementById('task-list');

    // Mostrar la sección de tareas cuando se seleccione un grupo
    if (selectedGroup) {
        taskSection.style.display = 'block';
        taskList.innerHTML = '';  // Limpiar la lista de tareas

        // Mostrar las tareas del grupo seleccionado
        groups[selectedGroup].forEach(task => {
            const newTask = document.createElement('li');
            newTask.textContent = task.text;

            if (task.completed) {
                newTask.classList.add('completed');
            }

            newTask.addEventListener('click', function() {
                newTask.classList.toggle('completed');
                task.completed = !task.completed;
            });

            taskList.appendChild(newTask);
        });
    } else {
        taskSection.style.display = 'none';
    }
});

document.getElementById('add-task').addEventListener('click', function() {
    const selectedGroup = document.getElementById('groups').value;
    const taskText = document.getElementById('new-task').value;

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    // Añadir la nueva tarea al grupo seleccionado
    const newTask = { text: taskText, completed: false };
    groups[selectedGroup].push(newTask);

    // Mostrar la nueva tarea en la lista
    const taskList = document.getElementById('task-list');
    const newTaskElement = document.createElement('li');
    newTaskElement.textContent = taskText;

    newTaskElement.addEventListener('click', function() {
        newTaskElement.classList.toggle('completed');
        newTask.completed = !newTask.completed;
    });

    taskList.appendChild(newTaskElement);
    document.getElementById('new-task').value = '';  // Limpiar el campo de texto
});