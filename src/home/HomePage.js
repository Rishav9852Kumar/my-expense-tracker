import React, { useState, useEffect } from "react";
import axios from "axios";
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
import "./HomePage.css";
const HomePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [chosenCategory, setChosenCategory] = useState("Food"); // Default category
  const [expenseInput, setExpenseInput] = useState({
    expense_title: "",
    expense_category: "",
    expense_amount: "",
    expense_desc: "",
    star_marked: false,
    userId: 1, // Assuming userId as 1 for now
  });

  const categoryColors = {
    Food: "success",
    Recharge: "secondary", // Gray
    Travel: "primary", // Blue
    Transfers: "warning", // Yellow
    Lending : "info",
    Miscellaneous: "danger", // Red
  };

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        `https://my-expense-tracker-backend.rishavkumaraug20005212.workers.dev/event?userId=${1}&count=${6}`
      );
      setExpenses(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (event) => {
    setExpenseInput({
      ...expenseInput,
      [event.target.name]: event.target.value,
    });
  };

  const addExpense = async () => {
    const { expense_title, expense_amount } = expenseInput;

    if (!expense_title || !expense_amount) {
      toast.error("Title and Amount are mandatory. Please check your inputs");
      return;
    }
    try {
      const expenseUrl = `https://my-expense-tracker-backend.rishavkumaraug20005212.workers.dev/event?expense_title=${expenseInput.expense_title}&expense_category=${chosenCategory}&expense_amount=${expenseInput.expense_amount}&expense_desc=${expenseInput.expense_desc}&star_marked=${expenseInput.star_marked}&userId=${expenseInput.userId}`;

      await axios.post(expenseUrl);
      fetchExpenses();
      toast.success("Expense entry was added successfully!");
    } catch (err) {
      toast.error("Failed to add expense entry. Please check your inputs");
    }
  };
  const handleChangeCategory = (newCategory) => {
    setExpenseInput({
      ...expenseInput,
      expense_category: newCategory,
    });
    setChosenCategory(newCategory);
  };
  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <Container className="admin-container my-5">
      <h1 className="admin-heading">Expenses</h1>
      <Row>
        <Col xs={12} md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Add New Expense</Card.Title>
              <Form>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Title"
                    name="expense_title"
                    value={expenseInput.expense_title}
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

                <Form.Group controlId="amount">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Amount"
                    name="expense_amount"
                    value={expenseInput.expense_amount}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="description">
                  <Form.Label>Expense Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter Description"
                    name="expense_desc"
                    value={expenseInput.expense_desc}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <div className="button-wrap">
                  <Button
                    variant="primary"
                    onClick={addExpense}
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
          <h3>Recent Expenses</h3>
          <Row xs={1} md={2}>
            {expenses.map((expense, index) => (
              <Col xs={12} lg={6} key={index} className="mb-4">
                <Card
                  bg={categoryColors[expense.expense_category]}
                  text="white"
                  className="shadow-sm"
                >
                  <Card.Body>
                    <Card.Title>{expense.expense_title}</Card.Title>
                    <Card.Subtitle className="mb-2 ">
                      {expense.expense_category}
                    </Card.Subtitle>
                    <Card.Text>
                      <br />
                      <strong>Expense Id:</strong> {expense.expense_id}
                      <br />
                      <br />
                      <strong>Created on :</strong>{" "}
                      {expense.expense_creation_date}
                      <br />
                      <strong>Description:</strong> {expense.expense_desc}
                      <br />
                      <strong>Amount:</strong> {expense.expense_amount}
                      <br />
                      <strong>User ID:</strong> {expense.userId}
                      <br />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
