import { redirect } from "react-router";
import type { Route } from "./+types/_index";

export async function loader({ request }: Route.LoaderArgs) {

  return redirect("/login");
}
