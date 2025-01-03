import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useCounterStore } from "./store";
function Signup() {
  const [name, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const setinfo = useCounterStore((state) => state.setinfo);
  const user = useCounterStore((state) => state.user);
  console.log(user);

  async function login(ev: React.ChangeEvent<HTMLInputElement>) {
    ev.preventDefault();
    const response = await fetch("http://localhost:8000/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, password, email }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((userInfo) => {
        setinfo(userInfo);
        console.log(userInfo);
        if (userInfo.token) {
          alert("succes 🎉🎉🎉");
        }
        setRedirect(true);
      });
    } else {
      alert("wrong credentials");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      <h1 className="text-center text-2xl font-bold mt-7">Sign up</h1>
      <form>
        <div className="w-8/12 mx-auto mt-20 flex flex-col gap-4">
          <label className="input input-bordered flex items-center gap-2">
            Name
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="grow"
              placeholder="name"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Password
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="grow"
              placeholder="password"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Email
            <input
              onChange={(e) => setemail(e.target.value)}
              type="text"
              className="grow"
              placeholder="email"
            />
          </label>
          <button type="submit" onClick={login} className="btn btn-primary">
            submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
