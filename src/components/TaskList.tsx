// TODO 最大表示量こえたらスクロールさせる

import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Task } from "./types";

type Props = {
  setCompleteTasks: (task: Task[]) => void;
  setTasks: (task: Task[]) => void;
  tasks: Task[];
  completeTasks: Task[];
};

function TaskList({ tasks, completeTasks, setCompleteTasks, setTasks }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const AddCompleteTask = (index: number) => {
    // index番目のタスクを完了済みリストに追加
    // console.log(index + "番目を完了済みリストへ");
    setCompleteTasks([...completeTasks, tasks[index]]);
    localStorage.setItem(
      "completeTasks",
      JSON.stringify([...completeTasks, tasks[index]])
    );

    // タスク一覧からindex番目のタスクを消す
    const newTask: Task[] = [...tasks];
    //splice(i,1) => i番目の要素を削除する
    newTask.splice(index, 1);
    setTasks(newTask);
    localStorage.setItem("tasks", JSON.stringify(newTask));
  };

  const DeleteTask = (index: number) => {
    // console.log(index + "番目を削除");
    const newTask: Task[] = [...tasks];
    newTask.splice(index, 1);
    setTasks(newTask);
    localStorage.setItem("tasks", JSON.stringify(newTask));
  };

  // TODO タスクの編集
  const EditTask = (index: number) => {
    console.log(index + "番目のタスクを編集");
    alert("まだ実装されてません；；");
  };

  return (
    <div className="bg-gray-50 m-3 p-3 rounded-md">
      <div
        className="text-xl text-center flex items-center justify-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        タスク <KeyboardArrowDownIcon />
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
                {/* TODO 日付見やすい形に */}
                <p className="text-gray-700 ml-3">
                  期日: {`${task.formatDate[0]}月${task.formatDate[1]}日`}
                </p>
                {/* TODO ◯まで実装 */}
                {/* <p className="ml-1">まで◯日</p> */}
              </div>
              <p className="ml-2">{task.memo}</p>
              <div className="flex mt-2 justify-end *:ml-2 *:shadow-sm">
                <button
                  className="text-white bg-red-500 px-5 py-1 rounded"
                  onClick={() => DeleteTask(index)}
                >
                  削除
                </button>
                <button
                  className="text-white bg-green-500 px-5 py-1 rounded"
                  onClick={() => EditTask(index)}
                >
                  編集
                </button>
                <button
                  className="text-white bg-blue-500 px-7 py-1 rounded"
                  onClick={() => AddCompleteTask(index)}
                >
                  完了
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TaskList;
