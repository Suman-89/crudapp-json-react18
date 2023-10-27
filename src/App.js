import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CrudDataList from './crudpages/CrudDataList';
import CrudDataAdd from './crudpages/CrudDataAdd';
import CrudDataEdit from './crudpages/CrudDataEdit';
import CrudDataView from './crudpages/CrudDataView';
import MainList from './copy_crud/MainList';
import ViewUser from './copy_crud/ViewUser';
import EditUser from './copy_crud/EditUser';
import AddUser from './copy_crud/AddUser';

function App() {
  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <Routes>
            {/* <Route exact path="/" element={<CrudDataList />} /> */}
            <Route exact path="/" element={<MainList />} />
            <Route exact path="/useradd" element={<AddUser />} />
            <Route exact path="/viewuser/:userid" element={<ViewUser />} />
            {/* <Route exact path="/crudadd" element={<CrudDataAdd />} /> */}
            {/* <Route exact path="/crudedit/:empid" element={<CrudDataEdit />} /> */}
            <Route exact path="/useredit/:userid" element={<EditUser />} />
            {/* <Route exact path="/crudview/:empid" element={<CrudDataView />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
