import { ApolloError, isApolloError } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { FC, FormEvent, useState } from 'react'
import { useUpdateTaskMutation } from '../generated/graphql-frontend'

interface Values {
  title: string
}

interface Props {
  id: number
  initialValues: Values
}

const UpdateTaskForm: FC<Props> = ({ id, initialValues }) => {
  const [values, setValues] = useState<Values>(initialValues)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues((prevValues) => ({ ...prevValues, [name]: value }))
  }

  const [updateTask, { loading, error }] = useUpdateTaskMutation()

  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const { title } = values
      const { data } = await updateTask({ variables: { input: { id, title } } })
      if (data?.updateTask) {
        router.push("/")
      }
    } catch (e) {
      if (isApolloError(e)) {

      } else {
        console.error(e)
      }
    }
  }

  let errorMessage = ""
  if (error) {
    if (error.networkError) {
      errorMessage = "A network error occured"
    } else {
      console.log(error.graphQLErrors)
      errorMessage = "Det gikk til hælvete: " + error.message
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="alert-error">{errorMessage}</p>}
      <p>
        <label className="field-label">Title</label>
        <input
          type="text"
          name="title"
          className="text-input"
          value={values.title}
          onChange={handleChange}
        />
      </p>
      <p>
        <button className="button" type="submit" disabled={loading}>
          {loading ? "Loading" : "Save"}
        </button>
      </p>
    </form >
  )
}

export default UpdateTaskForm
