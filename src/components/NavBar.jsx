import { Link } from 'react-router-dom';
import { BsCartFill } from "react-icons/bs";

const NavBar = () => {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-xl font-bold">Kiosko de Julia</Link>
                <Link to="/cart" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center">
                    <BsCartFill className='mr-1' />Carrito
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;
