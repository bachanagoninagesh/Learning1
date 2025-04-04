// Basic client-side validation (optional)
document.querySelector("form").addEventListener("submit", (e) => {
    const taskInput = document.querySelector("input[name='task']");
    if (taskInput.value.trim() === "") {
        e.preventDefault();
        alert("Please enter a task!");
    }
});