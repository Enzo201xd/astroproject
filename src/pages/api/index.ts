import { getTasks, createTask, deletedCompletedtasks } from '../../components/services/Task'; 
import type { APIContext } from 'astro';

const PORT = process.env.PORT || 4321;

export async function GET()  {
  const taskList = await getTasks()
  return new Response(
    JSON.stringify({
      taskList
    }))
  } 

export async function POST(context: APIContext)  {
  const data: { title: string } = await context.request.json()
    const task = await createTask(data.title)
    return new Response(
      JSON.stringify({
        task
      }))
    } 

export async function PATCH()  {
    const task = await deletedCompletedtasks()
    return new Response(
      JSON.stringify({
        task
      }))
    } 

