import { Application } from "express";
import { authRoutes } from "./features/auth/Routes";
import { requestInterceptor } from "./utils/middlewares/RequestInterceptor";

export default (app: Application) => {
  app.use(requestInterceptor.interceptAndLog);
  const routes = () => {
    app.use('/auth', authRoutes.routes());
    return;
  }
  routes();
}