export const ADMIN_AUTH_KEY = "admin_auth";
export const USER_ROLE_KEY = "user_role";
export const ADMIN_PASSWORD = "admin123";

export type UserRole = "customer" | "admin" | null;

export function getUserRole(): UserRole {
  if (typeof window === "undefined") return null;
  const role = localStorage.getItem(USER_ROLE_KEY);
  if (role === "customer" || role === "admin") return role;
  // Back-compat: if admin authed but role missing, treat as admin
  if (localStorage.getItem(ADMIN_AUTH_KEY) === "1") return "admin";
  return null;
}

export function setCustomerRole() {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_ROLE_KEY, "customer");
  localStorage.removeItem(ADMIN_AUTH_KEY);
}

export function setAdminAuthed() {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_ROLE_KEY, "admin");
  localStorage.setItem(ADMIN_AUTH_KEY, "1");
}

export function clearAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(USER_ROLE_KEY);
  localStorage.removeItem(ADMIN_AUTH_KEY);
  localStorage.removeItem("authToken");
}

export function isAdminAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(ADMIN_AUTH_KEY) === "1";
}
