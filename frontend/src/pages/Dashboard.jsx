import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import { AuthContext } from "../context/AuthContext";
import AddTaskForm from "../components/AddTaskForm";
import { Toast, Spinner, Modal, Button, Form, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa"; // Only the Logout icon
import "../css/dashboard.css"; // Import CSS file

const Dashboard = () => {
  const { tasks, fetchTasks, deleteTask, updateTaskStatus, updateTaskDetails } =
    useContext(TaskContext);
  const { user, logout } = useContext(AuthContext);
  const [tasksFetched, setTasksFetched] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [loadingTaskId, setLoadingTaskId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editStatus, setEditStatus] = useState("Pending");
  const [editPriority, setEditPriority] = useState("Low");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchPriority, setSearchPriority] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (user && !tasksFetched) {
      fetchTasks();
      setTasksFetched(true);
    }
  }, [user, tasksFetched, fetchTasks]);

  const filteredTasks = tasks.filter((task) => {
    const titleMatch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const priorityMatch = searchPriority
      ? task.priority === searchPriority
      : true;
    const statusMatch = searchStatus ? task.status === searchStatus : true;

    return titleMatch && priorityMatch && statusMatch;
  });

  const handleDelete = async (taskId) => {
    setLoadingTaskId(taskId);
    try {
      await deleteTask(taskId);
      setToastMessage("Task deleted successfully");
      setToastVisible(true);
    } catch (error) {
      setToastMessage("Error deleting task");
      setToastVisible(true);
    } finally {
      setLoadingTaskId(null);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditStatus(task.status);
    setEditPriority(task.priority);
  };

  const handleSaveEdit = async () => {
    try {
      await updateTaskDetails(editingTask._id, {
        title: editTitle,
        status: editStatus,
        priority: editPriority,
      });
      setToastMessage("Task updated successfully");
      setToastVisible(true);
      setEditingTask(null);
    } catch (error) {
      setToastMessage("Error updating task");
      setToastVisible(true);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toastBackgroundColor = toastMessage.includes("Error")
    ? "danger"
    : toastMessage.includes("successfully")
    ? "success"
    : "info";

  return (
    <div className="container-fluid mt-4" style={{ height: "100vh" }}>
      <div className="row" style={{ height: "100%" }}>
        {/* Sidebar */}
        <div className="col-md-3 bg-light p-3" style={{ height: "100vh" }}>
          <h4 className="text-center mb-4">Task Management System</h4>
          <p className="text-center">
            <hr></hr>
            <br></br>
            <br></br>
            Hello, <strong>{user?.name}!</strong> Welcome back to your Task
            Manager.
          </p>
          <p className="text-center mb-4">
            Stay organized and on top of your tasks. Add, edit, or delete tasks
            as needed.
          </p>

          <Button
            variant="danger"
            onClick={handleLogout}
            className="w-100 mt-4"
          >
            <FaSignOutAlt size={18} /> Logout
          </Button>
        </div>

        {/* Main Content Area */}
        <div
          className="col-md-9"
          style={{ height: "100vh", overflowY: "auto" }}
        >
          <div className="content-wrapper p-4 bg-white rounded shadow-sm">
            <AddTaskForm />

            {/* Search and Filter */}
            <div className="row">
              <div className="col-md-4 mb-3">
                <Form.Control
                  type="text"
                  placeholder="Search tasks by title"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="col-md-4 mb-3">
                <Form.Control
                  as="select"
                  value={searchPriority}
                  onChange={(e) => setSearchPriority(e.target.value)}
                >
                  <option value="">Filter by Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </Form.Control>
              </div>
              <div className="col-md-4 mb-3">
                <Form.Control
                  as="select"
                  value={searchStatus}
                  onChange={(e) => setSearchStatus(e.target.value)}
                >
                  <option value="">Filter by Status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </Form.Control>
              </div>
            </div>

            {/* Task List */}
            <div className="task-list mt-4">
              {filteredTasks.length > 0 ? (
                <div className="row">
                  {filteredTasks.map((task) => (
                    <div className="col-md-6 col-lg-4 mb-4" key={task._id}>
                      <Card className="task-card shadow-sm">
                        <Card.Body>
                          <Card.Title>{task.title}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            Status: {task.status} | Priority: {task.priority}
                          </Card.Subtitle>
                          <div className="d-flex justify-content-between mt-3">
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(task._id)}
                              disabled={loadingTaskId === task._id}
                            >
                              {loadingTaskId === task._id ? (
                                <Spinner animation="border" size="sm" />
                              ) : (
                                "Delete"
                              )}
                            </Button>
                            <Button
                              variant="warning"
                              size="sm"
                              onClick={() => handleEditTask(task)}
                            >
                              Edit
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center mt-3">
                  No tasks available. Add a new task!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <Toast
        show={toastVisible}
        onClose={() => setToastVisible(false)}
        delay={4000}
        autohide
        bg={toastBackgroundColor}
        className="position-fixed top-0 start-50 translate-middle-x m-3 shadow-sm custom-toast"
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>

      {/* Modal for Editing Tasks */}
      <Modal show={editingTask} onHide={() => setEditingTask(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="editTitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="editTitle"
              className="form-control"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="editStatus" className="form-label">
              Status
            </label>
            <select
              id="editStatus"
              className="form-select"
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="editPriority" className="form-label">
              Priority
            </label>
            <select
              id="editPriority"
              className="form-select"
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditingTask(null)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
