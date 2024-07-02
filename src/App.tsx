import { useEffect, useState } from "react";
import CompleteTaskList from "./components/CompleteTaskList";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { Task } from "./components/types";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completeTasks, setCompleteTasks] = useState<Task[]>([]);

  useEffect(() => {
    const localTasks = localStorage.getItem("tasks");
    const localCompleteTasks = localStorage.getItem("completeTasks");

    if (localTasks) {
      setTasks(JSON.parse(localTasks));
    }

    if (localCompleteTasks) {
      setCompleteTasks(JSON.parse(localCompleteTasks));
    }
  }, []);

  return (
    <div className="w-full">
      <Header />
      <TaskList
        tasks={tasks}
        completeTasks={completeTasks}
        setTasks={setTasks}
        setCompleteTasks={setCompleteTasks}
      />
      <CompleteTaskList
        tasks={completeTasks}
        setCompleteTasks={setCompleteTasks}
      />
      <TaskInput setTasks={setTasks} tasks={tasks} />
      <Footer />
    </div>
  );
}

export default App;
