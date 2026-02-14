import InfoCards from './InfoCards';
import { Row, Col, Button } from 'react-bootstrap';
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
  const [visitsCount, setVisitsCount] = useState(0);
  const [visits, setVisits] = useState([]);
  const [clients, setClients] = useState([]);
  const [bills, setBills] = useState([]);
  const [activeClient, setActiveClient] = useState([]);
  const [inactiveClient, setInactiveClient] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [modalShow, setModalShow] = useState(false);
  const [selectedVisitId, setSelectedVisitId] = useState(null);
  const [endDate, setEndDate] = useState(new Date());
  const [includeEndDate, setIncludeEndDate] = useState(false);

  const [addServiceModal, setAddServiceModal] = useState(false);
  const [updateClientModal, setUpdateClientModal] = useState(false);
  const [deleteClientModal, setDeleteClientModal] = useState(false);
  const [clientRecordModalShow, setClientRecordModalShow] = useState(false);

  const [clientUpdate, setClientUpdate] = useState({});
  const [prevData, setPrevData] = useState({});
  const [getClientId, setGetClientId] = useState(null);

  // ===============================
  // INITIAL LOAD
  // ===============================
  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setIsLoading(true);

      const [
        totalClientsRes,
        visitsRes,
        clientsRes,
        activeClientsRes,
        inactiveClientsRes,
        billingRes
      ] = await Promise.all([
        axios.get(API_URLS.totalActiveClients),
        axios.get(API_URLS.clientVisit),
        axios.get(API_URLS.clients),
        axios.get(API_URLS.ActiveClients),
        axios.get(API_URLS.inActiveClients),
        axios.get(API_URLS.Quickbilling)
      ]);

      setVisitsCount(Number(totalClientsRes.data.total_active_clients));
      setVisits(visitsRes.data);
      setClients(clientsRes.data);
      setActiveClient(activeClientsRes.data || []);
      setInactiveClient(inactiveClientsRes.data || []);
      setBills(billingRes.data.result || []);
    } catch (error) {
      console.error("Dashboard load error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ===============================
  // UPDATE VISIT END DATE
  // ===============================
  const updateEndDate = async () => {
    if (!selectedVisitId) {
      alert('No visit selected');
      return;
    }

    try {
      let finalDate = new Date(endDate);
      if (includeEndDate) {
        finalDate.setDate(finalDate.getDate() + 1);
      }

      await axios.post(API_URLS.updateClientVisit, {
        visitId: selectedVisitId,
        endDate: finalDate.toISOString().slice(0, 10)
      });

      setModalShow(false);
      loadDashboard();
    } catch (error) {
      alert("Failed to update end date");
    }
  };

  // ===============================
  // GET PREVIOUS VISIT DATA
  // ===============================
  const getPrevData = useCallback(async (client) => {
    if (!client) return setPrevData({});

    const clientId = client.id ?? client.client_id ?? client;
    if (!clientId) return setPrevData({});

    try {
      const res = await axios.post(API_URLS.SelectedClientVisit, { clientId });

      if (Array.isArray(res.data) && res.data.length > 0) {
        setPrevData(res.data[0]);
      } else {
        setPrevData(res.data || {});
      }
    } catch (error) {
      console.error("getPrevData error:", error);
      setPrevData({});
    }
  }, []);

  // ===============================
  // AFTER MODAL CLOSE
  // ===============================
  const afterClose = () => {
    setTimeout(() => {
      setAddServiceModal(false);
      loadDashboard();
    }, 100);
  };

  // ===============================
  // RENDER
  // ===============================
  return (
    <>
      <Row className='mt-4 mb-4'>
        <Col><h4>Dashboard</h4></Col>
        <Col className='text-end'>
          <p><label>Home</label> / <label>Dashboard</label></p>
        </Col>
      </Row>

      <Row>
        <Col>
          <InfoCards VisitsCount={visitsCount} />
        </Col>
      </Row>

      <br />

      <Row>
        {/* ================= CLIENT VISITS ================= */}
        <Col lg={5}>
          {isLoading ? (
            <img src={require('../../assets/images/loader.gif')} width="5%" />
          ) : (
            <CustomTable
              title="Client Visits"
              data={visits}
              columns={["client_name", "start_date", "staff_name"]}
              actions={[
                {
                  label: "Close Visit",
                  onClick: (row) => {
                    setSelectedVisitId(row.id);
                    setModalShow(true);
                  },
                  className: "btn btn-sm btn-danger",
                }
              ]}
            />
          )}
        </Col>

        {/* ================= CLIENTS ================= */}
        <Col lg={4}>
          {isLoading ? (
            <img src={require('../../assets/images/loader.gif')} width="5%" />
          ) : (
            <CustomTable
              title="Clients"
              data={clients}
              columns={["name"]}
              actions={[
                {
                  label: <FaCheck size={15} />,
                  onClick: (row) => {
                    setClientUpdate(row);
                    getPrevData(row);
                    setAddServiceModal(true);
                  },
                  className: (row) =>
                    activeClient.map(item => item.id).includes(row.id)
                      ? "btn btn-sm btn-danger"
                      : "btn btn-sm btn-primary",
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
                }
              ]}
            />
          )}
        </Col>

        {/* ================= BILLING ================= */}
        <Col lg={3}>
          {isLoading ? (
            <img src={require('../../assets/images/loader.gif')} width="5%" />
          ) : (
            <CustomTable
              title="Billings"
              data={bills}
              columns={["client_name"]}
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
                )
              }}
            />
          )}
        </Col>
      </Row>

      {/* ================= CLOSE VISIT MODAL ================= */}
      <CustomModal
        data={{
          title: "Select End Date",
          component: (
            <>
              <Row>
                <Col md={6}>
                  <DatePicker
                    className="form-control"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="dd/MM/yyyy"
                  />
                </Col>
                <Col md={6}>
                  <div className="form-check form-switch">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={includeEndDate}
                      onChange={() => setIncludeEndDate(!includeEndDate)}
                    />
                    <label className="form-check-label">Include End Date</label>
                  </div>
                </Col>
              </Row>
              <hr />
              <Button className="float-end" onClick={updateEndDate}>
                Submit
              </Button>
            </>
          )
        }}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      {/* ================= OTHER MODALS ================= */}
      <CustomModal
        data={{
          title: "Activate Service",
          component: (
            <AddService
              getClientdata={loadDashboard}
              clientUpdate={clientUpdate}
              getPrevData={getPrevData}
              PrevData={prevData}
              afterclose={afterClose}
            />
          )
        }}
        show={addServiceModal}
        onHide={() => setAddServiceModal(false)}
      />

      <CustomModal
        data={{
          title: "Update Client",
          component: (
            <UpdateClients
              getClientdata={loadDashboard}
              clientUpdate={clientUpdate}
              afterclose={afterClose}
            />
          )
        }}
        show={updateClientModal}
        onHide={() => setUpdateClientModal(false)}
      />

      <CustomModal
        data={{
          title: "Delete Client",
          component: (
            <DeleteClient
              getClientdata={loadDashboard}
              clientUpdate={clientUpdate}
              afterclose={afterClose}
            />
          )
        }}
        show={deleteClientModal}
        onHide={() => setDeleteClientModal(false)}
      />

      <CustomModal
        data={{
          title: "Show Client month of work Details",
          component: <ClientRecord GetClientId={getClientId} />
        }}
        show={clientRecordModalShow}
        onHide={() => setClientRecordModalShow(false)}
        modalsize="lg"
      />
    </>
  );
}