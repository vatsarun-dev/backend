import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthLayout } from "./layouts/AuthLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { ProtectedRoute, PublicRoute } from "./routes/Guards";

const LoginPage = lazy(() => import("./pages/auth/LoginPage").then((module) => ({ default: module.LoginPage })));
const SignupPage = lazy(() => import("./pages/auth/SignupPage").then((module) => ({ default: module.SignupPage })));
const ForgotPasswordPage = lazy(() => import("./pages/auth/ForgotPasswordPage").then((module) => ({ default: module.ForgotPasswordPage })));
const ResetPasswordPage = lazy(() => import("./pages/auth/ResetPasswordPage").then((module) => ({ default: module.ResetPasswordPage })));
const PasswordUpdatedPage = lazy(() => import("./pages/auth/PasswordUpdatedPage").then((module) => ({ default: module.PasswordUpdatedPage })));
const GoogleCallbackPage = lazy(() => import("./pages/auth/GoogleCallbackPage").then((module) => ({ default: module.GoogleCallbackPage })));
const TeacherDashboard = lazy(() => import("./pages/dashboard/TeacherDashboard").then((module) => ({ default: module.TeacherDashboard })));
const PrincipalDashboard = lazy(() => import("./pages/dashboard/PrincipalDashboard").then((module) => ({ default: module.PrincipalDashboard })));
const StudentsPage = lazy(() => import("./pages/students/StudentsPage").then((module) => ({ default: module.StudentsPage })));
const AddStudentPage = lazy(() => import("./pages/students/AddStudentPage").then((module) => ({ default: module.AddStudentPage })));
const SearchStudentPage = lazy(() => import("./pages/students/SearchStudentPage").then((module) => ({ default: module.SearchStudentPage })));
const ProfilePage = lazy(() => import("./pages/settings/ProfilePage").then((module) => ({ default: module.ProfilePage })));
const SettingsPage = lazy(() => import("./pages/settings/SettingsPage").then((module) => ({ default: module.SettingsPage })));
const AnalyticsPage = lazy(() => import("./pages/dashboard/AnalyticsPage").then((module) => ({ default: module.AnalyticsPage })));
const ForbiddenPage = lazy(() => import("./pages/system/ForbiddenPage").then((module) => ({ default: module.ForbiddenPage })));
const NotFoundPage = lazy(() => import("./pages/system/NotFoundPage").then((module) => ({ default: module.NotFoundPage })));

export default function App() {
  return (
    <Suspense fallback={<div className="screen-loader">Loading page...</div>}>
      <Routes>
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/password-updated" element={<PasswordUpdatedPage />} />
          <Route path="/auth/google/callback" element={<GoogleCallbackPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={["Teacher"]} />}>
        <Route path="/teacher" element={<DashboardLayout />}>
          <Route index element={<TeacherDashboard />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="students/new" element={<AddStudentPage />} />
          <Route path="search" element={<SearchStudentPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={["Principal"]} />}>
        <Route path="/principal" element={<DashboardLayout />}>
          <Route index element={<PrincipalDashboard />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="students/new" element={<AddStudentPage />} />
          <Route path="search" element={<SearchStudentPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>

      <Route path="/403" element={<ForbiddenPage />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
