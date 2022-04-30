import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { FaCalendarAlt } from "react-icons/fa";

export default function Custom_Card({ cardtitle, message }) {
    return (
        <Card border="secondary">
            <Card.Body>
                <Row>
                    <Col xs={8} md={8}>
                        <small className='text-capitalize'>
                            {cardtitle}
                        </small>
                        <h5>{message}</h5>
                    </Col>
                    <Col xs={4} md={4} className="d-flex align-items-center justify-content-center">
                        <FaCalendarAlt size={40} className="text-secondary" />
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}
