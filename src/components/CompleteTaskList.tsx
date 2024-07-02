import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Task } from "./types";

type Props = {
  tasks: Task[];
  setCompleteTasks: (task: Task[]) => void;
};

function CompleteTaskList({ tasks, setCompleteTasks }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const DeleteTask = (index: number) => {
    // console.log(index + "番目を削除");
    const newTask: Task[] = [...tasks];
    newTask.splice(index, 1);
    setCompleteTasks(newTask);
    localStorage.setItem("completeTasks", JSON.stringify(newTask));
  };
  return (
    <div className="bg-blue-50 m-3 p-3 rounded-md">
      <div
        className="text-xl text-center flex items-center justify-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        完了タスク <KeyboardArrowDownIcon />
      </div>
      <div>
        <ul className={isOpen ? "" : "hidden"}>
          <hr className="my-2" />
          {tasks.length == 0 ? (
            <div className="text-center">タスクがありません</div>
          ) : (
            <></>
          )}
          {tasks.map((task: Task, index: number) => (
            <li className="border-b mb-2 pb-2" key={index}>
              <div className="flex items-center w-full">
                <p className="text-lg font-bold">{task.title}</p>
              </div>
              <p className="ml-2">{task.memo}</p>
              <div className="flex justify-end *:ml-2 *:shadow-sm">
                <button
                  className="text-white bg-red-500 px-5 py-1 rounded"
                  onClick={() => DeleteTask(index)}
                >
                  削除
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CompleteTaskList;
