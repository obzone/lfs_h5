import React from "react";
import { Card, Row, Col } from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";

import { useGetKnowledgesQuery } from "../composers/knowledge";
import Loading from "../components/Loading";
import Image from "../components/Image";

export const VideosTable = () => {
  const [data = [], loading, error, getKnowledges] = useGetKnowledgesQuery();

  const TableRow = (props) => {
    const { _id, title, cover } = props;
    return (
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <Card.Link
            as={Link}
            to={`videos/view/${_id}`}
            className="fw-normal"
            style={{ fontSize: "2rem" }}
          >
            <Row>
              <Col md={12} className="mb-3">
                <Image src={cover} style={{ width: "100%", height: "auto" }} />

                {title}
              </Col>
            </Row>
          </Card.Link>
        </Card.Body>
      </Card>
    );
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {data.map((t, idx) => (
            <TableRow key={`transaction-${idx}`} idx={idx} {...t} />
          ))}
          <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
            <small className="fw-bold">
              共 <b>{!!data && data.length}</b> 条数据
            </small>
          </Card.Footer>
        </>
      )}
    </>
  );
};
