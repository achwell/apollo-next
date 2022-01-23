import React, { ChangeEvent, FC, useEffect } from 'react'
import { Task, TaskStatus, useDeleteTaskMutation, useUpdateTaskMutation } from '../generated/graphql-frontend'
import Link from 'next/link'
import { Reference } from '@apollo/client'

interface Props {
  task: Task
}

const TaskListItem: FC<Props> = ({ task }) => {
  const [deleteTask, { loading, error }] = useDeleteTaskMutation({
    variables: { id: task.id },
    errorPolicy: 'all',
    update: (cache, result) => {
      const deletedTask = result.data?.deleteTask

      if (deletedTask) {
        cache.modify({
          fields: {
            tasks(taskRefs: Reference[], { readField }) {
              return taskRefs.filter((taskRef) => readField('id', taskRef) !== deletedTask.id)
            },
          },
        })
      }
    },
  })
  const handleDeleteClick = () => {
    deleteTask()
  }

  useEffect(() => {
    if (error) {
      alert('An error occurred, please try again.')
    }
  }, [error])

  const [updateTask, { loading: updateTaskLoading, error: updateTaskError }] = useUpdateTaskMutation({ errorPolicy: 'all' })

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.target.checked ? TaskStatus.Completed : TaskStatus.Active
    updateTask({ variables: { input: { id: task.id, status: newStatus } } })
  }

  useEffect(() => {
    if (updateTaskError) {
      alert(updateTaskError)
    }
  }, [updateTaskError])

  return (
    <li className="task-list-item" key={task.id}>
      <label className='checkbox'>
        <input type='checkbox' checked={task.status === TaskStatus.Completed} onChange={handleStatusChange} disabled={updateTaskLoading} />
        <span className='checkbox-mark'>&#10003;</span>
      </label>
      <Link href="/update/[id]" as={`/update/${task.id}`}>
        <a className="task-list-item-title">{task.title}</a>
      </Link>
      <button
        className="task-list-item-delete"
        disabled={loading}
        onClick={handleDeleteClick}
      >
        &times;
      </button>
    </li>
  )
}

export default TaskListItem
