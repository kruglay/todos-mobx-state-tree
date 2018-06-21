import { types } from "mobx-state-tree";

export const Todo = types
  .model("Todo", {
    _id: types.identifier(),
    title: types.string,
    finished: false
  })
  .actions(self => ({
    toggle() {
      self.finished = !self.finished;
    }
  }));

export const Todo2 = types
  .model("Todo2", {
    _id: types.identifier(),
    title: types.string,
    finished: false
  })
  .actions(self => ({
    toggle() {
      self.finished = !self.finished;
    }
  }));

export const TodoStore = types
  .model("TodoStore", {
    todos: types.array(Todo),
    lastAdded: types.maybe(types.reference(Todo2), '')
  })
  .views(self => ({
    get unfinishedTodoCount() {
      return self.todos.filter(todo => !todo.finished).length;
    }
  }))
  .actions(self => ({
    addTodo(title) {
      const _id = Math.random().toString()
      self.todos.push({ 
        title ,
        _id 
        });      
      console.log(self)      
    },
    addLast(_id) {
      self.lastAdded = _id
    }
  }));

export const TodoStore2 = types
  .model("TodoStore", {
    todos: types.array(Todo2),
    lastAdded: types.maybe(types.reference(Todo2), '')
  })
  .views(self => ({
    get unfinishedTodoCount() {
      return self.todos.filter(todo => !todo.finished).length;
    }
  }))
  .actions(self => ({
    addTodo(title) {
      const _id = Math.random().toString()
      self.todos.push({
        title,
        _id
      });
      self.lastAdded = _id;
      console.log(self)
    }
  }));
