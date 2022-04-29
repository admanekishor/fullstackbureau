import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Custom_Card from '../components/Custom_Card'

export default function InfoCards() {
    // const [carddata, SetCardData] = useState([{
    //     title: '', price: '',

    // }])
    var obj = [
        {
            name: "Earnings(Monthly)",
            price: "$40,000"
        },
        {
            name: "Earnings(ANNUAL)",
            price: "$215,000"
        },
        {
            name: "TASKS",
            price: "50%"
        },
        {
            name: "PENDING REQUESTS",
            price: "18 "
        }
    ]

    return (
        <>
            <Row>

                {
                    obj.map((item, i) => {
                        return <Col xs={12} md={6} lg={3}>
                            <Custom_Card key={i} cardtitle={item.name} message={item.price} />
                        </Col>
                    })
                }

            </Row>
        </>
    )
}
