import React, { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faEnvelope,
  faUnlockAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  FormCheck,
  Container,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { useHistory } from "react-router-dom";

import BgImage from "../../assets/img/signin.svg";
import { useLoginMutation } from "../../composers/login";
import { auth } from "../../context/auth";

export default () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [login] = useLoginMutation();
  const history = useHistory();

  const onChangeUsername = useCallback((event) => {
    setMessage("");
    setUsername(event.target.value);
  }, []);

  const onChangePassword = useCallback((event) => {
    setMessage("");
    setPassword(event.target.value);
  }, []);

  const onLogin = async () => {
    try {
      const results = await login({
        data: {
          email: username,
          password,
        },
      });

      auth.login(results.data, results.data.token);
      history.push("/");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row
            className="justify-content-center form-bg-image"
            style={{ backgroundImage: `url(${BgImage})` }}
          >
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">登陆</h3>
                </div>
                <Form className="mt-4">
                  <Form.Group id="username" className="mb-4">
                    <Form.Label>账号</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control
                        autoFocus
                        required
                        placeholder="账号"
                        type="text"
                        value={username}
                        onChange={onChangeUsername}
                        isInvalid={!!message}
                      />
                      <Form.Control.Feedback type="invalid" />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>密码</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control
                          required
                          type="password"
                          placeholder="密码"
                          value={password}
                          onChange={onChangePassword}
                          isInvalid={!!message}
                        />
                        {!!message && (
                          <Form.Control.Feedback type="invalid">
                            {message}
                          </Form.Control.Feedback>
                        )}
                      </InputGroup>
                    </Form.Group>
                  </Form.Group>
                  <Button variant="primary" className="w-100" onClick={onLogin}>
                    登陆
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
