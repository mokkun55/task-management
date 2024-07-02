import dayjs from "dayjs";
import React, { useState } from "react";
import { Task } from "./types";

type Props = {
  setTasks: (task: Task[]) => void;
  tasks: Task[];
};

function TaskInput({ setTasks, tasks }: Props) {
  const [inputTask, setInputTask] = useState<string>("");
  const [inputMemo, setInputMemo] = useState<string>("");
  const todayDate = dayjs().format("YYYY-MM-DD");
  const [inputDate, setInputDate] = useState<string>(todayDate);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTask) {
      alert("タイトルを入力してください");
    } else {
      // 時刻 07 => 7 にフォーマット
      const splitDate = inputDate.split("-");
      const formatDate = [parseInt(splitDate[1]), parseInt(splitDate[2])];

      const newTask: Task = {
        title: inputTask,
        memo: inputMemo,
        date: inputDate,
        formatDate: formatDate,
      };
      // console.log(newTask);

      setTasks([...tasks, newTask]);
      setInputTask("");
      setInputMemo("");
      setInputDate(todayDate);
      localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
    }
  };

  return (
    <form onSubmit={(e) => addTask(e)}>
      <div className="flex flex-col m-5">
        <input
          type="text"
          className="border rounded-md p-2 mb-2"
          placeholder="タスクを入力"
          onChange={(e) => setInputTask(e.target.value)}
          value={inputTask}
        />
        <input
          type="text"
          className="border rounded-md p-2"
          placeholder="メモ"
          onChange={(e) => setInputMemo(e.target.value)}
          value={inputMemo}
        />
        <div className="flex items-center justify-end my-3">
          <p className="text-xl">期限：</p>
          <input
            type="date"
            className="text-xl"
            placeholder=""
            onChange={(e) => setInputDate(e.target.value)}
            value={inputDate}
          />
        </div>
        <button className="border bg-blue-500 text-white px-3 py-2 rounded-md">
          追加
        </button>
      </div>
    </form>
  );
}

export default TaskInput;
