import { Link } from "react-router-dom";
import { useCounterStore } from "../store";
type Props = {
  location: string;
  url: string;
  price: number;
};

function Cards({ location, price, url }: Props) {
  const setbook = useCounterStore((state) => state.setbook);
  const user = useCounterStore((state) => state.user);
  const username = user?.name;
  return (
    <div>
      <div className="carditem card card-compact bg-base-100 w-96 shadow-xl">
        <figure>
          <img src={url} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{location}</h2>
          <p className="text-lg font-normal">price {price}</p>

          {username ? (
            <Link
              onClick={() => setbook({ destination: location, price: price })}
              to={`/book?location=${location}&price=${price}`}
            >
              <div className="card-actions justify-end">
                <button className="btn btn-primary w-50 mx-auto">
                  Book now
                </button>
              </div>
            </Link>
          ) : (
            <Link
              onClick={() => setbook({ destination: location, price: price })}
              to={"/login"}
            >
              <div className="card-actions justify-end">
                <button className="btn btn-primary w-50 mx-auto">
                  Book now
                </button>
              </div>
            </Link>
          )}
          {/* {username ? <h1>in</h1> : <h1>no in</h1>} */}
        </div>
      </div>
    </div>
  );
}

export default Cards;
