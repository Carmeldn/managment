import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./Components/Auth/AuthContext";
import Sidebar from "./Layouts/sidebar";
import Header from "./Layouts/header";
import Dashboard from "./Home/dashboard";
import CategoryList from "./Components/Categorys/CategoryList";
import AddCategory from "./Components/Categorys/AddCategory";
import EditCategory from "./Components/Categorys/EditCategory";
import ProductList from "./Components/Products/ProductList";
import AddProduct from "./Components/Products/AddProduct";
import EditProduct from "./Components/Products/EditProduct";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import CustomerList from "./Components/Customers/CustomerList"
import AddCustomer from "./Components/Customers/AddCustomer"
import EditCustomer from "./Components/Customers/EditCustomer"
import OrderList from "./Components/Orders/OrderList";
import AddOrder from "./Components/Orders/AddOrder";
import EditOrder from "./Components/Orders/EditOrder";
import "./styles/main.css";

function LayoutWrapper({ children }) {
  const location = useLocation();
  const authRoutes = ["/login", "/register"];
  const { isAuthenticated } = useAuth();

  
  if (!isAuthenticated && !authRoutes.includes(location.pathname)) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="app-container">
      {!authRoutes.includes(location.pathname) && <Sidebar />}
      <div className="main-content">
        {!authRoutes.includes(location.pathname) && <Header />}
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
 
function App() {
  return (
    <AuthProvider>
      <Router>
        <LayoutWrapper>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/add-category" element={<AddCategory />} />
            <Route path="/edit-category/:id" element={<EditCategory />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/add-customer" element={<AddCustomer />} />
            <Route path="/edit_customer/:id" element={<EditCustomer />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path='/add-order' element={<AddOrder/>}/>
            <Route path='/edit-order' component={<EditOrder/>}/>
            
            

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </LayoutWrapper>
      </Router>
    </AuthProvider>
  );
}

export default App;
