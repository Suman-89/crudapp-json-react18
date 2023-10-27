import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Dropdown, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const MainList = () => {
  const navigate = useNavigate();
  const [empData, setEmpData] = useState([]);

  const getInputData = () => {
    fetch('http://localhost:3080/employee')
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        // console.log('res-->', res);
        setEmpData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getInputData();
  }, []);

  const viewData = (vData) => {
    console.log(vData);
    navigate(`/viewuser/${vData.id}`);
  };
  const editData = (editData) => {
    console.log(editData);
    navigate(`/useredit/${editData.id}`, {
      state: { dataEdit: editData },
    });
  };
  const delemp = (delId) => {
    console.log(delId);
    if (window.confirm('do you want to delete ?')) {
      axios
        .delete(`http://localhost:3080/employee/${delId}`)
        .then((res) => {
          console.log(res);
          getInputData();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="container my-3">
      <h2>
        <span className="badge bg-info">React-18 Crud App Project</span>
      </h2>
      <div className="row">
        <h3>
          <span
            className="badge bg-warning"
            style={{ margin: '0 auto 0', width: '18rem' }}
          >
            Employee List
          </span>
        </h3>
        <div className="col-sm-3" style={{ margin: '0 auto 0' }}>
          <Link to="/useradd" className="btn btn-danger my-3">
            Add new (+)
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="card">
          <div className="card-body">
            <div className="col-md-10" style={{ margin: '0 auto 0' }}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th scope="col">SL.No.</th>
                    <th scope="col">Employee Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>

                {empData &&
                  empData?.map((edata, index) => {
                    return (
                      <tbody key={index}>
                        <tr>
                          <td>{index + 1}.</td>
                          <td>{edata.name}</td>
                          <td>{edata.email}</td>
                          <td>{edata.phone}</td>
                          <td>
                            <Dropdown size="sm" as={ButtonGroup}>
                              <Button variant="secondary">Options</Button>

                              <Dropdown.Toggle
                                split
                                variant="outline-secondary"
                                id="dropdown-split-basic"
                              />

                              <Dropdown.Menu>
                                <Dropdown.Item onClick={() => editData(edata)}>
                                  Edit
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => viewData(edata)}>
                                  View
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => delemp(edata.id)}>
                                  Delete
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainList;
