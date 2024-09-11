import MyAccount from "@/app/(accounts)/my-account/page";

export const ROUTES = {
  login: "/login",
  register: "/register",
  events: "/events",
};

export const PRIVATE_ROUTES = {
  admin: "/admin",
  audit: "/admin/audit",
  myAccount: "/my-account",
  MyAccountEdit: "/my-account/edit/:id",
  changePassword: "/change-password/:id",
  payment: "/payment",
};
