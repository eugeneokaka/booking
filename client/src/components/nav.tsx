import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCounterStore } from "../store";

function Nav() {
  const setinfo = useCounterStore((state) => state.setinfo);
  const user = useCounterStore((state) => state.user);
  useEffect(() => {
    fetch("http://localhost:8000/check", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setinfo(userInfo);
      });
    });
  }, []);
  const username = user?.name;
  return (
    <div>
      <div className="navbar text-white flex justify-around">
        <h1 className="text-3xl font-bold">Train</h1>

        <div className="navbar-end">
          {username ? (
            <button className="btn btn-success">hi {username}👋</button>
          ) : (
            <Link to={"/login"}>
              <button className="btn btn-accent">login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
