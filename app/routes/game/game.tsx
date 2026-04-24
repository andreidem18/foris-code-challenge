import type { Route } from "./+types/game";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Login to Rick and Morty Memory App" },
  ];
}

export default function LoginPage() {
  return (
    <div>
      <div>game</div>
    </div>
  );
}
