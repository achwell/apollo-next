import React, { FC } from 'react'
import { Task } from '../generated/graphql-frontend'
import Link from 'next/link'
import TaskListItem from './TaskListItem'

interface Props {
  tasks: Task[]
}

const TaskList: FC<Props> = ({ tasks }) => {
  return (
    <ul className="task-list">
      {tasks.map((task) => {
        return <TaskListItem key={task.id} task={task} />
      })}
    </ul>
  )
}

export default TaskList
