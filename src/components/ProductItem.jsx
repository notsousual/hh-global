import { roundToNearestPenny, salesTaxCoef } from "../helpers/utilities";
import { DeleteButton } from "./DeleteButton";
import "./ProductItem.scss";
import { Toggle } from "./Toggle";

export const ProductItem = ({ product, onUpdate, onDelete }) => {
  const handleCheckboxChange = () =>
    onUpdate({ ...product, taxFree: !product.taxFree });

  const salesTax = product.taxFree
    ? 0
    : roundToNearestPenny(product.price * salesTaxCoef);
  const totalPrice = roundToNearestPenny(product.price + salesTax);

  return (
    <div className="product-item">
      <h2 className="product-item__header">{product.name}</h2>
      <div className="product-item__prices">
        <p>Price: ${product.price}</p>
        <p>Sales tax: ${salesTax}</p>
        <p>
          <b>Total price: ${totalPrice}</b>
        </p>
      </div>
      <div className="product-item__footer">
        <Toggle
          text={"Tax free"}
          checked={product.taxFree}
          onChange={handleCheckboxChange}
        />

        <DeleteButton
          text={"Delete"}
          onClick={() => onDelete(product.id)}
          variant={"red"}
        />
      </div>
    </div>
  );
};
