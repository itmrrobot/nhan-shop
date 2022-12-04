import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { DefaultLayout,AdminLayout } from './components/Layout';
import {publicRoutes,privateRoutes} from './routes';
import { AuthState } from './store/AuthProvider';


function App() {
  const {auth:{role}} = AuthState();
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route,index) => {
            const Page = route.Component;
            const Layout = DefaultLayout;
            return <Route key={index} path={route.path} element={
              <Layout>
                <Page />
              </Layout>
            }/>
          })}
          {role==='admin'&&privateRoutes.map((route,index) => {
            const Page = route.Component;
            const Layout = AdminLayout;
            return <Route key={index} path={route.path} element={
              <Layout>
                <Page />
              </Layout>
            }/>
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
