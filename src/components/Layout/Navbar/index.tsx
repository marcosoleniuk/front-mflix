import { Link } from 'react-router-dom';
import { Search, Bell, User } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="fixed w-full bg-black bg-opacity-90 z-50">
      <div className="px-4 md:px-16 py-6 flex items-center">
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          <Link to="/series" className="text-white hover:text-gray-300">Series</Link>
          <Link to="/movies" className="text-white hover:text-gray-300">Movies</Link>
          <Link to="/new" className="text-white hover:text-gray-300">New & Popular</Link>
          <Link to="/mylist" className="text-white hover:text-gray-300">My List</Link>
        </div>
        <div className="flex ml-auto gap-7 items-center">
          <Search className="text-gray-200 cursor-pointer" size={24} />
          <Bell className="text-gray-200 cursor-pointer" size={24} />
          <User className="text-gray-200 cursor-pointer" size={24} />
        </div>
      </div>
    </nav>
  );
};