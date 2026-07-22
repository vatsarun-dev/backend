import { Navigate, Route, Routes } from "react-router-dom";
import { AuthLayout } from "./layouts/AuthLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { ProtectedRoute, PublicRoute } from "./routes/Guards";
import { LoginPage } from "./pages/auth/LoginPage";
import { SignupPage } from "./pages/auth/SignupPage";
import { ForgotPasswordPage } from "./pages/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "./pages/auth/ResetPasswordPage";
import { GoogleCallbackPage } from "./pages/auth/GoogleCallbackPage";
import { TeacherDashboard } from "./pages/dashboard/TeacherDashboard";
import { PrincipalDashboard } from "./pages/dashboard/PrincipalDashboard";
import { StudentsPage } from "./pages/students/StudentsPage";
import { AddStudentPage } from "./pages/students/AddStudentPage";
import { SearchStudentPage } from "./pages/students/SearchStudentPage";
import { FeeManagementPage } from "./pages/fees/FeeManagementPage";
import { ProfilePage } from "./pages/settings/ProfilePage";
import { SettingsPage } from "./pages/settings/SettingsPage";
import { AnalyticsPage } from "./pages/dashboard/AnalyticsPage";
import { ForbiddenPage } from "./pages/system/ForbiddenPage";
import { NotFoundPage } from "./pages/system/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:id" element={<ResetPasswordPage />} />
          <Route path="/auth/google/callback" element={<GoogleCallbackPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={["Teacher"]} />}>
        <Route path="/teacher" element={<DashboardLayout />}>
          <Route index element={<TeacherDashboard />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="students/new" element={<AddStudentPage />} />
          <Route path="search" element={<SearchStudentPage />} />
          <Route path="fees" element={<FeeManagementPage />} />
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
          <Route path="fees" element={<FeeManagementPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>

      <Route path="/403" element={<ForbiddenPage />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
