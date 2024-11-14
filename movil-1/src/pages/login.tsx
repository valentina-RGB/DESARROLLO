import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

  const LoginPage = () => {
      const history = useHistory();
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');
      const [loading, setLoading] = useState(false);
    
      interface LoginResponse {
        token: string;
        error?: string;
      }
  
      const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        try {
          const response = await fetch('http://localhost:3300/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
    
          const data: LoginResponse = await response.json();
    
          if (!response.ok) {
            throw new Error(data.error || 'Error al iniciar sesión');
          }
    
          // Guardar el token y redirigir al usuario
          localStorage.setItem('token', data.token);
          history.push('/home');
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('Error desconocido');
          }
        } finally {
          setLoading(false);
        }
      };
    
      return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1 text-center">
              <div className="flex justify-center mb-4">
                <img
                  src="../assets/Perfil2.jpeg"
                  alt="Logo Heladería"
                  className="w-16 h-16 rounded-full shadow-lg"
                />
              </div>
              <CardTitle className="text-2xl font-bold text-primary">
                Bienvenido a la Heladería
              </CardTitle>
              <p className="text-sm text-gray-500">
                Inicia sesión para continuar
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Correo electrónico"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="password"
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
    
                {error && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
    
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <LogIn className="mr-2 h-5 w-5" />
                      Iniciar Sesión
                    </>
                  )}
                </Button>
    
                <div className="text-center space-y-2">
                  <button
                    type="button"
                    className="text-sm text-primary hover:underline"
                    onClick={() => {/* Implementar recuperación de contraseña */}}
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                  
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      );
  };
  
  export default LoginPage;