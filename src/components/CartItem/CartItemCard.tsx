import { FC, useEffect, useRef, useState } from "react";
import { CartItem } from "../../types/cart.type";
import styles from "./CardItemCard.module.scss";
import { NumberInputGroup } from "../numberInputGroup/NumberInputGroup";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDebounce } from "../../custom-hooks/useDebounce";
import axios from "axios";

type CartItemCardProps = {
  cartItem: CartItem;
  getCart: () => void;
};

export const CartItemCard: FC<CartItemCardProps> = ({ cartItem,getCart }) => {
  const [cartQuantity, setCartQuantity] = useState(cartItem?.qty);
  const debounceCartQuantity = useDebounce(cartQuantity, 1000);
  const isButtonClicked = useRef(false);

  const removeCartItem = async () => {
    try {
      const result = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart/${cartItem?.id}`
      );
      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const updateCartItem = async () => {
      const data = {
        data: {
          product_id: cartItem?.product_id,
          qty: debounceCartQuantity,
        },
      };
      try {
        const result = await axios.put(
          `/v2/api/${process.env.REACT_APP_API_PATH}/cart/${cartItem?.id}`,
          data
        );
        getCart();
      } catch (error) {
        console.log(error);
      }
    };
    if (isButtonClicked.current) {
      updateCartItem();
      isButtonClicked.current = false;
    }
  }, [debounceCartQuantity, cartItem.id]);

  return (
    <div className={`my-3 px-3 py-3 ${styles["box-shadow"]}`}>
      <div className="d-flex align-items-center mb-3">
        <img
          src={cartItem?.product?.imageUrl}
          alt={cartItem?.product?.title}
          className={`${styles.img}`}
        />
        <span className="ms-3">{cartItem?.product?.title}</span>
        <span className="ms-auto">NT${cartItem?.final_total}</span>
      </div>
      <div className="d-flex">
        <NumberInputGroup
          quantity={cartQuantity}
          setQuantity={setCartQuantity}
          isReadOnly={true}
          isButtonClicked={isButtonClicked}
        />
        <button
          type="button"
          className={`btn btn-outline-primary ms-5 text-primary ${styles["custom-button"]}`}
        >
          <FaRegTrashAlt />
        </button>
      </div>
    </div>
  );
};
