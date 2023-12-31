import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { UserContext } from "../context/userContext";
import { AppUserContext } from "../context/appUserContext";
import { Navigate } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Dropdown,
} from "react-bootstrap";

import { toast } from "react-toastify";
import "./Tasks.css";
import DeleteTaskModal from "../components/DeleteTaskModal.js";

const Tasks = () => {
  const context = useContext(UserContext);
  const appUserContext = useContext(AppUserContext);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [chosenCategory, setChosenCategory] = useState("Notes"); // Default category

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskBeingDeleted, setTaskBeingDeleted] = useState(null);

  const handleDeletePopup = (task) => {
    setTaskBeingDeleted(task);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setTaskBeingDeleted(null);
    setShowDeleteModal(false);
    fetchTasks(); // Fetch the tasks again after deletion
  };

  let current_datetime = new Date();
  let formatted_date = current_datetime
    .toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    .split(",");

  // We will now format the date and time in suitable format to be used in datetime-local HTML attribute
  let date = formatted_date[0].split("/");
  date =
    date[2] + "-" + ("0" + date[0]).slice(-2) + "-" + ("0" + date[1]).slice(-2); // YYYY-MM-DD format

  let time = formatted_date[1].trim(); // trim is used to remove leading white spaces
  time = time.substring(0, time.lastIndexOf(":")); // Removing the seconds from the time

 const [taskInput, setTaskInput] = useState({
   task_title: "",
   task_category: "",
   task_priority: "",
   task_date: date + "T" + time,
   task_desc: "",
   userId: null, // Initialize userId as null
 });

 const initialTaskInput = {
   task_title: "",
   task_category: "",
   task_priority: "",
   task_date: date + "T" + time,
   task_desc: "",
   userId: null, // Initialize userId as null
 };
  const categoryColors = {
    Work: "secondary", // Grey
    Study: "success", // Green
    Goal: "dark", // Grey
    Reminder: "warning", // Yellow
    Important: "danger", // Red
    Note: "info", // Dark
    Missilinious: "dark", // Dark
  };

  const fetchTasks = useCallback(async () => {
    if (appUserContext && appUserContext.appUser) {
    try {
      const response = await axios.get(
        `https://my-expense-tracker-backend.rishavkumaraug20005212.workers.dev/task?userId=${
          appUserContext.appUser.userId
        } &search_str=${search}&count=${100}`
      );
      setTasks(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  }, [search, appUserContext]);

  const handleInputChange = (event) => {
    setTaskInput({
      ...taskInput,
      [event.target.name]: event.target.value,
    });
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => {
  //   fetchTasks();
  // }, []);

useEffect(() => {
  // After appUserContext.appUser becomes available, update expenseInput.userId
  if (appUserContext && appUserContext.appUser) {
    setTaskInput((prevTaskInput) => ({
      ...prevTaskInput,
      userId: appUserContext.appUser.userId,
    }));
    fetchTasks();
  }
}, [appUserContext, fetchTasks]);
  const addTask = async () => {
    const { task_title, task_priority, task_date, task_category } = taskInput;
    if (task_priority < 1 || task_priority > 10) {
      toast.error(
        "Priority must be between 1 and 10. Please check your inputs"
      );
      return;
    }
    if (!task_title || !task_priority || !task_date || !task_category) {
      toast.error(
        "Title, Priority, Date, and Category are mandatory. Please check your inputs"
      );
      return;
    }
    try {
      const taskUrl = `https://my-expense-tracker-backend.rishavkumaraug20005212.workers.dev/task?task_title=${taskInput.task_title}&task_category=${chosenCategory}&task_priority=${taskInput.task_priority}&task_date=${taskInput.task_date}&task_desc=${taskInput.task_desc}&userId=${appUserContext.appUser.userId}`;

      await axios.post(taskUrl);
      fetchTasks();
      toast.success("Task entry was added successfully!");
      setTaskInput(initialTaskInput);
    } catch (err) {
      toast.error("Failed to add task entry. Please check your inputs");
    }
  };

  const handleChangeCategory = (newCategory) => {
    setTaskInput({
      ...taskInput,
      task_category: newCategory,
    });
    setChosenCategory(newCategory);
  };

  //put any page behind login//
  if (!context.user?.uid || !appUserContext.appUser?.userId) {
    return <Navigate to="/signin" />;
  }

  return (
    <Container className="admin-container my-5">
      <h1 className="admin-heading custom-heading">Tasks And TO-DO'S</h1>
      <Row>
        <Col xs={12} md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title className="custom-card-title">
                Add New Task
              </Card.Title>
              <Form>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Title"
                    name="task_title"
                    value={taskInput.task_title}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="category">
                  <Form.Label className="mr-2">Category</Form.Label>
                  <Dropdown onSelect={handleChangeCategory}>
                    <Dropdown.Toggle
                      variant={categoryColors[chosenCategory]}
                      id="dropdown-basic"
                    >
                      {chosenCategory}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {Object.keys(categoryColors).map((category) => (
                        <Dropdown.Item eventKey={category} key={category}>
                          {category}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Group>

                <Form.Group controlId="priority">
                  <Form.Label>Task Priority</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    max="10"
                    placeholder="Enter Priority from 1 to 10"
                    name="task_priority"
                    value={taskInput.task_priority}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="date">
                  <Form.Label>Task Date 📅 </Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="task_date"
                    value={taskInput.task_date}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label>Task Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter Description"
                    name="task_desc"
                    value={taskInput.task_desc}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <div className="button-wrap">
                  <Button
                    variant="primary"
                    onClick={addTask}
                    className="full-width"
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6}>
          <h3>Your Added Tasks</h3>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search Here"
              aria-label="Search Here"
              onChange={handleSearchChange}
            />
            <button onClick={fetchTasks}>Search</button>
          </div>
          <Row xs={1} md={2}>
            {tasks.map((tasks, index) => (
              <Col xs={12} lg={6} key={index} className="mb-4">
                <Card
                  bg={categoryColors[tasks.task_category]}
                  text="white"
                  className="shadow-sm"
                >
                  <Card.Body>
                    <Card.Title>{tasks.task_title}</Card.Title>
                    <Card.Subtitle className="mb-2 ">
                      Category : {tasks.task_category}
                    </Card.Subtitle>
                    <Card.Text>
                      <strong>Task Date :</strong> {tasks.task_date}
                      <br />
                      <strong>Task Priority :</strong> {tasks.task_priority}
                      <br />
                      <strong>Description:</strong> {tasks.task_desc}
                      <br />
                      <br />
                      <strong>Created on :</strong> {tasks.task_creation_date}
                      <br />
                      <strong>Task Id:</strong> {tasks.task_id}
                    </Card.Text>
                    <br />
                    <div className="delete-icon">
                      <MdDeleteForever
                        onClick={() => handleDeletePopup(tasks)}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          {showDeleteModal && (
            <DeleteTaskModal
              show={showDeleteModal}
              handleClose={handleCloseDeleteModal}
              task={taskBeingDeleted}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Tasks;
