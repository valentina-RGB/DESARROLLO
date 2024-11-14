import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { jwtDecode } from 'jwt-decode'; // Asegúrate de usar jwt-decode correctamente

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { token, logout } = useContext(AuthContext);

  // Verifica si el token es nulo o ha expirado
  if (!token || isTokenExpired(token)) {
    logout(); // Si no hay token o está expirado, realiza logout y redirige
    return <Navigate to="/login" />;
  }

  return children; // Si el token es válido, renderiza los componentes protegidos
};

// Función para verificar si el token ha expirado
const isTokenExpired = (token: string): boolean => {
  if (!token) return true;

  try {
    const decoded: any = jwtDecode(token);
    const expirationTime = decoded.exp * 1000; // exp viene en segundos
    return Date.now() >= expirationTime; // Compara la fecha actual con la expiración
  } catch (error) {
    return true; // Si hay un error al decodificar el token, lo consideramos expirado
  }
};

export default PrivateRoute;
