import './style.css'
function Todo({content, urgent, completed, markAsCompleted}){
    const urgentStyle = {
    backgroundColor: urgent ? '#c9baf8' : 'white'}

    const completedStyle ={
    textDecoration: completed ? 'line-through' : 'none'
    }

    return(
        <div className="todo" style={{...urgentStyle, ...completedStyle}}>
            <p>{content}</p>
            <p>{urgent}</p>
            <button className="completed" onClick={markAsCompleted}> {completed ? "Completed" : "Not Completed"}</button>
        </div>
    )
}
export default Todo