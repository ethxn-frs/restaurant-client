import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Menu from './Pages/Menu/Menu';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';
import LoginPage from './Pages/LoginPage/LoginPage';
import ManageRestaurantPage from './Pages/ManageRestaurantPage/ManageRestaurantPage';
import ManageItemsPage from './Pages/ManageItemsPage/ManageItemsPage';
import ManageCategoriesPage from './Pages/ManageCategoriesPage/ManageCategoriesPage';
import CreateItemPage from './Pages/CreateItemPage/CreateItemPage';
import CreateCategoryPage from './Pages/CreateCategoryPage/CreateCategoryPage';
import EditItemPage from './Pages/EditItemPage/EditItemPage';
import EditCategoryPage from './Pages/EditCategoryPage/EditCategoryPage';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import EditUserPage from './Pages/EditUserPage/EditUserPage';
import ManageUsersPage from './Pages/ManageUsersPage/ManageUsersPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/admin/home" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/restaurant" element={
          <ProtectedRoute>
            <ManageRestaurantPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/items" element={
          <ProtectedRoute>
            <ManageItemsPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/items/create" element={
          <ProtectedRoute>
            <CreateItemPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/items/edit/:id" element={
          <ProtectedRoute>
            <EditItemPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/categories" element={
          <ProtectedRoute>
            <ManageCategoriesPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/categories/create" element={
          <ProtectedRoute>
            <CreateCategoryPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/categories/edit/:id" element={
          <ProtectedRoute>
            <EditCategoryPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/users" element={
          <ProtectedRoute>
            <ManageUsersPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/users/edit/:id" element={
          <ProtectedRoute>
            <EditUserPage />
          </ProtectedRoute>
        } />

      </Routes>
    </Router>
  );
};

export default App;