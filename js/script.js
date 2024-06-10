{
    let tasks = [];
    let hideDoneTasks = false;

    const onHideDoneTasksButtonClick = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    }

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        [
            ...tasks.splice(taskIndex, 1),
        ];
        render();
    };


    const toggleDoneTask = (taskIndex) => {

        tasks = tasks.map((task, index) =>
            index === taskIndex
                ? { ...task, done: !task.done }
                : task
        );
        render();
    };

    const toggleAllDoneTasks = () => {

        tasks = tasks.map(task => {
            return { ...task, done: true }
        });
        render();

    };

    const bindToggleAllDoneTasks = () => {
        const toggleAllDoneButton = document.querySelectorAll(".js-allTasksDoneButton")

        toggleAllDoneButton.forEach((allDoneButton) => {
            allDoneButton.addEventListener("click", () => {
                toggleAllDoneTasks();
            });
        });

    };

    const bindRemoveEvents = () => {

        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);

            });
        });
    };

    const bindOnHideDoneTasksButtonClick = () => {
        const toggleHideTasksButton = document.querySelectorAll(".js-toggleHideTasksButton");

        toggleHideTasksButton.forEach((hideTasks, index) => {
            hideTasks.addEventListener("click", () => {
            onHideDoneTasksButtonClick(index);
            });
        });
    };

    const bindToggleDoneEvents = () => {

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                toggleDoneTask(index);
            });
        });
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li 
            ${hideDoneTasks && task.done ? 'class="form__task-hidden"' : ""}
            ${task.done ? "class=\"form__task--done\"" : "class=\"form__task\""}
            >
            <button class="js-done form__doneTaskButton">
            ${task.done ? "✔" : ""} 
            </button>
            
            <span class="form__taskContent">
            ${task.content}
            </span>
            
            <button class="js-remove form__removeTaskButton"> 
            🗑 
            </button>
            </li>
            `;
        }
        document.querySelector(".js-formTasksList").innerHTML = htmlString;
        const newTaskElement = document.querySelector(".js-newTask");
        newTaskElement.focus();
    };

    const renderButtons = () => {
        let toggleHideTasksButton = "";
        if (tasks.length >0) {
            const isAllTasksDone = tasks.every((task) => task.done);
            toggleHideTasksButton += `
            <button class="js-toggleHideTasksButton form__renderButton"> ${hideDoneTasks === true ? "Pokaż" : "Ukryj"} ukończone </button>        
            <button class="js-allTasksDoneButton form__renderButton" ${isAllTasksDone ? 'disabled' : ""} > Ukończ wszystkie </button>
            `;
        };
            document.querySelector(".js-renderButtons").innerHTML = toggleHideTasksButton;
    };

    const bindButtonsEvent = () => {
        bindToggleAllDoneTasks();
        bindOnHideDoneTasksButtonClick();
        // if - jeżeli są zadania to wyrenderuj mi dwa przyciski "Ukryj ukończone" i "Ukoncz wszystkie", jeżeli jakieś zadania są ukryte to wyrenderuj mi
        // "Ukryj ukończone" i "Ukończ wszystkie", jeśli wszystkie zadania są ukończone, to zablokuj przycisk "Ukończ wszystkie"
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvent();
    };


    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskElement = document.querySelector(".js-newTask")
        const newTaskContent = newTaskElement.value.trim();
        newTaskElement.focus();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        };
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);

    };

    init();

};
