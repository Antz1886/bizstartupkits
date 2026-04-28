import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import EnterpriseAISuite from './pages/EnterpriseAISuite';
import CognitiveAutomation from './pages/CognitiveAutomation';
import StrategicBI from './pages/StrategicBI';
import SystemArchitecture from './pages/SystemArchitecture';
import Methodology from './pages/Methodology';
import EngagementModel from './pages/EngagementModel';
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
          <Route path="/services/enterprise-ai" element={<EnterpriseAISuite />} />
          <Route path="/services/cognitive-automation" element={<CognitiveAutomation />} />
          <Route path="/services/strategic-bi" element={<StrategicBI />} />
          <Route path="/services/system-architecture" element={<SystemArchitecture />} />
          <Route path="/corporate/methodology" element={<Methodology />} />
          <Route path="/corporate/engagement" element={<EngagementModel />} />
          <Route path="/corporate/whitepapers" element={<Whitepapers />} />
          <Route path="/corporate/contact" element={<ContactRelations />} />
        </Routes>
      </Layout>
    </Router>
  );
}
