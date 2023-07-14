import { useState, useEffect, useContext } from 'react';
import userContext from '../store/user-context';
import { useSubmit } from 'react-router-dom';
import naviItem from '../utils/navi-item';
import { getUserFromLocalStorage } from '../utils/auth';
const baseURL = 'http://localhost:3000/api/v1';

function Navigation() {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);
  const [user, setUser] = useState(null);
  const [active, setActive] = useState(null);
  const submit = useSubmit();
  const userCtx = useContext(userContext);

  let timer;

  useEffect(() => {
    if (profileDropdown && !mouseOver) {
      timer = setTimeout(() => {
        setProfileDropdown(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [profileDropdown, mouseOver]);

  useEffect(() => {
    if (!userCtx.user) {
      let currentUser = getUserFromLocalStorage();
      setUser(currentUser);
    } else {
      setUser(userCtx.user);
    }
  }, [userCtx.user]);

  const mouseOverHandler = () => {
    setMouseOver(true);
  };

  const mouseLeftHandler = () => {
    setMouseOver(false);
  };

  const userProfileDropdown = () => {
    setProfileDropdown(prevState => !prevState);
  };

  const activeHandler = id => {
    setActive(id);
    userCtx.changeContentShown(id);
  };

  const logoutHandler = e => {
    e.preventDefault();
    submit(null, { method: 'post', action: '/logout' });
  };

  return (
    <div className=" bg-white/70 border-2 border-white rounded-lg  backdrop-blur-md w-[25%] flex flex-col justify-between gap-2 h-full">
      <div
        // User's Profile
        onClick={userProfileDropdown}
        onMouseOver={mouseOverHandler}
        onMouseLeave={mouseLeftHandler}
        className="flex items-center pl-4 mt-6 cursor-pointer relative"
      >
        <div className="w-20 h-20 overflow-hidden rounded-full">
          <img
            className="object-cover"
            src={
              user && user.profileImage !== 'default-male.jpg'
                ? `${baseURL}/user/getProfileImage/${user._id}/${user.profileImage}`
                : `images/avatar/default-male.jpg`
            }
            alt={user ? user.profileImage : 'default-user-image'}
          />
        </div>
        <div className="flex flex-col grow text-center text-gray-600">
          <h2 className="font-bold text-2xl">
            {user ? user.displayName : 'Anonymous'}
          </h2>
          <p className="font-semibold">User's Profile</p>
        </div>
        {profileDropdown && (
          <div
            //User's profile dropdown list
            className="absolute top-20 right-2 h-auto w-auto text-center rounded-md bg-blue-500 overflow-hidden"
          >
            <ul className="flex flex-col text-zinc-200 group">
              <li
                onClick={() => {
                  activeHandler(0);
                }}
                className="px-8 py-3 hover:bg-blue-400 hover:text-white transition"
              >
                User's Profile
              </li>
              <li className="px-8 py-3 hover:bg-blue-400 hover:text-white  transition">
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>

      <nav className="mt-8 flex flex-col grow">
        <ul className="flex flex-col">
          {naviItem.map(item => (
            <li
              key={item.id}
              onClick={activeHandler.bind(null, item.id)}
              className={`text-gray-600 text-xl cursor-pointer pl-8 py-4 hover:bg-red-300 ${
                item.id === active
                  ? 'bg-red-400 text-zinc-100 hover:bg-red-400 transition'
                  : ''
              }`}
            >
              {' '}
              {item.icon}
              <span className="ml-2 font-semibold" href={`${item.href}`}>
                {item.title}
              </span>
            </li>
          ))}

          {/* <li className="text-gray-600 text-xl cursor-pointer  pl-8 py-4 hover:bg-red-300">
            <i class="fa-solid fa-wallet"></i>
            <span className="ml-2 font-semibold" href="/">
              Expense
            </span>
          </li>
          <li className="text-gray-600 text-xl cursor-pointer pl-8 py-4 hover:bg-red-300">
            <i class="fa-solid fa-money-bill-transfer"></i>
            <span className="ml-2 font-semibold" href="/">
              View Transaction
            </span>
          </li>
          <li className="text-gray-600 text-xl cursor-pointer pl-8 py-4 hover:bg-red-300">
            <i class="fa-solid fa-chart-line"></i>
            <span className="ml-2 font-semibold" href="/">
              Dashboard
            </span>
          </li> */}
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
