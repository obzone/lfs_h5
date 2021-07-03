import React from "react";
import moment from "moment-timezone";
import { Row, Col, Card } from "@themesberg/react-bootstrap";

export default (props) => {
  const currentYear = moment().get("year");

  return (
    <div>
      <footer className="footer section py-5">
        <Row>
          <Col xs={12} lg={6} className="mb-4 mb-lg-0">
            <p className="mb-0 text-center text-xl-left">
              Copyright © 2021-{`${currentYear} `}
              <Card.Link
                href="https://www.feellife.com.cn"
                target="_blank"
                className="text-blue text-decoration-none fw-normal"
              >
                来福士
              </Card.Link>
            </p>
          </Col>
          <Col xs={12} lg={6}>
            <ul className="list-inline list-group-flush list-group-borderless text-center text-xl-right mb-0">
              <li className="list-inline-item px-0 px-sm-2">
                <Card.Link
                  href="https://www.feellife.com.cn/about-us_d1"
                  target="_blank"
                >
                  About
                </Card.Link>
              </li>
              <li className="list-inline-item px-0 px-sm-2">
                <Card.Link
                  href="https://www.feellife.com.cn/mesh-nebulizer_c1"
                  target="_blank"
                >
                  MESH NEBULIZER
                </Card.Link>
              </li>
              <li className="list-inline-item px-0 px-sm-2">
                <Card.Link
                  href="https://www.feellife.com.cn/nebu-liquid_c2"
                  target="_blank"
                >
                  NEBU-LIQUID
                </Card.Link>
              </li>
              <li className="list-inline-item px-0 px-sm-2">
                <Card.Link
                  href="https://www.feellife.com.cn/contact-us_d2"
                  target="_blank"
                >
                  Contact
                </Card.Link>
              </li>
            </ul>
          </Col>
        </Row>
      </footer>
    </div>
  );
};
