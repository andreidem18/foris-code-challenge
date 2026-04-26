import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/redirect.tsx"),

  layout("./routes/game/layout.tsx", [
    route("/game", "./routes/game/(game)/game.tsx"),
    route("/game/finish", "./routes/game/finish/finish.tsx"),
  ]),

  layout("./routes/auth/auth.tsx", [
    route("/auth/login", "./routes/auth/login/login.tsx"),
    route("/auth/register", "./routes/auth/register/register.tsx"),
  ]),
] satisfies RouteConfig;
