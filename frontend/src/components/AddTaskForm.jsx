import { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { Toast } from "react-bootstrap";

const AddTaskForm = () => {
  const { addTask } = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Pending");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      setToastMessage("Task title is required.");
      setToastVisible(true);
      return;
    }

    const newTask = {
      title,
      priority,
      status,
    };

    addTask(newTask); // Add the task
    setTitle(""); // Clear the title input after submission
    setToastMessage("Task added successfully.");
    setToastVisible(true);
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Task Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="priority" className="form-label">
            Priority
          </label>
          <select
            id="priority"
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            id="status"
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </form>

      {/* Toast for feedback */}
      <Toast
        show={toastVisible}
        onClose={() => setToastVisible(false)}
        delay={4000}
        autohide
        bg={toastMessage.includes("Error") ? "danger" : "info"} // Light blue color for success
        className="position-fixed top-0 start-50 translate-middle-x m-3 shadow-sm"
      >
        <Toast.Body
          style={{
            color: "white",
            textAlign: "center",
            fontSize: "16px", // Adjust the font size here
            padding: "12px 20px", // Center the text
          }}
        >
          {toastMessage}
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default AddTaskForm;
