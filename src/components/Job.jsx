import React, { useState, useMemo } from "react";
import { Toggle } from "./Toggle";
import { DeleteButton } from "./DeleteButton";
import {
  generateUniqueId,
  roundToNearestPenny,
  calculateJobPrice,
} from "../helpers/utilities";
import { ProductItem } from "./ProductItem";
import "./Job.scss";

export const Job = ({ jobContent, onDeleteJob }) => {
  const [job, setJob] = useState(jobContent);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    taxFree: false,
  });

  const priceDetails = useMemo(() => calculateJobPrice(job), [job]);

  const updateProduct = (updatedProduct) => {
    setJob((prevJob) => ({
      ...prevJob,
      items: prevJob.items.map((item) =>
        item.id === updatedProduct.id ? updatedProduct : item
      ),
    }));
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    const priceValue = parseFloat(newProduct.price);
    if (isNaN(priceValue) || priceValue < 0.01) {
      alert("Please enter a valid price greater than 0.01.");
      return;
    }
    setJob((prevJob) => ({
      ...prevJob,
      items: [
        ...prevJob.items,
        {
          ...newProduct,
          price: roundToNearestPenny(priceValue),
          id: generateUniqueId(),
        },
      ],
    }));
    setNewProduct({ name: "", price: "", taxFree: false });
  };

  return (
    <div className="job">
      <div className="job__header">
        <h1 className="job__header__title">{job.name}</h1>

        <div className="job__header__corner">
          <Toggle
            text={"Extra margin"}
            checked={job.extraMargin}
            onChange={() => setJob({ ...job, extraMargin: !job.extraMargin })}
          />

          <DeleteButton text={"Delete job"} onClick={onDeleteJob} />
        </div>
      </div>
      <div className="job__product-list">
        {job.items.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onUpdate={updateProduct}
            onDelete={(id) =>
              setJob({
                ...job,
                items: job.items.filter((item) => item.id !== id),
              })
            }
          />
        ))}
      </div>

      <div className="job__total">
        <div className="job__total--general">
          <p> Total tax </p>
          <p>${priceDetails.totalTax}</p>
        </div>
        <div className="job__total--general">
          <p> Total margin </p>
          <p>${priceDetails.margin}</p>
        </div>
        <div className="job__total--general">
          <p> Total pre-tax price</p>
          <p>${priceDetails.preTaxPrice}</p>
        </div>
        <div className="job__total--final">
          <h2 title="Total price with margin rounded to nearest even number">
            Total price
          </h2>
          <h2>${priceDetails.finalPrice}</h2>
        </div>
      </div>

      <div className="add-product">
        <h2 className="add-product__header">Add a new product</h2>
        <form onSubmit={handleProductSubmit} className="add-product__form">
          <div className="add-product__form__block">
            <input
              type="text"
              placeholder="Product Name"
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              required
              className="add-product__form__block__name"
            />
            <input
              type="number"
              placeholder="Product Price"
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: e.target.value,
                })
              }
              min="0.01"
              step="0.01"
              required
              className="add-product__form__block__price"
            />
          </div>

          <Toggle
            text={"Tax free"}
            checked={newProduct.taxFree}
            onChange={(e) =>
              setNewProduct({ ...newProduct, taxFree: e.target.checked })
            }
          />
          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
};
