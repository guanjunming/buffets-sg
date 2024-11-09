import ReactDOM from "react-dom";

const RestaurantModal = ({
  setShowRestaurantModal,
  name,
  img,
  address,
  time,
  adultPrice,
  childPrice,
  description,
  cuisine,
  website,
  rating,
  review,
}) => {
  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center text-justify"
      onClick={() => setShowRestaurantModal(false)}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Modal content */}
      <div
        className="relative z-10 max-h-[90vh] w-11/12 max-w-4xl overflow-y-auto rounded-lg border-2 border-gray-400 bg-black p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShowRestaurantModal(false)}
          className="absolute right-4 top-4 rounded bg-blue-900 px-4 py-2 text-white hover:cursor-pointer hover:bg-blue-800"
        >
          Close
        </button>
        <h2 className="mb-4 text-2xl font-bold">{name}</h2>
        <img
          src={img}
          alt={name}
          className="aspect-video h-auto w-1/2 border-b border-gray-400 object-cover"
        />
        <p>{description}</p>
        <br></br>
        <p>Address: {address}</p>
        <br></br>
        <p>Opening Hours: {time}</p>
        <br></br>
        <p>Cuisine: {cuisine}</p>
        <br></br>
        <p>Price:</p>
        <p>Adult : {adultPrice}</p>
        <p>Child : {childPrice}</p>
        <br></br>
        <p>Rating: {rating}</p>
        <br></br>
        <p>Reviews: {review}</p>
        <br></br>
        <p>Give a rating:</p>
        {/* star rating */}
        <p>Leave a review:</p>
        {/* input box to post comments */}

        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700"
        >
          Visit Website
        </a>
      </div>
    </div>,
    document.querySelector("#modal-root"), // specify the target root for the portal
  );
};

export default RestaurantModal;
