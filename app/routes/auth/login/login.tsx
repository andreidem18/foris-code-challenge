import { googleIcon } from "~/assets/images";
import { LoginForm } from "~/features/auth/components";

import styles from "./login.module.scss";
import { Link, useNavigate } from "react-router";
import { Button } from "~/ui/button/button";
import { loginWithGoogle } from "~/features/auth/services/loginWithGoogle";
import { toast } from "sonner";

export function meta() {
  return [
    { title: "Login" },
    { name: "description", content: "Login to Rick and Morty Memory App" },
  ];
}

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success("Login exitoso");
      navigate("/game/menu");
    } catch (error) {
      console.error(error);
      toast.error("No se pudo iniciar sesi\u00f3n con Google");
    }
  };

  return (
    <>
      <LoginForm />
      <Button
        variant="secondary"
        className={styles.googleButton}
        onClick={handleLogin}
      >
        <img src={googleIcon} alt="google icon" />
        Login con google
      </Button>
      <Link to="/auth/register" className={styles.link}>
        ¿No tienes cuenta?
      </Link>
    </>
  );
}
