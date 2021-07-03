import React from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "@themesberg/react-bootstrap";
import { GeneralInfoForm } from "../../components/Forms";
import Loading from "../../components/Loading";

import { useGetKnowledgeQuery } from "../../composers/knowledge";

export default () => {
  const { id } = useParams();
  const [knowledge = {}, loading, error] = useGetKnowledgeQuery(id);

  return (
    <>
      <Row>
        <Col xs={12} xl={8}>
          {loading ? <Loading /> : <GeneralInfoForm knowledge={knowledge} />}
        </Col>
      </Row>
    </>
  );
};
