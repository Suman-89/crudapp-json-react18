import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Badge, Card, Stack } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

const ViewUser = () => {
  const { userid } = useParams();
  const [viewEmp, setViewEmp] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3080/employee/${userid}`)
      .then((res) => {
        console.log(res);
        setViewEmp(res.data);
      })
      .catch((err) => console.log(err));
  }, [userid]);

  return (
    <div className="container my-4" style={{ width: '80%' }}>
      <Card>
        <Card.Body>
          <h3>
            <Badge bg="info">Employee Details</Badge>
          </h3>
          <Stack gap={3}>
            <div className="p-2">
              <b>Name:</b> {viewEmp.name}
            </div>
            <div className="p-2">
              <b>Email:</b> {viewEmp.email}
            </div>
            <div className="p-2">
              <b>Phone:</b> {viewEmp.phone}
            </div>
          </Stack>
          <Link className="my-3 btn btn-secondary" to="/">
            Back to homepage
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ViewUser;
