import React, { Component } from "react";

export default class TodoList extends Component {
    state = {
        todos : []
    }
    onClick = () => {
        import('./Todo').then(({Todo})=>{
            const {todos} = this.state;
            const position = todos.length +1;
            const newTodo = <Todo key={position} title={`Summary ${position}`} />
            this.setState({todos:[...todos,newTodo]})
        })
    }
    render() {
        const {todos} = this.state;
        return (
            <div>
                <button onClick={this.onClick}>요약본 추가</button>
                {todos}
            </div>
        )
    }
}