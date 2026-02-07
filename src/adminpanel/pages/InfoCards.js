import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Custom_Card from '../component/Custom_Card'

export default function InfoCards({ VisitsCount }) {
    // const [carddata, SetCardData] = useState([{
    //     title: '', price: '',

    // }])
    //console.log("VisitsCount", VisitsCount);

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
            name: "Calls",
            price: VisitsCount
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
                        return <Col xs={12} md={6} lg={3} key={i}>
                            <Custom_Card cardtitle={item.name} message={item.price} />
                        </Col>
                    })
                }

            </Row>
        </>
    )
}
