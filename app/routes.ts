import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/redirect.tsx"),
  route("/game", "./routes/game/game.tsx"),

  layout("./routes/auth/auth.tsx", [
    route("/auth/login", "./routes/auth/login/login.tsx"),
    route("/auth/register", "./routes/auth/register/register.tsx"),
  ]),
] satisfies RouteConfig;
