import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import Home from './Homepage';
import Introduction from './Introduction';
import Resume from './Resume';

const Router = () => {
  return (

    <AnimatePresence>
      <Routes>

        <Route
          path="/"
          element={ <Home />}
        />

        <Route
          path="/Homepage"
          element={<Home /> }
        />

        <Route
          path="/Introduction"
          element={<Introduction />}
        />

        <Route
          path="/Resume"
          element={<Resume />}
        />

      </Routes>
      </AnimatePresence>
    );
};

export default Router;
