const PopupCard = ({ item, onClose }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">{item.name}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
          </div>
          <p>{item.description}</p>
          {/* Add more item details as needed */}
        </div>
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      </div>
    );
  };
  
  export default PopupCard;
