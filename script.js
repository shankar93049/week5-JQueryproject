$(document).ready(function(){
  $('body').keypress(function(){
    $(this).css('background-color','skyblue');
  });
});

$(document).ready(function(){
  $('#loginPage').click(function(){
    $('#loginPage').css('background-color','pink');
  });
});

$(document).ready(function(){
  $('#taskPage').click(function(){
    $('#taskPage').css('background-color','pink');
  });
});


$(document).ready(function(){
  $('#body loginPage').click(function(){
    $('#body loginPage').css('background-color','pink');
  });
});


$(document).ready(function() {
  // Handle Login Form Submission
  $('#loginForm').submit(function(event) {
    event.preventDefault();

    var username = $('#username').val();
    var password = $('#password').val();

    // Hardcoded login credentials for simplicity
    if (username === 'kvon' && password === 'kvon123') {
      // Successful login
      $('#loginPage').fadeOut(500, function() {
        $('#taskPage').fadeIn(500);
      });
      fetchTasks(); // Fetch tasks after successful login
    } else {
      // Show error message
      $('#errorMessage').fadeIn();
    }
  });

  // Handle Logout
  $('#logoutBtn').click(function() {
    $('#taskPage').fadeOut(500, function() {
      $('#loginPage').fadeIn(500);
    });
  });

  // Fetch Tasks Using jQuery AJAX (mock API)
  function fetchTasks() {
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos?_limit=5', // Mock API for tasks
      method: 'GET',
      success: function(data) {
        $('#taskList').empty(); // Clear existing tasks

        // Loop through fetched tasks and display them
        data.forEach(function(task) {
          $('#taskList').append(
            `<div class="task" data-task-id="${task.id}">
              <p class="task-title">${task.title}</p>
              <button class="edit">Edit</button>
              <button class="delete">Delete</button>
            </div>`
          );
        });
      },
      error: function() {
        alert('Error fetching tasks!');
      }
    });
  }

  // Add New Task
  $('#addTaskBtn').click(function() {
    var newTaskTitle = prompt('Enter new task title:');
    if (newTaskTitle) {
      // Use AJAX to create new task
      $.ajax({
        url: 'https://jsonplaceholder.typicode.com/todos',
        method: 'POST',
        data: { title: newTaskTitle, completed: false },
        success: function(newTask) {
          $('#taskList').prepend(
            `<div class="task" data-task-id="${newTask.id}">
              <p class="task-title">${newTask.title}</p>
              <button class="edit">Edit</button>
              <button class="delete">Delete</button>
            </div>`
          );
        }
      });
    }
  });

  // Edit Task
  $('#taskList').on('click', '.edit', function() {
    var taskElement = $(this).closest('.task');
    var taskId = taskElement.data('task-id');
    var taskTitle = taskElement.find('.task-title').text();

    var newTitle = prompt('Edit task title:', taskTitle);
    if (newTitle) {
      // Update task using AJAX
      $.ajax({
        url: `https://jsonplaceholder.typicode.com/todos/${taskId}`,
        method: 'PUT',
        data: { title: newTitle, completed: false },
        success: function(updatedTask) {
          taskElement.find('.task-title').text(updatedTask.title);
        }
      });
    }
  });

  // Delete Task
  $('#taskList').on('click', '.delete', function() {
    var taskElement = $(this).closest('.task');
    var taskId = taskElement.data('task-id');

    // Delete task using AJAX
    $.ajax({
      url: `https://jsonplaceholder.typicode.com/todos/${taskId}`,
      method: 'DELETE',
      success: function() {
        taskElement.fadeOut(500, function() {
          $(this).remove();
        });
      }
    });
  });
});
