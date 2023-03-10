import { LocalizationProvider } from "@mui/x-date-pickers";
import { lazy, Suspense } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const Landing = lazy(() => import('./pages/Landing'))
const WizardForm = lazy(() => import('./pages/WizardForm'))

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Suspense fallback={<div>...loading</div>}>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/create" element={<WizardForm />} />
          </Routes>
        </Router>
      </Suspense >
    </LocalizationProvider>
  );
}

export default App;
