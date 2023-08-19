import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Allproducts from './screens/allProducts';
import Home from './screens/home';
import Kids from './screens/kids';
import Women from './screens/women';
import Dresseswomen from './screens/Dresseswomen';
import Men from './screens/men';
import Cart from './screens/cart';
import Login from './screens/loginPage';
import Contact from './screens/contactus';
import Signup from './screens/signUp';
import AdminDashboard from './screens/adminDashboard';
import EditProduct from './screens/editProduct';
import WomenPants from './screens/womenPants';
import WomenSkirts from './screens/womenSkirt.js';
import ShirtsMen from './screens/menShirt';
import TrousersMen from './screens/menPants';
import HoodiesMen from './screens/hoodiesMen';
import Detail from './screens/productDetail';
import Checkout from './screens/checkout';
import Profile from './screens/profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allproducts" element={<Allproducts />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/men" element={<Men />} />
          <Route path="/shirts" element={<ShirtsMen />} />
          <Route path="/trousers" element={<TrousersMen />} />
          <Route path="/hoodies" element={<HoodiesMen />} />
          <Route path="/women" element={<Women />} />
          <Route path="/dresses" element={<Dresseswomen />} />
          <Route path="/pants" element={<WomenPants />} />
          <Route path="/skirts" element={<WomenSkirts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard/user" element={<Profile />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/edit-product" element={<EditProduct />} />
          <Route path="/products/:productId" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;