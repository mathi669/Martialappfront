
import NavbarMartial from './components/Nav'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Suspense } from 'react';
import { AppRouter } from './Router';
import Footer from './components/Footer';

function App() {

  return (
      <Router>
        <Suspense>
          <NavbarMartial />
          <AppRouter />
          <Footer />
        </Suspense>
      </Router>
  )
}

export default App
