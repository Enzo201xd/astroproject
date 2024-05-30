let tasks = [];
async function getTasks() {
  return tasks;
}
async function createTask(title) {
  const task = {
    id: Math.floor(Math.random() * 1e6).toString(),
    title,
    completed: false
  };
  tasks.push(task);
  return task;
}
async function deletedCompletedtasks() {
  tasks = tasks.filter((task) => !task.completed);
  return tasks;
}

process.env.PORT || 4321;
async function GET() {
  const taskList = await getTasks();
  return new Response(
    JSON.stringify({
      taskList
    })
  );
}
async function POST(context) {
  const data = await context.request.json();
  const task = await createTask(data.title);
  return new Response(
    JSON.stringify({
      task
    })
  );
}
async function PATCH() {
  const task = await deletedCompletedtasks();
  return new Response(
    JSON.stringify({
      task
    })
  );
}

export { GET, PATCH, POST };
