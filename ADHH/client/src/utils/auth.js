import { ROUTES, SESSION_TTL_MS } from "../constants/app";

const storageKey = "adhh.auth";

export function normalizeRole(user) {
  const raw = String(user?.role || user?.designation || "").toLowerCase();
  if (raw.includes("principal")) return "Principal";
  if (raw.includes("teacher")) return "Teacher";
  return "";
}

export function dashboardFor(user) {
  return normalizeRole(user) === "Principal" ? ROUTES.principal : ROUTES.teacher;
}

export function saveSession(session, remember) {
  const payload = JSON.stringify({ ...session, remember, loginAt: Date.now() });
  localStorage.setItem(storageKey, payload);
  if (!remember) sessionStorage.setItem(storageKey, payload);
}

export function readSession() {
  const raw = localStorage.getItem(storageKey) || sessionStorage.getItem(storageKey);
  if (!raw) return null;

  try {
    const session = JSON.parse(raw);
    if (!session?.user) return null;
    if (Date.now() - Number(session.loginAt || 0) > SESSION_TTL_MS) {
      clearSession();
      return null;
    }
    return session;
  } catch {
    clearSession();
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(storageKey);
  sessionStorage.removeItem(storageKey);
}

export function hasRole(user, roles = []) {
  if (!roles.length) return true;
  return roles.includes(normalizeRole(user));
}
