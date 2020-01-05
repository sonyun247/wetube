import routes from "./routes";

export const locals = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  //test
  res.locals.user = {
    isAuthenticated: true,
    id: 1
  };
  next();
};
