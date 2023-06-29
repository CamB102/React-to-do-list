import TodoList from "./TodoList";
import './style.css'
function App() {
  return (
    <div className="App">
      <h1>TO DO LIST</h1>
      <p>Remind me if you can :)</p>
      <div className="toDoList">
        <TodoList style="padding: 5px"/>
      </div>
    </div>
  );
}

export default App;
