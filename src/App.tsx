// src/App.tsx
import NavbarMartial from './components/Nav';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routerConfig';
import { Suspense } from 'react';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Suspense>
        <NavbarMartial />
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
        <Footer />
      </Suspense>
    </Router>
  );
}

export default App;
