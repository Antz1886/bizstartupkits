import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CustomPythonResolvers from './pages/CustomPythonResolvers';
import AgentMeshWorkforce from './pages/AgentMeshWorkforce';
import BATModel from './pages/BATModel';
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
          <Route path="/corporate/bat-model" element={<BATModel />} />
        </Routes>
      </Layout>
    </Router>
  );
}
