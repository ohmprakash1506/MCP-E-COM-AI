import { Router } from "express";

import userRoute from "./user.route";

const router = Router();

const defaultroute = [
  {
    path: "/user",
    route: userRoute,
  }
];

defaultroute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;