import React, { Component, createRef } from 'react'
import { Divider, Table, Space, Popconfirm, Button, Switch, Modal, Input } from 'antd';
import PropTypes from 'prop-types'
import { TodoConsumer, TodoContext } from '../../utils/context';

export default class TodoList extends Component {
  // 静态属性，用于对组件接收属性的验证
  static propTypes = {
    todos: PropTypes.array.isRequired
  }

  static contextType = TodoContext

  state = {
    isModalVisible: false,
    inputValue: '',
    editId: 0,
  }

  // Modal
  showModal = (id) => {
    console.log(this.state.editId)
    this.setState({
      isModalVisible: true,
      editId: id,
    })
  }

  handleOk = () => {
    this.context.editT(this.state.editId, this.state.inputValue)
    this.setState({
      isModalVisible: false,
      inputValue: '',
      editId: 0,
    })
  }

  handleCancel = () => {
    this.setState({
      isModalVisible: false,
    })
  }


  // Modal Input
  inputRef = createRef()

  handleInput = e => {
    this.setState({
      inputValue: e.target.value
    })
  }

  render() {

    const columns = [
      {
        title: 'Completed',
        key: 'completed',
        render: (record) => (
          <TodoConsumer>
            {
              ({ completed }) => {
                return (
                  <Switch checked={record.completed} onClick={() => { completed(record.id) }} />
                )
              }
            }
          </TodoConsumer>
        ),
      },
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Action',
        key: 'action',
        render: (record) => (
          <TodoConsumer>
            {
              ({ remove, editT }) => {
                return (
                  <Space size="middle">
                    <Button onClick={() => { this.showModal(record.id) }}>编辑 {record.id}</Button>
                    <Modal title="请输入新的title" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                      <Input
                        placeholder={record.title}
                        value={this.state.inputValue}
                        onChange={this.handleInput}
                        ref={this.inputRef}

                      />
                    </Modal>

                    <Popconfirm
                      title="确认删除"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => {
                        remove(record.id)
                      }}
                    >
                      <Button>删除</Button>
                    </Popconfirm>
                  </Space>
                )
              }
            }
          </TodoConsumer>
        ),
      }
    ]

    return (
      <>
        <Divider orientation="left">这里是列表</Divider>
        <Table columns={columns} dataSource={this.props.todos} rowKey="id" pagination={{ pageSize: 6 }} />
      </>
    )
  }
}
