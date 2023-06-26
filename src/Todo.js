import './style.css'
function Todo({content, urgent}){
    const todoStyle = {
    backgroundColor: urgent ? '#c9baf8' : 'white'
    }

    return(
        <div className="todo" style={todoStyle}>
            <p>{content}</p>
            <p>{urgent}</p>
        </div>
    )
}
export default Todo