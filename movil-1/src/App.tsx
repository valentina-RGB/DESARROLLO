import { Redirect, Route, useHistory } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact, IonTabs, IonTabBar, IonTabButton, IonLabel, IonIcon, IonButton } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import LoginPage from './pages/login';
import CerrarSesion from './components/Logout';
import Home from './pages/Home';
import ViewMessage from './pages/ViewMessage';
import { storefrontOutline, clipboardOutline, logOutOutline } from 'ionicons/icons';
import PrivateRoute from './components/PrivateRoute ';
import VentasList from './pages/VentasList';
import PedidosList from './pages/PedidosList';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import { IonHeader, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import { searchCircle } from 'ionicons/icons';
setupIonicReact();

setupIonicReact();

const App: React.FC = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Eliminar el token del localStorage
    localStorage.removeItem('token');

    // Redirigir al login de manera forzada para evitar problemas con history.push
    window.location.href = '/login'; // Redirige a la página de login de forma inmediata
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/login" exact={true}>
              <LoginPage />
            </Route>
            <Route path="/" exact={true}>
              <Redirect to="/login" />
            </Route>
            <PrivateRoute path="/home" exact={true}>
              <VentasList />
            </PrivateRoute>
            <PrivateRoute path="/message/:id" exact={true}>
              <ViewMessage />
            </PrivateRoute>
            <PrivateRoute path="/ventas" exact={true}>
              <VentasList /> {/* Aquí se muestra la vista de VentasList */}
            </PrivateRoute>
            <PrivateRoute path="/pedidos" exact={true}>
              <PedidosList /> {/* Vista de PedidosList */}
            </PrivateRoute>
          </IonRouterOutlet>
          {/* Barra de Navegación */}
          <IonTabBar slot="bottom">
            <IonTabButton tab="ventas" href="/ventas">
              <IonIcon icon={storefrontOutline} />
              <IonLabel>Ventas</IonLabel>
            </IonTabButton>
            <IonTabButton tab="pedidos" href="/pedidos">
              <IonIcon icon={clipboardOutline} />
              <IonLabel>Pedidos</IonLabel>
            </IonTabButton>
            <IonTabButton tab="cerrarSesion" onClick={handleLogout}> {/* Ejecuta el logout aquí */}
              <IonIcon icon={logOutOutline} />
              <IonLabel>Cerrar Sesión</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;