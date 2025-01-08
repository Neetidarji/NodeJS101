let fs = require('fs');
let path = require('path');

let todosFile = path.join(__dirname, 'todos.txt');

function readTodos() {
  try {
    if (fs.existsSync(todosFile)) {
      let data = fs.readFileSync(todosFile, 'utf8');
      return data.split('\n').filter(task => task !== '');
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error reading tasks:', error.message);
    return [];
  }
}

function writeTodos(todos) {
  try {
    fs.writeFileSync(todosFile, todos.join('\n'), 'utf8');
  } catch (error) {
    console.error('Error writing tasks:', error.message);
  }
}

let command = process.argv[2];
let argument = process.argv[3];

switch (command) {
  case 'add':
    if (!argument) {
      console.log('Error: Missing task description.');
      console.log('Usage: node todo.js add <task>');
    } else {
      let todos = readTodos();
      todos.push(argument);
      writeTodos(todos);
      console.log('Todo added!');
    }
    break;

  case 'list':
    let todosList = readTodos();
    if (todosList.length === 0) {
      console.log('No todos to display.');
    } else {
      todosList.forEach((task, index) => {
        console.log(`${index + 1}. ${task}`);
      });
    }
    break;

  case 'delete':
    if (!argument || isNaN(argument)) {
      console.log('Error: Invalid task number.');
      console.log('Usage: node todo.js delete <number>');
    } else {
      let taskNumber = parseInt(argument) - 1;
      let todos = readTodos();
      if (taskNumber >= 0 && taskNumber < todos.length) {
        todos.splice(taskNumber, 1);
        writeTodos(todos);
        console.log('Todo deleted!');
      } else {
        console.log('Error: Invalid task number.');
      }
    }
    break;

  case 'clear':
    writeTodos([]);
    console.log('All todos cleared!');
    break;

  default:
    console.log('Invalid command.');
    break;
}
