// src/App.tsx
import NavbarMartial from "./components/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routerConfig";
import { Suspense } from "react";
import Footer from "./components/Footer";
import { Box, Flex } from "@chakra-ui/react";

function App() {
  return (
    <Router>
      <Flex direction="column" minHeight="100vh">
        <Suspense>
          <NavbarMartial />
          <Box flex="1">
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </Box>
          <Footer />
        </Suspense>
      </Flex>
    </Router>
  );
}

export default App;
