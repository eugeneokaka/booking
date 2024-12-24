import { useParams, useSearchParams } from "react-router-dom";
import { useCounterStore } from "./store";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
function Book() {
  const [search] = useSearchParams();
  const location = search.get("location");
  const prices = search.get("price");
  const setinfo = useCounterStore((state) => state.setinfo);

  const [seats, setseats] = useState(0);
  const [email, setemail] = useState("");
  const [priceperseat, setpriseat] = useState(prices);
  const [date, setdate] = useState<Date | undefined>(undefined);
  const user = useCounterStore((state) => state.user);
  const [redirect, setRedirect] = useState(prices);
  const [id, setid] = useState(user.id);

  const [price, setprice] = useState(prices);
  const pricecalculate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const argumnt = parseInt(e.target.value);
    setseats(argumnt);

    setprice(argumnt * priceperseat);
  };
  const hanldedate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectdate = e.target.value ? new Date(e.target.value) : undefined;
    setdate(selectdate);
    // console.log(selectdate);
  };
  useEffect(() => {
    fetch("http://localhost:8000/check", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setid(userInfo.id);
        setinfo(userInfo);
      });
    });
  }, []);

  //   console.log(user);

  async function login(ev: React.ChangeEvent<HTMLInputElement>) {
    ev.preventDefault();
    const response = await fetch("http://localhost:8000/book/test", {
      method: "POST",
      body: JSON.stringify({
        email,
        price,
        seats,
        date,
        destination: location,
      }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      response.json().then((userInfo) => {
        setinfo(userInfo);
        console.log(userInfo);
        if (userInfo.mess == "booking succesful") {
          alert("succes 🎉🎉🎉");
        } else {
          alert(userInfo.mess);
        }
        // setRedirect(true);
      });
    }
    // if (response.status == 401) {
    //   alert("you are not looged in");
    // } else {
    //   alert("wrong credentials");
    // }
  }
  //   console.log(user);
  //   console.log(date, "id", id, "seats", seats, "price", price, location);
  return (
    <div>
      <h1 className="text-center mt-5 text-2xl">
        Book your ticket to {location}
      </h1>
      <form>
        <div className="w-8/12 mx-auto mt-20 flex flex-col gap-4">
          <label className="input input-bordered flex items-center gap-2">
            date
            <input
              onChange={hanldedate}
              type="date"
              className="grow"
              placeholder="enter date"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            seats
            <input
              onChange={pricecalculate}
              type="text"
              className="grow"
              placeholder="enter number of seats"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            email
            <input
              onChange={(e) => setemail(e.target.value)}
              type="text"
              className="grow"
              placeholder="enter email"
            />
          </label>
          <button className="btn btn-secondary">price:{price}</button>

          <button type="submit" onClick={login} className="btn btn-primary">
            submit
          </button>
          {seats}
          <p>price {price}</p>
        </div>
      </form>
    </div>
  );
}

export default Book;
