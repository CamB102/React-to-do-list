import Todo from "./Todo";
import React, { Component } from "react";
import './style.css'

const startingLists = [
  {
    task: "Make Pancake",
    urgent: false
  },
  {
    task: "Sleep at least 6 hours",
    urgent: true
  },
  {
    task: "Get a coffee!",
    urgent: true
  },
  {
    task: "Make a Todo app - class component",
    urgent: false
  }
];

class TodoList extends Component {
  state = {
    todos: startingLists,
    newTodo: "",
    deletedTask: null,
    showOnlyUrgent: false,
    newTaskUrgent: false
  };

  handleChange = (event) => {
    this.setState({ newTodo: event.target.value });
  };

  urgentHandleChange = () => {
    this.setState((prevState) => ({ newTaskUrgent: !prevState.newTaskUrgent }));
  };

  saveToDo = () => {
    const { newTodo, newTaskUrgent } = this.state;
    const newTask = {
      task: newTodo,
      urgent: newTaskUrgent
    };

    this.setState((prevState) => ({
      todos: [...prevState.todos, newTask],
      newTodo: "",
      newTaskUrgent: false
    }));
  };

  clearList = () => {
    this.setState({ todos: [] });
  };

  clearTask = () => {
    const [removedTask, ...remainingTodos] = this.state.todos;
    this.setState({
      todos: remainingTodos,
      deletedTask: removedTask
    });
  };

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

  render() {
    const { todos, newTodo, showOnlyUrgent, newTaskUrgent } = this.state;

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
        <button onClick={this.clearList}>Clear Whole List</button>
        <Todo className="toDo"/>
        <button onClick={this.recallTask}>Recall Deleted Task</button>

          <button onClick={this.toggleShowOnlyUrgent}>
            {showOnlyUrgent ? "Show All" : "Show Only Urgent"}
          </button>

        {filteredTodos.map((list, index) => (
          <Todo key={index} content={list.task} urgent={list.urgent} />
        ))}

        <div className="addTask">
          <input
            type="text"
            onChange={this.handleChange}
            value={newTodo}
          ></input>
          <label>
            <input
              type="checkbox"
              checked={newTaskUrgent}
              onChange={this.urgentHandleChange}
            ></input><strong>Urgent</strong>
          </label>
          <button onClick={this.saveToDo}>Add</button>
        </div>
      </div>
    );
  }
}
export default TodoList

