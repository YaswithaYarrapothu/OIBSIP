document.getElementById('add-btn').addEventListener('click', function() {
    const taskText = document.getElementById('todo-input').value;
    if (taskText === '') {
        alert('Please enter a task');
        return;
    }
    
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `
        <span>${taskText}</span>
        <button onclick="removeTask(this)">Done</button>
    `;
    
    document.getElementById('todo-list').appendChild(li);
    document.getElementById('todo-input').value = '';
});

function removeTask(button) {
    const li = button.parentElement;
    li.remove();
}
