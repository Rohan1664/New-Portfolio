import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Projects from "../pages/Projects";
import Skills from "../pages/Skills";
import Contact from "../pages/Contact";

import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import ManageProjects from "../pages/admin/ManageProjects";
import ManageSkills from "../pages/admin/ManageSkills";
import ManageProfile from "../pages/admin/ManageProfile";
import Messages from "../pages/admin/Messages";

import NotFound from "../pages/NotFound"; // ✅ ADD THIS

import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

export default function AppRoutes() {
  return (
    <Routes>

      {/* ================= PUBLIC ================= */}
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/about" element={<MainLayout><About /></MainLayout>} />
      <Route path="/projects" element={<MainLayout><Projects /></MainLayout>} />
      <Route path="/skills" element={<MainLayout><Skills /></MainLayout>} />
      <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />

      {/* ================= ADMIN LOGIN ================= */}
      <Route path="/admin" element={<Login />} />

      {/* ================= PROTECTED ================= */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute>
          <AdminLayout><Dashboard /></AdminLayout>
        </ProtectedRoute>
      } />

      <Route path="/admin/projects" element={
        <ProtectedRoute>
          <AdminLayout><ManageProjects /></AdminLayout>
        </ProtectedRoute>
      } />

      <Route path="/admin/skills" element={
        <ProtectedRoute>
          <AdminLayout><ManageSkills /></AdminLayout>
        </ProtectedRoute>
      } />

      <Route path="/admin/profile" element={
        <ProtectedRoute>
          <AdminLayout><ManageProfile /></AdminLayout>
        </ProtectedRoute>
      } />

      <Route path="/admin/messages" element={
        <ProtectedRoute>
          <AdminLayout><Messages /></AdminLayout>
        </ProtectedRoute>
      } />

      {/* ================= 404 (ALWAYS LAST) ================= */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}