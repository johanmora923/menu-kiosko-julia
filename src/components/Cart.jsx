import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BsCartDashFill } from "react-icons/bs";

const Cart = ({ cart, removeFromCart }) => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const sendOrder = () => {
        const orderDetails = cart.map(item => `${item.name} (x${item.quantity}) - $${item.price * item.quantity}`).join('\n');
        const message = `Hola, quisiera hacer un pedido:\n\n${orderDetails}\n\nTotal: $${total}`;
        const whatsappUrl = `https://wa.me/584242079712?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Carrito de Compras</h1>
            <ul>
                {cart.map((item, index) => (
                    <li key={index} className="flex justify-between items-center border-b p-2">
                        <span>{item.name} (x{item.quantity})</span>
                        <span>${item.price * item.quantity}</span>
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
                <p className="text-xl font-bold">Total: ${total}</p>
                <button
                    className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
                    onClick={sendOrder}
                >
                    Enviar Pedido por WhatsApp
                </button>
            </div>
            <Link to="/">
                <button className="bg-gray-500 text-white px-4 py-2 mt-4 rounded hover:bg-gray-600">
                    Volver al Menú
                </button>
            </Link>
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
