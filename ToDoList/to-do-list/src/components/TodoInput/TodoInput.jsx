import React, { Component, createRef } from 'react'
import { TodoContext } from '../../utils/context'
import { Input } from 'antd';

export default class TodoInput extends Component {
  static contextType = TodoContext

  state = {
    inputValue: ''
  }

  // ref
  inputRef = createRef()

  handleInput = e => {
    this.setState({
      inputValue: e.target.value
    })
  }

  // 添加
  handleAdd = e => {
    if (e.keyCode === 13) {
      console.log(this.context.todos)
      e.preventDefault()
      this.inputRef.current.focus()
      if (this.state.inputValue.trim().length === 0) {
        return
      }
      this.context.add(this.state.inputValue)
      this.setState({
        inputValue: ''
      })
    }
  }

  render() {
    return (
      <div>
        <Input
          type="text"
          placeholder="新增待办事项,回车输入"
          value={this.state.inputValue}
          onChange={this.handleInput}
          ref={this.inputRef}
          onKeyDown={this.handleAdd}
          size="large"
        />
      </div>
    )
  }
}
