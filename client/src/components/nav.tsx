import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCounterStore } from "../store";

function Nav() {
  const [show, setshow] = useState(false);
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
  function logout() {
    setshow(false);
    fetch("http://localhost:8000/logout", {
      credentials: "include",
      method: "POST",
    });
    setinfo({ id: null, email: null, name: null });
  }
  const username = user?.name;
  return (
    <div>
      <div className="navbar text-white flex justify-around">
        <h1 className="text-3xl font-bold">Train</h1>

        <div className="navbar-end">
          {username ? (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setshow(!show)}
                className="btn btn-success"
              >
                hi {username}👋
              </button>
              {show && (
                <button onClick={logout} className="btn btn-success">
                  Logout
                </button>
              )}
            </div>
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
