import { getAllOrders } from "@/services/OrderServices";

const Order = async () => {
  const data = await getAllOrders();
  console.log("Orders:", data);

  return (
    <div className="flex flex-col gap-4">
      {data.map((item) => (
        <div
          className="bg-gray-400 rounded-lg p-4 flex flex-col gap-2"
          key={item.id}
        >
          <p>id : {item.id}</p>
          <p>status : {item.status}</p>
          <p>username : {item.username}</p>
          <p>address : {item.address}</p>
          <div className="flex flex-col gap-3  bg-cyan-100 p-3 rounded-lg">
            {" "}
            <p>Total number of products : </p>
            <ul className="list-disc">
              {item.cardItems.map((card) => (
                <li key={card.id} className="ms-8">
                  Product ID: {card.id},
                  Quantity: {card.qty}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Order;
