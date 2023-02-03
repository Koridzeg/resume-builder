import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const Landing = lazy(() => import('./pages/Landing'))
const WizardForm = lazy(() => import('./pages/WizardForm'))

function App() {
  return (
    <Suspense fallback={<div>...loading</div>}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/create" element={<WizardForm />}></Route>
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
