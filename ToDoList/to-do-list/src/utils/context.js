import { createContext } from "react"

// 创建Context对象
const TodoContext = createContext()

const {
  Provider: TodoProvider, // 用于保存数据
  Consumer: TodoConsumer, // 用于使用数据
} = TodoContext

export {
  TodoProvider,
  TodoConsumer,
  TodoContext
}