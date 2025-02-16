import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <nav>
        <div className="flex h-screen fixed">
          <div>
            <ul className="bg-gray-400">
              <li className="mx-4 my-6 md:my-0">
                <Link to="/">Home Main</Link>
              </li>
              <li className="mx-4 my-6 md:my-0">
                <Link to="/about">About</Link>
              </li>
            </ul>
          </div>
          <div>home</div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
