import react, { Component } from 'react'
import TodoHeader from './components/TodoHeader/TodoHeader'
import { TodoProvider } from './utils/context'
import TodoList from './components/TodoList/TodoList'
import TodoInput from './components/TodoInput/TodoInput'



const todos = Array(7).fill(null).map((mes, i) => ({
  id: i + 1,
  title: '待办事项' + (i + 1),
  completed: false
}))

let storage = window.localStorage
if (!storage.todos) {
  storage.setItem("todos", JSON.stringify(todos))
}

export default class App extends Component {
  state = {
    todos: JSON.parse(storage.todos)
  }

  // 删除待办事项
  removeTodoItem = id => {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    })
  }

  // 修改事件完成状态
  completedTodoItem = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        const copy = { ...todo }
        if (copy.id === id) {
          copy.completed = !copy.completed
          console.log(copy)
        }
        return copy
      })
    })
  }

  // 添加待办事件
  addTodoItem = title => {
    let length = this.state.todos.slice(-1)[0].id + 1
    this.setState({
      todos: [
        ...this.state.todos,
        {
          id: length,
          title,
          completed: false
        }
      ]
    })
  }

  // 编辑待办事项
  editTodoItem = (id, title) => {
    console.log(id, title)
    this.setState({
      todos: this.state.todos.map(todo => {
        const copy = { ...todo }
        if (copy.id === id) {
          copy.title = title
        }
        return copy
      })
    })
  }

  // 数据监听
  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      console.log('数据变化了')
      storage.todos = JSON.stringify(this.state.todos)
    }
  }

  render() {
    console.log(this.props, this.state.todos)
    return (
      <TodoProvider value={{
        todos: this.state.todos,
        remove: this.removeTodoItem,
        completed: this.completedTodoItem,
        add: this.addTodoItem,
        editT: this.editTodoItem
      }}>
        <TodoHeader />
        <div style={{ marginLeft: "100px", marginTop: "10px" }}>
          <TodoInput />
          <TodoList todos={this.state.todos} />
        </div>
      </TodoProvider>
    )
  }
}