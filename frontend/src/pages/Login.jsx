import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { restLink } from "../services/config";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await restLink.post("auth/login", {
        username,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        login(token);
      } else {
        setStatus(
          response?.data?.errors ? response?.data?.errors[0]?.msg : "error"
        );
        setTimeout(() => setStatus(null), 5000);
      }
    } catch (err) {
      setStatus(
        err.response?.data?.errors
          ? err.response?.data?.errors[0]?.msg
          : err.response?.data?.message || "error"
      );
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <form onSubmit={handleSubmit} className="card-body">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold">Challenge</h2>
            <h4 className="font-bold text-primary">By Tomas Alfonso</h4>
          </div>

          <h2 className="card-title text-center text-2xl font-bold mb-6 justify-center">
            Iniciar sesión
          </h2>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Nombre de usuario</span>
            </label>
            <input
              type="text"
              placeholder="Tu nombre de usuario"
              className="input input-bordered w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Contraseña</span>
            </label>
            <input
              type="password"
              placeholder="********"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Entrar
            </button>
          </div>

          <div className="form-control mt-4">
            <p className="text-center">
              ¿No tienes una cuenta?{" "}
              <a href="/register" className="link link-primary font-bold">
                Regístrate aquí
              </a>
            </p>
          </div>

          {status === "loading" && (
            <div
              role="alert"
              className="alert alert-info text-white mt-4 justify-center"
            >
              <span className="loading loading-dots loading-sm"></span>
            </div>
          )}
          {status && status !== "loading" && (
            <div
              role="alert"
              className="alert alert-error text-white mt-4 justify-center"
            >
              <span className="text-center font-bold">
                {status === "error"
                  ? "😞 Ha ocurrido un error al iniciar sesión"
                  : `✖️ ${status}`}
              </span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
