import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const CrudDataAdd = () => {
  const Nav = useNavigate();
  const [newData, setNewData] = useState({
    empName: '',
    empEmail: '',
    empPhone: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [onBtnClick, setOnBtnClick] = useState(false);

  const getData = (e) => {
    e.preventDefault();

    if (!newData.empName || !newData.empEmail || !newData.empPhone) {
      setError(true);
      setOnBtnClick(true);
      setMessage('Empty input bar !! *');
      setTimeout(() => {
        setMessage('');
        setOnBtnClick(true);
      }, 1000);
    } else {
      const inputData = {
        id: Date.now(),
        name: newData.empName,
        email: newData.empEmail,
        phone: newData.empPhone,
      };
      setOnBtnClick(false);

      axios
        .post('http://localhost:3080/employee', inputData)
        .then((ndata) => {
          console.log('ndata-->', ndata);
          if (ndata.status === 201) {
            setError(false);
            setMessage('Registered successfully !!*');
            setTimeout(() => {
              setNewData({
                empName: '',
                empEmail: '',
                empPhone: '',
              });
              setMessage('');
              Nav('/');
            }, 2000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="container my-5">
      <div className="card" style={{ width: '70%', margin: '0 auto 0' }}>
        <div className="card-body">
          <h5 className="card-title mb-4">Employee Register*</h5>
          {message && onBtnClick === true ? (
            <div className="container my-2" style={{ width: '18rem' }}>
              <Alert variant={error === true ? 'danger' : 'success'}>
                {message}
              </Alert>
            </div>
          ) : (
            <></>
          )}
          <Form onSubmit={getData}>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Employee Name*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter employee name"
                  value={newData.empName}
                  onChange={(e) =>
                    setNewData({ ...newData, empName: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Email*</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={newData.empEmail}
                  onChange={(e) =>
                    setNewData({ ...newData, empEmail: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Contact*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Contact"
                  value={newData.empPhone}
                  onChange={(e) =>
                    setNewData({ ...newData, empPhone: e.target.value })
                  }
                />
              </Form.Group>
            </Row>
            <Button variant="primary" type="submit">
              Submit
            </Button>{' '}
            <Link to="/" className="btn btn-secondary">
              Back to homepage
            </Link>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CrudDataAdd;
