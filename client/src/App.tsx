import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from 'store';
import Routes from 'routes';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <Router>
    <div className="App">
      <Provider store={store}>
        <Routes />
      </Provider>
      <ToastContainer />
    </div>
  </Router>
);

export default App;
