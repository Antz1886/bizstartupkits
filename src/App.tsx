import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CustomPythonResolvers from './pages/CustomPythonResolvers';
import AgentMeshWorkforce from './pages/AgentMeshWorkforce';
import StrategicBI from './pages/StrategicBI';
import SystemArchitecture from './pages/SystemArchitecture';
import Methodology from './pages/Methodology';
import BATModel from './pages/BATModel';
import Whitepapers from './pages/Whitepapers';
import ContactRelations from './pages/ContactRelations';
import { Layout } from './components/Layout';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/services/agentmesh-workforce" element={<AgentMeshWorkforce />} />
          <Route path="/services/custom-resolvers" element={<CustomPythonResolvers />} />
          <Route path="/services/strategic-bi" element={<StrategicBI />} />
          <Route path="/services/system-architecture" element={<SystemArchitecture />} />
          <Route path="/corporate/methodology" element={<Methodology />} />
          <Route path="/corporate/bat-model" element={<BATModel />} />
          <Route path="/corporate/whitepapers" element={<Whitepapers />} />
          <Route path="/corporate/contact" element={<ContactRelations />} />
        </Routes>
      </Layout>
    </Router>
  );
}
