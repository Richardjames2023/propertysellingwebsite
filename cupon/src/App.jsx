import React, { useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import ProductPage from './Pages/ProductPage2';
import CartPage from './Pages/Cartpage';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import AdminDashboard from './Pages/AdminDasboard';
import UserLayout from './components/UserLayout';
import AdminLayout from './components/AdminLayout';
import PropertyTable from './components/AdminComponents/Dashboard/PropertyTable';
import PurchaseTable from './components/AdminComponents/Dashboard/PurchaseTable';
import UserTable from './components/AdminComponents/Dashboard/UserTable';
import UserCart from './components/UserCart';
import ProfilePage from './components/profilePage';
import EntriesLayout from './components/EntriesLayout';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './hooks/useAuth';

function App() {

  return (
    <div>
      <Routes>
        {/* Redirect root path to login */}
        {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}

        {/* Public Routes */}
        <Route element={<EntriesLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* User Routes, Protected by Authentication */}
        <Route element={<UserLayout />}>
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/productpage"
            element={
              <ProtectedRoute>
                <ProductPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/UserCart"
            element={
              <ProtectedRoute>
                <UserCart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Admin Routes, Accessible Only to Admin Users */}
        <Route element={<AdminLayout />}>
          <Route
            path="/admin-dashboard/*"
            element={
              <ProtectedRoute roleRequired="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="properties"
            element={
              <ProtectedRoute roleRequired="admin">
                <PropertyTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="purchases"
            element={
              <ProtectedRoute roleRequired="admin">
                <PurchaseTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="users"
            element={
              <ProtectedRoute roleRequired="admin">
                <UserTable />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
