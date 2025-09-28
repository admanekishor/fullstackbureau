import { React, useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import { IoClose } from 'react-icons/io5';
import CustomModal from '../../component/CustomModal';
import axios from 'axios';
import CustomTable from '../../component/CustomTable';

const ClientVisits = () => {
    const [Visits, setVisits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    const [selectedVisitId, setSelectedVisitId] = useState(null);
    const [endDate, setendDate] = useState(new Date());
    const [includeEndDate, setIncludeEndDate] = useState(false);

    // Helper function to calculate days between two dates
    // const calculateDays = (start, end, includeEnd) => {
    //     if (!start || !end) return 0;
    //     const startDate = new Date(start);
    //     const endDate = new Date(end);
    //     const diffTime = endDate - startDate;
    //     let days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    //     if (includeEnd && days >= 0) days += 1;
    //     return days;
    // };

    useEffect(() => {
        // Fetch data here and setVisit, setIsLoading(false) when done
        // Example:
        axios.get('http://www.muktainursesbureau.in/API/clientvisit.php')
            .then(res => {
                setVisits(res.data);
                setIsLoading(false);
            });
    }, []);

    const updateenddate = () => {
        if (!selectedVisitId) {
            alert('No visit selected');
            return;
        }
        let finalEndDate = new Date(endDate);
        if (includeEndDate) {
            finalEndDate.setDate(finalEndDate.getDate() + 1);
        }
        axios.post('http://www.muktainursesbureau.in/API/updateclientvisit.php', {
            visitId: selectedVisitId,
            endDate: finalEndDate.toISOString().slice(0, 10) // format as YYYY-MM-DD
        })
            .then(res => {
                // Optionally show a success message
                setModalShow(false);
                // Refresh the visit data
                axios.get('http://www.muktainursesbureau.in/API/clientvisit.php')
                    .then(res => {
                        setVisits(res.data);
                        setIsLoading(false);
                    });
            })
            .catch(err => {
                alert('Failed to update end date');
                setModalShow(false);
            });
    };

    return (
        <div className="text-center">
            {/* <Button size='sm' onClick={() => setModalShow(true)}>+</Button> */}

            {isLoading ? <img src={require('../../../assets/images/loader.gif')} width="5%" alt="Loading..." /> :
                <CustomTable
                    title="Client Visits"
                    data={Visits}
                    columns={["client_name", "client_address", "staff_name", "spaciality_name", "start_date"]} // only these columns
                    actions={[

                        {
                            label: "Close Visit",
                            onClick: (row) => { setSelectedVisitId(row.id); setModalShow(true); },
                            className: "btn btn-sm btn-danger",
                        },
                    ]}
                />
            }
            {/* Render CustomModal only once, outside the map, using selectclint */}
            <CustomModal
                data={{
                    title: "Select End Date", component: (
                        <>
                            <Row className="align-items-center">
                                <Col xs={3} md={2}>
                                    <label>Date</label>
                                </Col>
                                <Col xs={6} md={5}>
                                    <DatePicker
                                        placeholderText="Enter End Date"
                                        dateFormat="dd/MM/yyyy"
                                        className="form-control"
                                        selected={endDate}
                                        onChange={(date) => setendDate(date)}
                                    />
                                </Col>
                                <Col xs={3} md={5}>
                                    <div className="form-check form-switch mb-3 d-flex justify-content-center align-items-center">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="includeEndDateChkbox"
                                            checked={includeEndDate}
                                            onChange={() => setIncludeEndDate(!includeEndDate)}
                                        />
                                        <label className="form-check-label ms-2" htmlFor="includeEndDateCheckbox">
                                            Include End Date
                                        </label>
                                    </div>
                                </Col>
                            </Row>
                            <hr />
                            <Button className='float-end'
                                onClick={() => {
                                    updateenddate();
                                }}
                            >
                                Submit
                            </Button>
                        </>
                    )
                }}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    )
}

export default ClientVisits;
