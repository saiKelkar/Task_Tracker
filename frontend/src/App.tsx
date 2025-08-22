import React, { useState, useEffect } from 'react'
import { getTasks, createTask, deleteTask } from './api/api'
import type { TaskResponse, TaskCreate } from './api/types'
import { TaskProgress } from './api/types'

export default function App() {
  const [task, setTask] = useState<string>("")
  const [tasks, setTasks] = useState<TaskResponse[]>([])

  const [tag, setTag] = useState<TaskProgress>(TaskProgress.TO_DO)

  useEffect(() => {
    getTasks()
      .then(res => setTasks(res.data))
      .catch(err => console.error("Error fetching tasks:", err))
  }, [])

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (task.trim() === "") return

    const newTask: TaskCreate = {
      taskHead: task,
      taskBody: task,
      tags: tag
    }

    const res = await createTask(newTask)
    setTasks([...tasks, res.data])
    setTask("")
    setTag(TaskProgress.TO_DO)
  }

  const handleTagChange = (id: number, newTag: TaskProgress) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, tags: newTag } : t
    ))
  }

  const handleDelete = async(id: number) => {
    await deleteTask(id)
    setTasks(tasks.filter(t => t.id !== id))
  }

  return (
    <>
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-center v-screen font-bold p-15 text-4xl font-mono">
        FocusList
      </header>
      
      <main className="flex-1">
        <section className="flex justify-center v-screen p-6 text-lg font-mono">
          <form 
            onSubmit={ handleSubmit }
            className="px-6 py-2 border border-gray-400 rounded-lg bg-blue-50">
            <input 
              type="text" 
              value={task} 
              placeholder=" Add a new task"
              onChange={ (e) => setTask(e.target.value) }
            ></input>
            <select
              value={ tag }
              onChange={ (e) => setTag(e.target.value as TaskProgress) }
              className="py-1 px-2">
                <option value={ TaskProgress.TO_DO }>To Do</option>
                <option value={ TaskProgress.IN_PROGRESS }>In Progress</option>
                <option value={ TaskProgress.DONE }>Done</option>
            </select>
            <button type="submit" className="pl-6">+</button>
          </form>
        </section>
        
        <section className="flex justify-center v-screen p-6 text-lg font-mono">
          <table>
            <tbody>
              { tasks.map((t) => (
                <tr key={ t.id } className="p-1">
                  <td className="pr-8">{ t.taskHead }</td>
                  <td>
                    <select
                      value={ t.tags }
                      onChange={ (e) => handleTagChange(t.id, e.target.value as TaskProgress) }
                      className="py-1 px-2">
                        <option value={ TaskProgress.TO_DO }>To Do</option>
                        <option value={ TaskProgress.IN_PROGRESS }>In Progress</option>
                        <option value={ TaskProgress.DONE }>Done</option>
                    </select>
                  </td>
                  <td>
                    <button 
                      onClick={ () => handleDelete(t.id) }
                      className="pl-6">
                        ×
                      </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
      
      <footer className="flex content-end justify-center v-screen p-2 text-xs font-mono">
        Copyright © 2025
      </footer>
    </div>
    </>
  )
}
