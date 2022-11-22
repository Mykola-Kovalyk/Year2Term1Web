import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Footer from './components/Footer';
import './index.css';
import Navigation from './components/Navigation';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./data/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Header />
      <Navigation />
      <Footer />
    </Provider>
  </BrowserRouter>
);
