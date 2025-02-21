import  { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BsCartFill, BsCartPlusFill } from "react-icons/bs";

const Menu = ({ addToCart }) => {
    const dishes = [
        { id: 1, name: 'EMPANADAS GRANDES', price: 1.70, image: '/empanadas.jpg' },
        { id: 2, name: 'TOSTON 12 PIEZAS', price: 10, image: '/tostones12.jpeg' },
        { id: 3, name: 'TOSTON 15 PIEZAS', price: 15, image: '/tostones.jpeg'},
        { id: 4, name: 'RONCADOR GRANDE', price: 15, image: '/roncadorG.jpeg' },
        { id: 5, name: 'COMBO RONCADOR GRANDE', price: 25, image: '/roncadorGcombo.jpeg'},
        { id: 6, name: 'COMBO RONCADOR MEDIANO', price: 20, image: '/roncadorMcombo.jpeg' },
        { id: 7, name: 'PARGO', price: 18, image: '/pargo.jpeg' },
        { id: 8, name: 'COMBO DE PARGO GRANDE', price: 30, image: '/pargoGcombo.jpeg' },
        { id: 9, name: 'COMBO DE PARGO MEDIANO', price: 25, image: '/pargoMcomb.jpeg' },
        { id: 10, name: 'RUEDA DE PESCADO MEDIANO', price: 20, image: 'rueda.jpeg'},
        { id: 11, name: 'POLLO FRITO 1/4', price: 13, image: '/pollo22.jpeg' },
        { id: 12, name: 'POLLO FRITO (6 PIEZAS)', price: 20, image: '/pollo66.png'  },
        { id: 13, name: 'POLLO FRITO (12 PIEZAS)', price: 30, image:'/pollo12.webp' },
        { id: 14, name: 'SOPA', price: 10, image: '/sopa.jpeg' },
        { id: 15, name: 'FOSFORERA', price: 15, image: '/fosforera.jpeg' },
        { id: 16, name: 'CALAMARES REBOSADOS', price: 35, image: 'calamares.jpeg' },
        { id: 17, name: 'CAMARONES REBOSADOS', price: 35, image: 'camarones.jpeg' },
        { id: 18, name: 'PARRILLAS', price: 35, image: '/parrilla.jpg' },
        { id: 19, name: 'REFRESCOS DE 2 LITROS', price: 4, image: '/refrescos.jpeg' },
        { id: 20, name: 'AGUA MINERAL', price: 3, image: '/agua.jpeg' },
        { id: 21, name: 'JUGO GRANDE', price: 3, image: '/jugo.jpeg' },
        { id: 22, name: 'CAVA DE 10 CERVEZAS CON HIELO', price: 10, image: '/cervezas.jpeg' },
        { id: 23, name: 'CAJA DE CERVEZAS CON HIELO', price: 28, image: '/cajacerveza.jpeg' },
        { id: 24, name: 'BOLSA DE HIELO', price: 4, image: '/hielo.jpeg' },
    ];

    const [quantities, setQuantities] = useState(dishes.reduce((acc, dish) => ({ ...acc, [dish.id]: 1 }), {}));
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedDish, setSelectedDish] = useState(null);

    const handleQuantityChange = (id, amount) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [id]: Math.max(1, prevQuantities[id] + amount) // Evita cantidades menores a 1
        }));
    };

    const handleAddToCart = (dish) => {
        addToCart({ ...dish, quantity: quantities[dish.id] });
        setSelectedDish(dish);
        setShowConfirmation(true);
    };

    const closeConfirmation = () => {
        setShowConfirmation(false);
    };

    return (
        <div className="container text-[#292929] mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Menú</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {dishes.map(dish => (
                    <div key={dish.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img src={dish.image} alt={dish.name} className=" w-full sm:h-48 object-cover  max-h-[300px]"/>
                        <div className="p-4">
                            <h2 className="text-xl font-bold mb-2">{dish.name}</h2>
                            <div className="flex items-center mb-4">
                                <button
                                    className="bg-gray-200 px-2 py-1 rounded-l hover:bg-gray-300"
                                    onClick={() => handleQuantityChange(dish.id, -1)}
                                >
                                    -
                                </button>
                                <input
                                    type="text"
                                    value={quantities[dish.id]}
                                    readOnly
                                    className="w-12 text-center border"
                                />
                                <button
                                    className="bg-gray-200 px-2 py-1 rounded-r hover:bg-gray-300"
                                    onClick={() => handleQuantityChange(dish.id, 1)}
                                >
                                    +
                                </button>
                            </div>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
                                onClick={() => handleAddToCart(dish)}
                            >
                                <BsCartPlusFill className='mr-2' /> Agregar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <Link to="/cart">
                <button className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-600 flex items-center">
                    <BsCartFill className='mr-1' /> Carrito
                </button>
            </Link>
            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
                        <h2 className="text-2xl font-bold mb-4">¡Agregado al Carrito!</h2>
                        <p>{selectedDish.name} ha sido agregado a tu carrito.</p>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
                            onClick={closeConfirmation}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

Menu.propTypes = {
    addToCart: PropTypes.func.isRequired,
};

export default Menu;
