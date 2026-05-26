import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CustomPythonResolvers from './pages/CustomPythonResolvers';
import AgentMeshWorkforce from './pages/AgentMeshWorkforce';
import BATModel from './pages/BATModel';
import Dashboard from './pages/Dashboard';
import Portal from './pages/Portal';
import Sponsorship from './pages/Sponsorship';
import KnowledgeHub from './pages/KnowledgeHub';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import { Layout } from './components/Layout';
import { ScrollToTop } from './components/ScrollToTop';

// Sector Templates
import FinTechResolver from './templates/FinTechResolver';
import LogisticsOrchestrator from './templates/LogisticsOrchestrator';
import WellnessCare from './templates/WellnessCare';

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
          <Route path="/mission-control" element={<Dashboard />} />
          
          {/* Sector Specific Solutions */}
          <Route path="/solutions/fintech" element={<FinTechResolver />} />
          <Route path="/solutions/logistics" element={<LogisticsOrchestrator />} />
          <Route path="/solutions/wellness" element={<WellnessCare />} />

          <Route path="/portal" element={<Portal />} />
          <Route path="/sponsor" element={<Sponsorship />} />
          <Route path="/knowledge-hub" element={<KnowledgeHub />} />
          <Route path="/legal/privacy" element={<PrivacyPolicy />} />
          <Route path="/legal/terms" element={<TermsOfService />} />
        </Routes>
      </Layout>
    </Router>
  );
}
