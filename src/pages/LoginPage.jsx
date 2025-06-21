import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import SvgIcon from "../assets/SvgIcon";
import "bootstrap-icons/font/bootstrap-icons.css";

const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be 8+ characters, include 1 capital letter, 1 number, and 1 symbol"
      );
      return;
    }
    dispatch(login());
    navigate("/home");
  };

  return (
    <Container>
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col md={6} lg={6} style={{ padding: "15%" }}>
          <h2>Sign In</h2>
          <p>
            New user? <a href="#">Create an account</a>
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Control
                type="email"
                placeholder="Username or email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            {error && <p className="text-danger mt-2">{error}</p>}
            <Form.Check
              type="checkbox"
              label="Keep me signed in"
              className="mt-3"
            />
            <Button type="submit" className="w-100 mt-3 custom-signin-btn">
              Sign In
            </Button>

            <div className="d-flex align-items-center my-4">
              <div
                style={{ flex: 1, height: "1px", backgroundColor: "black" }}
              />
              <span
                className="mx-3 text-muted"
                style={{ whiteSpace: "nowrap" }}
              >
                or sign in with
              </span>
              <div
                style={{ flex: 1, height: "1px", backgroundColor: "black" }}
              />
            </div>

            <div className="d-flex justify-content-between gap-2 mt-2">
              <Button variant="outline-dark" className="social-icon-button">
                <i className="bi bi-google"></i>
              </Button>
              <Button variant="outline-dark" className="social-icon-button">
                <i className="bi bi-github"></i>
              </Button>
              <Button variant="outline-dark" className="social-icon-button">
                <i className="bi bi-facebook"></i>
              </Button>
              <Button variant="outline-dark" className="social-icon-button">
                <i className="bi bi-linkedin"></i>
              </Button>
            </div>
          </Form>
        </Col>
        <Col
          md={6}
          lg={6}
          className="text-center d-none d-md-block login-svg-container"
        >
          <SvgIcon />
        </Col>
      </Row>
    </Container>
  );
}
