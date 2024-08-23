export const ROUTES = {
  login: "/login",
  register: "/register",
};

export const PRIVATE_ROUTES = {
  admin: "/admin",
  myAccount: (path = "") => `/my-account/${path}`,
  changePassword: "/change-password/:id",
};
