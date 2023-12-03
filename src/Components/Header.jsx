import React,{useState} from 'react'
import { Link } from 'react-router-dom';
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="bg-white">
    <div className="flex p-2 justify-between items-center ">
    <div className="flex items-center">
            <img className="z-10 h-10 md:mr-2" alt="logo" src="https://static.vecteezy.com/system/resources/thumbnails/005/567/661/small_2x/rupee-icon-indian-currency-symbol-illustration-coin-symbol-free-vector.jpg"/>
            <div className="text-xl font-bold hidden md:block">WebPe</div>
        </div>
       
        <div className={`${isMenuOpen ? 'absolute top-[6%] left-0 w-full bg-white py-2 shadow-md' : 'hidden md:block md:min-h-fit md:flex md:w-fit md:h-fit md:top-[0%] bg-white'}`}>
        
            <ul className="flex flex-col align-middle items-center md:flex-row  gap-[4vh]">
                <li onClick={toggleMenu} className="cursor-pointer hover:text-lg hover:text-blue-300 w-[100px]  text-center">
                <Link to="/">Home</Link>
                </li>
                <li onClick={toggleMenu} className="cursor-pointer hover:text-lg w-[100px] hover:text-blue-300  text-center">
                <Link to="/transactions">Transactions</Link>
                </li>
                <li onClick={toggleMenu} className="cursor-pointer hover:text-lg w-[100px] hover:text-blue-300  text-center">
                <Link to="/data">Data</Link>
                </li>
            </ul>
        </div>
        <div className="flex block md:hidden">
        <button
        className="text-xl focus:outline-none"
        onClick={toggleMenu}
        >
        &#9776;
      </button>

        </div>
    </div>
    
    </div>
  )
}

export default Header;
