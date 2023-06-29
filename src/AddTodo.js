import {Component} from 'react'

class AddTodo extends Component{
    state = {
        newTaskContent:'',
        newTaskContent: false
    }

    createToDo = () => {
    const {newTaskContent, newTaskUrgent} = this.state

    const newTodo = {
        task: newTaskContent,
        urgent: newTaskUrgent,
        completed: false
    }
    this.props.saveTodo(newTodo)
    this.setState({
        newTaskContent:'',
        newTaskUrgent: false
    })}

    handleChange = (event) => {
    this.setState({ newTaskContent: event.target.value });
    }

    urgentHandleChange = () => {
    this.setState((prevState) => ({ newTaskUrgent: !prevState.newTaskUrgent }));
  }

    render(){
        const{newTaskContent, newTaskUrgent, newTodo} = this.state

        return(

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
          <button onClick={this.createToDo}>Add</button>
        </div>
        )
}
}
export default AddTodo