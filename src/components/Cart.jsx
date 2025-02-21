import  { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BsCartDashFill } from "react-icons/bs";

const Cart = ({ cart, removeFromCart }) => {
    const [customerName, setCustomerName] = useState('');
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const sendOrder = () => {
        const orderDetails = cart.map(item => `${item.name} (x${item.quantity}) - $${item.price * item.quantity}`).join('\n');
        const message = `Hola, soy ${customerName} y quisiera hacer un pedido:\n\n${orderDetails}\n\nTotal: $${total}`;
        const whatsappUrl = `https://wa.me/584149127107?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="container mx-auto p-4 text-[#292929]">
            <h1 className="text-3xl font-bold mb-4">Carrito de Compras</h1>
            
            <ul>
                {cart.map((item, index) => (
                    <li key={index} className="flex justify-between items-center border-b p-2">
                        <span>{item.name} (x{item.quantity})</span>
                        <button
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 flex items-center"
                            onClick={() => removeFromCart(index)}
                        >
                            <BsCartDashFill className='mr-2' />Quitar
                        </button>
                    </li>
                ))}
            </ul>
            <div className="mt-4">
                <div className='flex flex-col'>
                    <span className='mt-3 mb-5'>Mas el 10% del servicio playero
                    </span>
                </div>
                <div className='flex'>
                    <input
                        type="text"
                        id="customerName"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="mr-3 w-40 outline-none p-2 border-b border-[#292929] " 
                        placeholder="Ingrese su nombre"
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
                        onClick={sendOrder}
                    >
                        Enviar Pedido al WhatsApp
                    </button>
                </div>
            </div>
            <div className='flex flex-col text-[#fcfcfc]'>
                <Link to="/">
                    <button className="bg-gray-500 text-white px-4 py-2 mt-20 rounded hover:bg-gray-600">
                        Volver al Menú
                    </button>
                </Link>
                <div className='flex rounded-md flex-col m-auto w-50 h-30 mt-10 bg-[#48e]'>
                    <h2 className='m-auto'>Pago Movil</h2>
                    <div className='flex flex-col m-auto'>
                        <span>Banco: BDV</span>
                        <span>Telefono: 04125992105</span>
                        <span>Cedula: 3.367.634</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

Cart.propTypes = {
    cart: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired, // Añadir validación de cantidad
    })).isRequired,
    removeFromCart: PropTypes.func.isRequired,
};

export default Cart;
