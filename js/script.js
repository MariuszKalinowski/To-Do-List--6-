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
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
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
            
            <button class="js-remove form__removeTaskButton"> 🗑 </button>
            </li>
            `;
        }
        document.querySelector(".js-formTasksList").innerHTML = htmlString;
        const newTaskElement = document.querySelector(".js-newTask");
        newTaskElement.focus();
    };

    const renderButtons = () => {
        let toggleHideTasksButton = "";
<<<<<<< HEAD

        if (tasks.length > 0) {

=======
        if (tasks.length > 0) {
            const isAllTasksDone = tasks.every((task) => task.done);
>>>>>>> 285e44bf41ed2da7db8996b0e89d21632c3e38c8
            toggleHideTasksButton += `
            <button class="js-toggleHideTasksButton form__renderButton"> ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone </button>        
            <button class="js-allTasksDoneButton form__renderButton" ${tasks.every(({ done }) => done) ? 'disabled' : ""} > Ukończ wszystkie </button>
            `;
        };
<<<<<<< HEAD

        document.querySelector(".js-renderButtons").innerHTML = toggleHideTasksButton;

=======
        document.querySelector(".js-renderButtons").innerHTML = toggleHideTasksButton;
>>>>>>> 285e44bf41ed2da7db8996b0e89d21632c3e38c8
    };

    const bindButtonsEvent = () => {
        bindToggleAllDoneTasks();
        bindOnHideDoneTasksButtonClick();
<<<<<<< HEAD
=======

>>>>>>> 285e44bf41ed2da7db8996b0e89d21632c3e38c8
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
