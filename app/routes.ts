import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/redirect.tsx"),

  layout("./routes/auth/auth.tsx", [
    route("/auth/login", "./routes/auth/login/login.tsx"),
    route("/auth/register", "./routes/auth/register/register.tsx"),
  ]),

  layout("./guards/require-session.tsx", [
    layout("./routes/game/layout.tsx", [
      route("/game/menu", "./routes/game/menu/menu.tsx"),
      route("/game/board", "./routes/game/board/board.tsx"),
      route("/game/finish", "./routes/game/finish/finish.tsx"),
      route("/game/scores", "./routes/game/scores/scores.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
