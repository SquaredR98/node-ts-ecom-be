import { Application } from "express";
import { authRoutes } from "./features/auth/Routes";
import { requestInterceptor } from "./utils/middlewares/RequestInterceptor";
import { rolesRoutes } from "./features/roles/Routes";

export default (app: Application) => {
  app.use(requestInterceptor.interceptAndLog);
  const routes = () => {
    app.use('/auth', authRoutes.routes());
    app.use('/role', rolesRoutes.routes());
    return;
  }
  routes();
}