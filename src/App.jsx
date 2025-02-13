import './App.css'
import { Route, Routes } from 'react-router-dom';
import { TicketSelection } from './Pages/TicketSelection';
import { TicketDetails } from './Pages/TicketDetails';
import { TicketConfirmation } from './Pages/TicketConfirmation';

function App() {
  return (
    <Routes>
      <Route path="/" element={<TicketSelection />} />
      <Route path="/ticket-details" element={<TicketDetails />} />
      <Route path="/ticket-confirmation" element={<TicketConfirmation />} />
    </Routes>
  );
}

export default App;

