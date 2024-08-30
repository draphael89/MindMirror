import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PublicLayout from './layouts/PublicLayout';
import AppLayout from './layouts/AppLayout';
import PrivateRoute from './components/common/PrivateRoute';

const LandingPage = lazy(() => import('./pages/public/LandingPage'));
const SignUpPage = lazy(() => import('./pages/public/SignUpPage'));
const DashboardPage = lazy(() => import('./pages/app/DashboardPage'));
const EssayListPage = lazy(() => import('./pages/app/EssayListPage'));

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route element={<PublicLayout />}>
              <Route path="/signup" element={<SignUpPage />} />
            </Route>
            <Route element={<AppLayout />}>
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/essays"
                element={
                  <PrivateRoute>
                    <EssayListPage />
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

export default App;
