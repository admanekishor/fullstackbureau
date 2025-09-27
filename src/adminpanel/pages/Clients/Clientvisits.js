import { React, useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IoClose } from 'react-icons/io5';
import CustomModal from '../../component/CustomModal';
import axios from 'axios';

const ClientVisits = () => {
    const [Visit, setVisit] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    const [selectedVisitId, setSelectedVisitId] = useState(null);
    const [endDate, setendDate] = useState(new Date());
    const [includeEndDate, setIncludeEndDate] = useState(false);

    // Helper function to calculate days between two dates
    const calculateDays = (start, end, includeEnd) => {
        if (!start || !end) return 0;
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffTime = endDate - startDate;
        let days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        if (includeEnd && days >= 0) days += 1;
        return days;
    };

    useEffect(() => {
        // Fetch data here and setVisit, setIsLoading(false) when done
        // Example:
        axios.get('http://www.muktainursesbureau.in/API/clientvisit.php')
            .then(res => {
                setVisit(res.data);
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
                        setVisit(res.data);
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
                <Table striped bordered hover size="sm" responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Client Name</th>
                            <th>Address</th>
                            <th>Staff Name</th>
                            <th>spaciality name</th>
                            <th>start date</th>
                            {/* <th>End date</th> */}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Visit.map((record, i) => {
                                var st = record.start_date.split(/[- :]/);
                                var setdate = new Date(Date.UTC(st[0], st[1] - 1, st[2], st[3], st[4], st[5]));
                                // Calculate days for display
                                let endDateValue = record.end_date ? new Date(Date.UTC(...record.end_date.split(/[- :]/).map((v, idx) => idx === 1 ? v - 1 : +v))) : null;
                                let daysCount = record.end_date
                                    ? calculateDays(record.start_date, record.end_date, includeEndDate)
                                    : '-';
                                return (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{record.client_name}</td>
                                        <td>{record.client_address}</td>
                                        <td>{record.staff_name}</td>
                                        <td>{record.spaciality_name}</td>
                                        <td>
                                            <DatePicker
                                                disabled
                                                dateFormat="dd/MM/yyyy"
                                                className='form-control btn btn-sm btn-danger'
                                                selected={setdate}
                                            />
                                        </td>
                                        <td>
                                            <Button className='btn btn-sm w-100'
                                                title="End" onClick={() => {
                                                    setSelectedVisitId(record.id || record.visitId); // Use the correct key for your data
                                                    if (record.end_date) {
                                                        var et = record.end_date.split(/[- :]/);
                                                        setendDate(new Date(Date.UTC(et[0], et[1] - 1, et[2], et[3], et[4], et[5])));
                                                    } else {
                                                        setendDate(new Date());
                                                    }
                                                    setModalShow(true);
                                                }}><IoClose size={20} /></Button>
                                            {/* Show day count if end date exists */}
                                            {record.end_date && (
                                                <div className="mt-2 small text-muted">Days: {daysCount}</div>
                                            )}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
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
