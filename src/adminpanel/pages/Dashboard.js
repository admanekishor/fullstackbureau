
import Clientvisits from './Clients/Clientvisits';
import InfoCards from './InfoCards';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CustomTable from '../component/CustomTable';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import React from 'react';
import DatePicker from 'react-datepicker';
import CustomModal from '../component/CustomModal';
import { FaCheck } from 'react-icons/fa';
import AddService from './Clients/AddService';

const MainURL = "http://www.muktainursesbureau.in/API";

export default function Dashboard() {
  const [Visits, setVisits] = useState([]);
  const [clients, setClients] = useState([]);
  // const [Visit, setVisit] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [selectedVisitId, setSelectedVisitId] = useState(null);
  const [endDate, setendDate] = useState(new Date());
  const [includeEndDate, setIncludeEndDate] = useState(false);
  // const [employees, setEmployees] = useState([]);
  // const [billings, setBillings] = useState([]);
  // for client add visit
  const [AddServiceModal, setAddServiceModal] = useState(false);
  const [clientUpdate, setClientUpdate] = useState({});
  const [activeClient, setactiveClient] = useState([]);
  const [InactiveClient, setInactiveClient] = useState([]);
  const [Client, setClient] = useState([]);
  const [PrevData, setPrevData] = useState([]);

  useEffect(() => {
    let isMounted = true;

    axios.get('http://www.muktainursesbureau.in/API/clientvisit.php')
      .then(res => {
        if (isMounted) setVisits(res.data);
      });

    axios.get(MainURL + '/' + 'clients.php').then((res) => {
      if (isMounted) {
        setClients(res.data)
        setIsLoading(false)
      }
    })

    // axios.get("/api/employees").then((res) => setEmployees(res.data));
    // axios.get("/api/billings").then((res) => setBillings(res.data));

    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    getClientdata()
  }, [])

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
  const getPrevData = useCallback(async (client) => {
    {
      console.log("props", client)
      const Prevdata = { clientId: client }
      // console.log("PrevdataApi", Prevdata)

      await axios.post(MainURL + '/' + 'selectedclientvisit.php', Prevdata).then((res) => {
        console.log("Prevdata", res.data);

        if (res.data) {
          res.data.map((item) => {
            setPrevData(item)
          })

        }
      })
      // console.log("PrevData", PrevData)
    }
  },
    [PrevData],)

  async function getClientdata() {
    setIsLoading(true)

    await axios.get(MainURL + '/' + 'clients.php').then((res) => {
      setClient(res.data)
      // console.log("client", Client);
      setIsLoading(false)
    })
    // await axios.get('http://www.muktainursesbureau.in/API//activeclients').then((resII) => {
    await axios.get(MainURL + '/' + 'activeclients.php').then((resII) => {

      if (resII.data) {

        setactiveClient(resII.data)
        setIsLoading(false)
      } else {

        setactiveClient([])
      }
    })
    await axios.get(MainURL + '/' + 'InActiveClients.php').then((resIII) => {
      setInactiveClient(resIII.data)
      // console.log("client", Client);
      setIsLoading(false)
    })
  }

  const afterclose = () => {
    setTimeout(() => {
      // setnewclientmodalShow(false);
      // setUpdateClientModal(false);
      // setDeleteClientModal(false);
      setAddServiceModal(false);
      // setActivateClientModal(false);
    }, 100);
  }
  return <>

    <Row className='mt-4 mb-4'>
      <Col>
        <h4>Dashboard</h4>
      </Col>
      <Col className='text-end'>
        <p><label>Home</label> / <label>Dashboard</label></p>
      </Col>
    </Row>

    <Row>
      <Col>

        <InfoCards />
      </Col>
    </Row>
    <br />
    <Row>
      <Col lg={6} md={12}>
        <CustomTable
          title="Client Visits"
          data={Visits}
          columns={["client_name", "start_date", "staff_name"]} // only these columns
          actions={[

            {
              label: "Close Visit",
              onClick: (row) => { setSelectedVisitId(row.id); setModalShow(true); },
              className: "btn btn-sm btn-danger",
            },
          ]}
        />

      </Col>
      <Col lg={6} md={12}>
        <CustomTable
          title="Clients"
          data={clients}
          columns={["name"]} // only these columns
          actions={[
            {
              label: <FaCheck size={15} />,
              onClick: (row) => {
                setClientUpdate(row.id);
                setAddServiceModal(true);
                getPrevData(row.id)
              },
              className: (row) => activeClient.map(item => item.id).includes(row.id) ? "btn btn-sm btn-danger" : "btn btn-sm btn-primary",
            },
            {
              label: "Edit",
              onClick: (row) => console.log("Edit", row.id),
              className: "btn btn-sm btn-warning",
            },
            {
              label: "Delete",
              onClick: (row) => console.log("Delete", row.id),
              className: "btn btn-sm btn-danger",
            },
          ]}
        />
        {/* <CustomTable
              title="Employees"
              data={employees}
              columns={["id", "name", "department"]} // only these columns
            />
            <CustomTable
              title="Billings"
              data={billings}
              columns={["id", "clientName", "amount"]} // only these columns
            /> */}
      </Col>
    </Row>
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
    <CustomModal
      data={{ title: "Activate Service", component: <AddService getClientdata={getClientdata} setClientUpdate={setClientUpdate} clientUpdate={clientUpdate} getPrevData={getPrevData} PrevData={PrevData} afterclose={afterclose} /> }}
      show={AddServiceModal}
      onHide={() => setAddServiceModal(false)}
      modalsize="md"

    />
  </>;
}
