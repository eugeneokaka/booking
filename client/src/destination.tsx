import Cards from "./components/cards";

function Destination() {
  return (
    <div className="h-3/6">
      <h1 className="text-center text-2xl">Here are some destinations</h1>
      <div className="cardcontainer my-20 ">
        <Cards location="kisumu" price={850} url="/k.jpg" />
        <Cards location="mombasa" price={950} url="/m.jpg" />
      </div>
    </div>
  );
}

export default Destination;
