import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Badge, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
  const { state } = useLocation();
  const { userid } = useParams();
  const mainList = useNavigate();
  const [newEditData, setNewEditData] = useState({
    empEditName: state.dataEdit.name || '',
    empEditEmail: state.dataEdit.email || '',
    empEditPhone: state.dataEdit.phone || '',
  });
  const [editError, setEditError] = useState(false);
  const [editWarn, setEditWarn] = useState('');
  const [btnPress, setBtnPress] = useState(false);

  const editData = (e) => {
    e.preventDefault();

    if (
      !newEditData.empEditName ||
      !newEditData.empEditEmail ||
      !newEditData.empEditPhone
    ) {
      setEditError(true);
      setBtnPress(true);
      setEditWarn('Empty data can not be entered');
      setTimeout(() => {
        setEditWarn('');
        setEditError(true);
      }, 2000);
    } else {
      const editedData = {
        name: newEditData.empEditName,
        email: newEditData.empEditEmail,
        phone: newEditData.empEditPhone,
      };
      setBtnPress(false);

      axios
        .patch(`http://localhost:3080/employee/${userid}`, editedData)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setEditError(false);
            setBtnPress(true);
            setEditWarn('Data edited succcessfully');
            setTimeout(() => {
              setEditWarn('');
              mainList('/');
            }, 2000);
          }
        })
        .catch((err) => {
          console.log('err-->', err);
          if (err.response.status === 404) {
            setEditWarn('Oh snap ! You got an error !!');
            setEditError(true);
            setBtnPress(true);
            setTimeout(() => {
              setEditWarn('');
            }, 2000);
          }
        });
    }
  };

  useEffect(() => {}, [state.dataEdit.userid]);

  return (
    <div className="container my-4" style={{ width: '80%' }}>
      <Card>
        <span className="my-2" style={{ width: '20rem', margin: '0 auto 0' }}>
          {editWarn && btnPress === true ? (
            <Alert variant={editError === true ? 'danger' : 'success'}>
              {editWarn}
            </Alert>
          ) : (
            <></>
          )}
        </span>
        <h4 className="my-3">
          <Badge bg="dark">Edit Employee Data</Badge>
        </h4>
        <Card.Body>
          <Form onSubmit={editData}>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Employee Name*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter employee name"
                  value={newEditData.empEditName}
                  onChange={(e) =>
                    setNewEditData({
                      ...newEditData,
                      empEditName: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Email*</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={newEditData.empEditEmail}
                  onChange={(e) =>
                    setNewEditData({
                      ...newEditData,
                      empEditEmail: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Contact*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Contact"
                  value={newEditData.empEditPhone}
                  onChange={(e) =>
                    setNewEditData({
                      ...newEditData,
                      empEditPhone: e.target.value,
                    })
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
        </Card.Body>
      </Card>
    </div>
  );
};

export default EditUser;
