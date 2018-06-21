import { observable, autorun } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";

import { Todo } from "./Todo";

@observer
export class TodoList extends React.Component {
  @observable newTodoTitle = "";
  @observable newTodoTitle2 = "";  

  render() {
    autorun(() => {
      console.log(this.newTodoTitle);
      console.log('dddd');
    })
    const { todoStore, todoStore2 } = this.props;
    return (
      <div>
        <div key="1">
          <input value={this.newTodoTitle} onChange={this.handleChange} />
          <button onClick={this.handleNewTodoClick}>Add</button>
          <ul>
            {todoStore.todos.map(todo => <Todo todo={todo} key={todo.id} />)}
          </ul>
          Tasks left: {todoStore.unfinishedTodoCount}
        </div>

        <div key="2">
          <input
            value={this.newTodoTitle2}
            onChange={e => this.handleChange(e, 2)}
          />
          <button onClick={e => this.handleNewTodoClick(e, 2)}>Add</button>
          <ul>
            {todoStore2.todos.map(todo => <Todo todo={todo} key={todo.id} />)}
          </ul>
          Tasks left: {todoStore2.unfinishedTodoCount}
        </div>
      </div>
    );
  }

  handleChange = (e, n) => {
    console.log("wtf");
    if (n === 2) {
      this.newTodoTitle2 = e.target.value;
      console.log(this.newTodoTitle2);
    } else {
      // this.setState({
      //   t1: e.target.value
      // })
      this.newTodoTitle = e.target.value;
      console.log(this.newTodoTitle);
    }

    
  };

  handleNewTodoClick = (e, n) => {
    console.log('handleNewTodoClick')
    e.stopPropagation();
    if (n === 2) {
      this.props.todoStore2.addTodo(this.newTodoTitle);
      this.newTodoTitle = "";
    } else {
      this.props.todoStore.addTodo(this.newTodoTitle);
      this.newTodoTitle = "";
    }
  };
}
