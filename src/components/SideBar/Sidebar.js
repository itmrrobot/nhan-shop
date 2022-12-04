import "./SideBar.css";
import { CartState } from "../../store/Context";
import { useState} from "react";

function Sidebar() {
  const { state, productState, productDispatch } = CartState();
  const [priceFrom, setPriceFrom] = useState(0);
  const [priceTo, setPriceTo] = useState(0);
  const handleClothess = () => {
    productDispatch({ type: "CLOTHESS", payload: "1" });
  };

  const handleFurniture = () => {
    productDispatch({ type: "FURNITURE", payload: "3" });
  };

  const handleElectronics = () => {
    productDispatch({ type: "ELECTRONICS", payload: "2" });
  };

  const handleShoes = () => {
    productDispatch({ type: "SHOES", payload: "4" });
  };

  const handleSubmit = () => {
    productDispatch({ type: "ADD PRICERANGE", payload: [priceFrom, priceTo] });
  };
  return (
    <>
      <h3 className="sidebar-title">Filter By</h3>
      <div className="sidebar-content">
        <div className="sidebar-list">
          <h3 className="sidebar-list-title">Collection</h3>
          <div
            className="sidebar-item"
            onClick={() => productDispatch({ type: "ALL" })}
          >
            All
          </div>
          <div className="sidebar-item" onClick={handleClothess}>
            Clothes
          </div>
          <div className="sidebar-item" onClick={handleElectronics}>
            Electronics
          </div>
          <div className="sidebar-item" onClick={handleFurniture}>
            Furniture
          </div>
          <div className="sidebar-item" onClick={handleShoes}>
            Shoes
          </div>
        </div>
        <div className="sidebar-price">
          <h3 className="sidebar-price-title">Price range</h3>
          <div className="sidebar-price-range">
            <input
              type="text"
              name="number"
              placeholder="FROM"
              className="sidebar-input"
              onChange={(e) => setPriceFrom(e.target.value)}
            />

            <input
              type="text"
              name="number"
              placeholder="TO"
              className="sidebar-input"
              onChange={(e) => setPriceTo(e.target.value)}
            />
          </div>
          <button className="sidebar-price-btn" onClick={handleSubmit}>
            Find
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;