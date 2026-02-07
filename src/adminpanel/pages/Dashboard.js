
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
import UpdateClients from './Clients/UpdateClient';
import DeleteClient from './Clients/DeleteClient';
import ClientRecord from './Clients/ClientRecord';
import API_URLS from '../../api/api';

export default function Dashboard() {
  const [VisitsCount, setVisitsCount] = useState([0]);
  const [Visits, setVisits] = useState([]);
  const [clients, setClients] = useState([]);
  const [Bills, setBills] = useState([]);
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
  const [PrevData, setPrevData] = useState({});
  const [UpdateClientModal, setUpdateClientModal] = useState(false);
  const [DeleteClientModal, setDeleteClientModal] = useState(false);
  const [setActivateClientModal] = useState(false);
  // for client billing record
  const [ClientRecordmodalShow, setClientRecordModalShow] = useState(false);
  const [GetClientId, setGetClientId] = useState(null);

  useEffect(() => {
    let isMounted = true;

    axios.get(API_URLS.totalActiveClients)
      .then(res => {
         setVisitsCount(Number(res.data.total_active_clients));
      });
    axios.get(API_URLS.clientVisit)
      .then(res => {
        if (isMounted) setVisits(res.data);
      });

    axios.get(API_URLS.clients).then((res) => {
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
    axios.post(API_URLS.updateClientVisit, {
      visitId: selectedVisitId,
      endDate: finalEndDate.toISOString().slice(0, 10) // format as YYYY-MM-DD
    })
      .then(res => {
        // Optionally show a success message
        setModalShow(false);
        // Refresh the visit data
        axios.get(API_URLS.clientVisit)
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
    if (!client) {
      setPrevData({});
      return;
    }
    const clientId = client.id ?? client.client_id ?? client;
    if (!clientId) {
      setPrevData({});
      return;
    }

    const payload = { clientId };
    try {
      const res = await axios.post(API_URLS.SelectedClientVisit, payload);
      // Prefer first item when API returns an array, otherwise use object
      if (Array.isArray(res.data) && res.data.length > 0) {
        setPrevData(res.data[0]);
      } else if (res.data && typeof res.data === 'object') {
        setPrevData(res.data);
      } else {
        setPrevData({});
      }
    } catch (err) {
      console.error('getPrevData error', err);
      setPrevData({});
    }
  }, []);
  // get client billing
  useEffect(() => {
    setIsLoading(true)
    axios.get(API_URLS.Quickbilling).then((res) => {
      setBills(res.data.result)
      setIsLoading(false)
    })

  }, [])
  async function getClientdata() {
    setIsLoading(true)

    await axios.get(API_URLS.clients).then((res) => {
      setClient(res.data)
      // console.log("client", Client);
      setIsLoading(false)
    })
    // await axios.get('http://www.muktainursesbureau.in/API//activeclients').then((resII) => {
    await axios.get(API_URLS.ActiveClients).then((resII) => {

      if (resII.data) {

        setactiveClient(resII.data)
        setIsLoading(false)
      } else {

        setactiveClient([])
      }
    })
    await axios.get(API_URLS.inActiveClients).then((resIII) => {
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

        <InfoCards VisitsCount={VisitsCount} />
      </Col>
    </Row>
    <br />
    <Row>
      <Col lg={5} md={12}>
        {isLoading ? <img src={require('../../assets/images/loader.gif')} width="5%" /> : <CustomTable
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
        }

      </Col>
      <Col lg={4} md={12}>
        {isLoading ? <img src={require('../../assets/images/loader.gif')} width="5%" /> :
          <CustomTable
            title="Clients"
            data={clients}
            columns={["name"]} // only these columns
            actions={[
              {
                label: <FaCheck size={15} />,
                onClick: (row) => {
                  setClientUpdate(row);
                  getPrevData(row);
                  setAddServiceModal(true);
                },
                className: (row) => activeClient.map(item => item.id).includes(row.id) ? "btn btn-sm btn-danger" : "btn btn-sm btn-primary",
              },
              {
                label: "Edit",
                onClick: (row) => {
                  setClientUpdate(row);
                  setUpdateClientModal(true);
                },
                className: "btn btn-sm btn-warning",
              },
              {
                label: "Delete",
                onClick: (row) => {
                  setClientUpdate(row);
                  setDeleteClientModal(true);
                },
                className: "btn btn-sm btn-danger",
              },
            ]}
          />
        }

      </Col>
      <Col lg={3} md={12}>
        {isLoading ? <img src={require('../../assets/images/loader.gif')} width="5%" /> :
          <CustomTable
            title="Billings"
            data={Bills}
            columns={["client_name"]} // only these columns
            renderers={{
              client_name: (row) => (
                <span
                  style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
                  onClick={() => {
                    setGetClientId(row.clientbillid);
                    setClientRecordModalShow(true);
                  }}
                >
                  {row.client_name}
                </span>
              ),
            }}
          // actions={[
          //   {
          //     label: "View",
          //     onClick: (row) => { alert('View billing for ' + row.clientName); },
          //     className: "btn btn-sm btn-primary",
          //   }
          // ]}
          />
        }
      </Col>
    </Row>
    {/* Custom Models for Close Client Visit*/}
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
    {/* Custom Model for Activate Client Visit */}
    <CustomModal
      data={{ title: "Activate Service", component: <AddService getClientdata={getClientdata} setClientUpdate={setClientUpdate} clientUpdate={clientUpdate} getPrevData={getPrevData} PrevData={PrevData} afterclose={afterclose} /> }}
      show={AddServiceModal}
      onHide={() => setAddServiceModal(false)}
      modalsize="md"

    />
    {/* Custom Model for update Client Details */}
    <CustomModal
      data={{ title: "Update Client", component: <UpdateClients getClientdata={getClientdata} setClientUpdate={setClientUpdate} clientUpdate={clientUpdate} afterclose={afterclose} /> }}
      show={UpdateClientModal}
      onHide={() => setUpdateClientModal(false)}
    />
    {/* Custom Model for Delete Client */}
    <CustomModal
      data={{ title: "Delete Client", component: <DeleteClient getClientdata={getClientdata} setClientUpdate={setClientUpdate} clientUpdate={clientUpdate} afterclose={afterclose} /> }}
      show={DeleteClientModal}
      onHide={() => setDeleteClientModal(false)}
      modalsize="md"

    />
    {/* Custom Model for client Billing Record */}
    <CustomModal
      data={{ title: "Show Client month of work Details", component: <ClientRecord GetClientId={GetClientId} /> }}
      show={ClientRecordmodalShow}
      onHide={() => setClientRecordModalShow(false)}
      modalsize="lg"
    />
  </>;
}
