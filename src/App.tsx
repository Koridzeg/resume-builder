import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const Landing = lazy(() => import('./pages/Landing'))
const WizardForm = lazy(() => import('./pages/WizardForm'))

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/create" element={<WizardForm />}></Route>
      </Routes>
    </Router>

  );
}

export default App;
