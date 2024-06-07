import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from './components/Layout';
import HomeComponent from './components/home-component';
import RegisterComponent from './components/register-component';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeComponent />} />
          <Route path="register" element={<RegisterComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
