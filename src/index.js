import { observable, computed } from "mobx"; 
import { observer } from "mobx-react";
import {onSnapshot} from 'mobx-state-tree';
import * as React from "react";
import { render } from "react-dom";

import { TodoStore, TodoStore2 } from "./models/TodoStore";
import { TodoList } from "./components/TodoList";

const todoStore = TodoStore.create({
  todos: [
    {
      _id: Math.random().toString(),
      title: "Get Coffee"
    },
    {
      _id: Math.random().toString(),
      title: "Write simpler code"
    }
  ]
});

const todoStore2 = TodoStore2.create({
  todos: [
    {
      _id: Math.random().toString(),
      title: "Get Coffee2"
    },
    {
      _id: Math.random().toString(),
      title: "Write simpler code2"
    }
  ]
});

const stores = {
  todoStore,
  todoStore2
}

onSnapshot(todoStore2, (snapShot) => {
  //todoStore.addLast(snapShot.todos.pop()._id);
  console.log(snapShot)
})

window.stores = stores
render(<TodoList {...stores} />, document.getElementById("root"));

setTimeout(() => {
  stores.todoStore2.todos[0].toggle();
  stores.todoStore2.addTodo("Cool huh?1");
}, 2000);
