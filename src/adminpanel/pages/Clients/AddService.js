import React, { useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { Authcontext } from '../../../config/AppRoutes'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import SelectDropdown from '../../component/SelectDropdown';
import DatePicker from 'react-datepicker';
import { ToastContainer, toast } from 'react-toastify';
import API_URLS from '../../../api/api';

const AddService = ({ clientUpdate, getClientdata, getPrevData, PrevData, afterclose }) => {

  const auth = useContext(Authcontext);
  const isMounted = useRef(true);   // ✅ mount tracker

  const [SpecialityType, setSpecialityType] = useState(null);
  const [WorkingStaff, setWorkingStaff] = useState(null);
  const [startDate, setstartDate] = useState(new Date());
  const [specialityoption, setSpecialityoption] = useState([]);
  const [availableStaff, setavailableStaff] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ===============================
  // CLEANUP ON UNMOUNT
  // ===============================
  useEffect(() => {
    return () => {
      isMounted.current = false;  // 🔥 prevent memory leak
    };
  }, []);

  // ===============================
  // FETCH SPECIALITY
  // ===============================
  useEffect(() => {
    //if (!PrevData?.speciality_id) return;

    const controller = new AbortController();

    const fetchSpeciality = async () => {
      try {
        const res = await axios.get(API_URLS.Speciality, {
          signal: controller.signal
        });

        if (!isMounted.current) return;

        const arr = res.data.result.map(item => ({
          value: item.id,
          label: item.name
        }));

        setSpecialityoption(arr);

        const selected = arr.find(
          item => item.value === PrevData.speciality_id
        );

        if (selected) {
          setSpecialityType(selected);
          fetchStaff(selected, controller);
        }

      } catch (err) {
        if (err.name !== "CanceledError") {
          console.error(err);
        }
      }
    };

    fetchSpeciality();

    return () => controller.abort();
  }, [PrevData]);

  // ===============================
  // FETCH STAFF
  // ===============================
  const fetchStaff = async (speciality, parentController = null) => {
    const controller = parentController || new AbortController();

    try {
      const res = await axios.post(
        API_URLS.Getstaffbyspeciality,
        { specialityId: speciality.value },
        { signal: controller.signal }
      );

      if (!isMounted.current) return;

      const staffs = res.data.result.map(option => ({
        value: option.id,
        label: option.name
      }));

      setavailableStaff(staffs);

      const selectedStaff = staffs.find(
        s => s.value === PrevData?.staff_id
      );

      if (selectedStaff) {
        setWorkingStaff(selectedStaff);
      }

    } catch (err) {
      if (err.name !== "CanceledError") {
        console.error(err);
      }
    }

    return () => controller.abort();
  };

  // ===============================
  // SUBMIT
  // ===============================
  const submitData = async (e) => {
    e.preventDefault();

    if (!SpecialityType || !WorkingStaff) {
      toast.error("All fields required");
      return;
    }

    try {
      setIsSubmitting(true);

      const clientId =
        PrevData?.client_id ||
        clientUpdate?.id ||
        null;

      const empData = {
        WorkingStaff: Number(WorkingStaff.value),
        SpecialityType: Number(SpecialityType.value),
        clientId: Number(clientId),
        startDate: startDate.toISOString().slice(0, 19).replace('T', ' ')
      };

      await axios.post(API_URLS.insertClientVisit, empData);

      if (!isMounted.current) return;

      toast.success("Changes Done!");

      getClientdata();
      afterclose();

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      if (isMounted.current) {
        setIsSubmitting(false);
      }
    }
  };

  // ===============================
  // RENDER
  // ===============================
  return (
    <>
      <form onSubmit={submitData}>
        <Container>
          <ToastContainer />
          <Row>
            <Col sm="12">
              <p><strong>Client:</strong> {clientUpdate?.name}</p>
            </Col>
          </Row>

          <Row>
            <Col sm="6">
              <Form.Label>Select Service</Form.Label>
              <SelectDropdown
                value={SpecialityType}
                data={{ list: specialityoption }}
                onChange={(e) => {
                  setSpecialityType(e);
                  fetchStaff(e);
                }}
              />

              <Form.Label className="mt-3">Select Staff</Form.Label>
              <SelectDropdown
                value={WorkingStaff}
                data={{ list: availableStaff }}
                onChange={(e) => setWorkingStaff(e)}
              />
            </Col>

            <Col sm="6">
              <Form.Label>Select Start Date</Form.Label>
              <DatePicker
                className='form-control'
                selected={startDate}
                onChange={(date) => setstartDate(date)}
                dateFormat="dd/MM/yyyy"
              />
            </Col>
          </Row>
        </Container>

        <hr />
        <Button type="submit" className='float-end' disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </>
  );
};

export default AddService;