import { createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router";
import { api_path } from "../../../environment";
import { all_routes } from "../../router/all_routes";

type AuthContextType = {
    userData: any | null;
    token: string | null;
    loginAuth: (username: string, password: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [userData, setUserData] = useState<any | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const routes = all_routes;
    const navigate = useNavigate();

    const navigationPath = (role: string) => {
        setTimeout(() => {
            switch (role) {
                case "STUDENT":
                    navigate(routes.studentDashboard);
                    break;
                case "PARENT":
                    navigate(routes.parentDashboard);
                    break;
                case "TEACHER":
                    navigate(routes.teacherDashboard);
                    break;
                default:
                    navigate(routes.adminDashboard);
                    break;
            }
        }, 1000);
    };

    const loginAuth = async (username: string, password: string) => {
        setError(null); // Clear any previous errors

        try {

            const response = await fetch(
                `${api_path}/users/logIn?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
                { method: "GET" }
            );

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                console.log(data);
                const { isValidUser, role, message } = data;

                if (isValidUser) {
                    setUserData(data);
                    // setToken(token);
                    localStorage.setItem("role", role); // Save token to local storage
                    navigationPath(role);
                } else {
                    setError(message || "Invalid username or password");
                }
            } else {
                const errorMessage =
                    response.status === 401
                        ? "Invalid username or password"
                        : "An error occurred: " + (data.error || response.statusText);
                setError(errorMessage);
            }
        } catch (error) {
            console.error("Error signing in:", error);
            setError("An error occurred. Please try again later.");
        }
    };

    const logout = () => {
        // setUser(null);
        setToken(null);
        localStorage.removeItem("authToken");
        navigate(all_routes.login);
    };

    return (
        <AuthContext.Provider value={{ userData, token, loginAuth, logout }}>
            {error && <div className="alert alert-danger">{error}</div>}
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };

