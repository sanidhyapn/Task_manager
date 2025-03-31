import { createContext, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    if (!user) return;
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      console.log("Fetched tasks:", res.data);
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async (task) => {
    if (!user) return;
    try {
      const res = await axios.post("http://localhost:5000/api/tasks", task, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setTasks((prevTasks) => [...prevTasks, res.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id) => {
    if (!user) return;
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTaskStatus = async (id, status) => {
    if (!user) return;
    try {
      const res = await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, status: res.data.status } : task
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  // New function to update task details (title, status, and priority)
  const updateTaskDetails = async (id, updatedDetails) => {
    if (!user) return;
    try {
      const res = await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        updatedDetails,
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, ...updatedDetails } : task
        )
      );
    } catch (error) {
      console.error("Error updating task details:", error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        fetchTasks,
        addTask,
        deleteTask,
        updateTaskStatus,
        updateTaskDetails, // Make sure to include this in the context value
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext };
