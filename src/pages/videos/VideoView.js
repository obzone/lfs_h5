import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useGetKnowledgeQuery } from "../../composers/knowledge";
import Loading from "../../components/Loading";

import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";

export default () => {
  const { id } = useParams();
  const history = useHistory();
  const [knowledge = {}, loading, error] = useGetKnowledgeQuery(id);
  const { title, abstract, subtitle, cover, body } = knowledge;
  return (
    <>
      <Row>
        <Col xs={12} xl={8}>
          {loading ? (
            <Loading />
          ) : (
            <Card border="light" className="bg-white shadow-sm mb-4">
              <Card.Body>
                <Form>
                  <Row>
                    <Col md={12} className="mb-3">
                      <Form.Group id="title">
                        <Form.Label>
                          <h1>{title}</h1>
                        </Form.Label>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12} className="mb-3">
                      <Form.Group id="subtitle">
                        <Form.Label>
                          <h2>{subtitle}</h2>
                        </Form.Label>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12} className="mb-3">
                      <Form.Group id="abstract">
                        <Form.Label>{abstract}</Form.Label>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12} className="mb-3">
                      <Form.Group id="body">
                        <Form.Label
                          dangerouslySetInnerHTML={{ __html: body }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="mt-3">
                    <Button
                      variant="primary"
                      className="me-2"
                      onClick={history.goBack}
                    >
                      返回
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </>
  );
};
