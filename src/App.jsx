import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu.jsx';
import Cart from './components/Cart.jsx';
import NavBar from './components/NavBar.jsx';

const App = () => {
    const [cart, setCart] = useState([]);

    const addToCart = (dish) => {
        setCart([...cart, dish]);
    };

    const removeFromCart = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    };

    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Menu addToCart={addToCart} />} />
                <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
            </Routes>
        </Router>
    );
};

export default App;
