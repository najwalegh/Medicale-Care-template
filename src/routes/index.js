import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Common/HomePage';
import Services from '../pages/Patient/servicesPage';
import SpaceMedcin from '../pages/Patient/medcinsPage';

function AppRoutes() {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/medcins" element={<SpaceMedcin />}/>
        </Routes>
    </BrowserRouter>
    )
}

export default AppRoutes;
     