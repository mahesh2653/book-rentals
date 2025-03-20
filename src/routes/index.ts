import { Router } from "express";
import bookRouter from "./book.route";
import rentalRouter from "./rental.route";
import authRouter from "./auth.route";

const mainRouter = Router();

interface RouteConfig {
  path: string;
  router: Router;
}

const routes: RouteConfig[] = [
  {
    path: "/auth",
    router: authRouter,
  },
  {
    path: "/book",
    router: bookRouter,
  },
  {
    path: "/rental",
    router: rentalRouter,
  },
];

routes.forEach(({ path, router }) => {
  mainRouter.use(path, router);
});

export default mainRouter;
