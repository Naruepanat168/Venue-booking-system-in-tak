import CustomNavbar from '../src/components/layouts/Navbar';
import { Switch, Route } from 'react-router-dom';
import RegistrationForm from './components/pages/auth/register';
import Login from './components/pages/auth/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { currentUser } from './components/functions/auth';
import UserRoute from './components/routes/userRoute';
import AdminRoute from './components/routes/AdminRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/pages/1admin/dashboard'
import createHotelpage from './components/pages/1admin/createHotelpage';
import editHotel from './components/pages/1admin/editHotel';
import viewHotel from './components/pages/1admin/viewHotel';
import Home from './components/pages/home';



function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const idTokenResult = localStorage.token;
    if (idTokenResult) {
      currentUser(idTokenResult).then(res => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            name: res.data.name,
            token: idTokenResult,
            role: res.data.role,
            id: res.data._id
          }
        })
      }).catch(err => {
        dispatch({
          type: 'LOGOUT',
          payload: null
        });
        console.log(err);
      })
    }
  }, [dispatch]);

  return (
    <div className="App">
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
      <ToastContainer />
      <CustomNavbar />
      <Switch>

        <Route exact path="/"  />
        <Route exact path="/hotel"component={Home}  />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={RegistrationForm} />
        <AdminRoute exact path="/admin/dashboard" component={Dashboard} />
        <AdminRoute exact path="/admin/createHotelpags" component={createHotelpage}  />
        <AdminRoute exact path="/admin/editHotel" component={editHotel}/>
        <AdminRoute exact path="/admin/viewHotel" component={viewHotel}/>
        <UserRoute exact path="/user/dashboard"  />

      </Switch>
    </div>
  );
}

export default App;
