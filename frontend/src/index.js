import React from 'react';
import ReactDOM from 'react-dom/client';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import { Provider } from 'react-redux';
import {HelmetProvider} from "react-helmet-async";
import store from './store.js';
import reportWebVitals from './reportWebVitals';
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ShippingScreen from './screens/ShippingScreen.jsx';
import PaymentScreen from './screens/PaymentScreen.jsx';
import PlaceOrderScreen from './screens/PlaceOrderScreen.jsx';
import OrderScreen from './screens/OrderScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import OrderListScreen from './screens/admin/OrderListScreen.jsx';
import ProductListScreen from './screens/admin/ProductListScreen.jsx';
import BlogScreen from './screens/BlogScreen.jsx';
import ProductEditScreen from './screens/admin/ProductEditScreen.jsx';
import UserListScreen from './screens/admin/UserListScreen.jsx';
import UserEditScreen from './screens/admin/UserEditScreen.jsx';
import BlogListScreen from './screens/BlogListScreen.jsx';
import BlogEditScreen from './screens/admin/BlogEditScreen.jsx';


const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index={true} path="/" element={<HomeScreen />} />
			<Route path="/search/:keyword" element={<HomeScreen />} />
			<Route path="/page/:pageNumber" element={<HomeScreen />} />
			<Route
				path="/search/:keyword/page/:pageNumber"
				element={<HomeScreen />}
			/>
			<Route path="/product/:id" element={<ProductScreen />} />
			<Route path="/blogs" element={<BlogListScreen />} />
			<Route path="/blog/:id" element={<BlogScreen />} />
			<Route path="/cart" element={<CartScreen />} />
			<Route path="/auth" element={<LoginScreen />} />
			<Route path="/register" element={<RegisterScreen />} />
			<Route path="" element={<PrivateRoute />}>
				<Route path="/shipping" element={<ShippingScreen />} />
				<Route path="/payment" element={<PaymentScreen />} />
				<Route path="/placeorder" element={<PlaceOrderScreen />} />
				<Route path="/order/:id" element={<OrderScreen />} />
				<Route path="/profile" element={<ProfileScreen />} />
			</Route>
			<Route path="" element={<AdminRoute />}>
				<Route path="/admin/orderlist" element={<OrderListScreen />} />
				<Route path="/admin/productlist" element={<ProductListScreen />} />
				<Route
					path="/admin/productlist/:pageNumber"
					element={<ProductListScreen />}
				/>
				<Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
				<Route path="/admin/userlist" element={<UserListScreen />} />
				<Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
				<Route path="/admin/blog/:id/edit" element={<BlogEditScreen />} />
			</Route>
		</Route>
	)
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<HelmetProvider>
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</HelmetProvider>
	</React.StrictMode>
);


reportWebVitals();
