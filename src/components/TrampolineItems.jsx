import { getItems } from "../data/crud.js";
import { useState } from "react";
const Trampoline = () => {
  const [trampoline, setTrampoline] = useState([
    // { name: "zia", price: "testprice", key: "testkey" },
  ]);
  const handleGetItems = async () => {
    setTrampoline(await getItems());
  };

  return (
    <div>
      <h2> Trampoline</h2>
      <div>
        <button onClick={handleGetItems}> Get employees </button>
      </div>
      {trampoline.map((e) => (
        <section key={e.key}>
          {e.name} {e.price}.
        </section>
      ))}
    </div>
  );
};

export default Trampoline;
