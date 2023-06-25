import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CrudDataList from './crudpages/CrudDataList';
import CrudDataAdd from './crudpages/CrudDataAdd';
import CrudDataEdit from './crudpages/CrudDataEdit';
import CrudDataView from './crudpages/CrudDataView';

function App() {
  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<CrudDataList />} />
            <Route exact path="/crudadd" element={<CrudDataAdd />} />
            <Route exact path="/crudedit/:empid" element={<CrudDataEdit />} />
            <Route exact path="/crudview/:empid" element={<CrudDataView />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
