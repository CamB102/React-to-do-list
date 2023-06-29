import Todo from "./Todo";
import React, { Component } from "react";
import './style.css'
import AddTodo from "./AddTodo";

const startingLists = [
  {
    task: "Make Pancake",
    urgent: false,
    completed: false
  },
  {
    task: "Sleep at least 6 hours",
    urgent: true,
    completed: false
  },
  {
    task: "Get a coffee!",
    urgent: true,
    completed: false
  },
  {
    task: "Make a Todo app - class component",
    urgent: false,
    completed: true
  },
   {
    task: "Drink Hotchoc",
    urgent: false,
    completed: true
  },
   {
    task: "Water the catus",
    urgent: false,
    completed: false
  }
];

class TodoList extends Component {
  state = {
    todos: startingLists,
    newTodo: "",
    deletedTask: null,
    showOnlyUrgent: false,
    newTaskUrgent: false,
    completed: false
  };
// handleChange = (event) => {
//     this.setState({ newTodo: event.target.value });
//   }

  // urgentHandleChange = () => {
  //   this.setState((prevState) => ({ newTaskUrgent: !prevState.newTaskUrgent }));
  // }

  // saveToDo = () => {
  //   const { newTodo, newTaskUrgent, newCompleted } = this.state;
  //   const newTask = {
  //     task: newTodo,
  //     urgent: newTaskUrgent,
  //     completed: newCompleted
  //   };

  //   this.setState((prevState) => ({
  //     todos: [...prevState.todos, newTask],
  //     newTodo: "",
  //     newTaskUrgent: false,
  //     newCompleted: false
  //   }))
  // }

  saveToDo = (newTodo) => {
    this.setState((prevState) => ({
      todos: [...prevState.todos, newTodo]
    }))
  }

  clearList = () => {
    this.setState({ todos: [] });
  }

  clearTask = () => {
    const [removedTask, ...remainingTodos] = this.state.todos;
    this.setState({
      todos: remainingTodos,
      deletedTask: removedTask
    });
  };

  clearCompletedTask = () => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => !todo.completed)
    }))
  }

  recallTask = () => {
    const { deletedTask, todos } = this.state;

    if (deletedTask) {
      this.setState({
        todos: [deletedTask, ...todos],
        deletedTask: null
      });
    }
  };

  toggleShowOnlyUrgent = () => {
    this.setState((prevState) => ({
      showOnlyUrgent: !prevState.showOnlyUrgent
    }));
  };

  markAsCompleted = (index) => {
    this.setState((prevState) => {
      const updatedTodos = [...prevState.todos]

      updatedTodos[index].completed = true;
      return{todos: updatedTodos}
    }

    )
  }

  render() {
    const { todos, showOnlyUrgent } = this.state;

    const filteredTodos = showOnlyUrgent
      ? todos.filter((todo) => todo.urgent)
      : todos;

    const sortedTodos = filteredTodos.sort((a, b) => {
    if (a.urgent && !b.urgent) {
      return -1 // a is urgent, b is not urgent, move a to a lower index
    } else if (!a.urgent && b.urgent) {
      return 1 // a is not urgent, b is urgent, move b to a lower index
    }
    return 0 // both a and b have the same urgency, maintain their order
    })

    return (
      <div>
        <button onClick={this.clearTask}>Clear First Task</button>
        <button onClick={this.clearCompletedTask}>Clear Completed Tasks</button>
        <button onClick={this.clearList}>Clear Whole List</button>
        <button onClick={this.recallTask}>Recall Deleted Task</button>

          <button onClick={this.toggleShowOnlyUrgent}>
            {showOnlyUrgent ? "Show All" : "Show Only Urgent"}
          </button>

        {filteredTodos.map((list, index) => (
          <Todo 
          key={index} 
          content={list.task} 
          urgent={list.urgent}
          completed={list.completed}
          markAsCompleted = {() => this.markAsCompleted(index)}
           />
        ))}
        <AddTodo  saveTodo={this.saveToDo}/>
      </div>
    );
  }
}
export default TodoList

