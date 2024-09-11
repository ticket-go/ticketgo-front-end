export const ROUTES = {
  login: "/login",
  register: "/register",
  events: "/events",
};

export const PRIVATE_ROUTES = {
  admin: "/admin",
  myAccount: "/my-account",
  myAccountPath: (path = "") => `/my-account/${path}`,
  changePassword: "/change-password/:id",
  payment: "/payment",
  invoice: (path = "") => `/payment/${path}`,
};
