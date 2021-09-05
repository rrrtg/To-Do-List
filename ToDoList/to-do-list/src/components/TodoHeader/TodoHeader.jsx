import React, { Component } from 'react'
import { PageHeader } from 'antd'
import './TodoHeader.css'

export default class TodoHeader extends Component {
  render() {
    return (
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="待办事项表"
        subTitle="This is a todoList"
      />
    )
  }
}

