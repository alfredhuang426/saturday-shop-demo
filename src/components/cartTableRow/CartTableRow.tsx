import { FC, useCallback, useEffect, useRef, useState } from "react";
import { CartItem } from "../../types/cart.type";
import styles from "./CartTableRow.module.scss";
import { FaRegTrashAlt } from "react-icons/fa";
import { NumberInputGroup } from "../numberInputGroup/NumberInputGroup";
import { useDebounce } from "../../custom-hooks/useDebounce";
import axios from "axios";

type CartTableRowProps = {
  cartItem: CartItem;
  getCart: () => void;
};

export const CartTableRow: FC<CartTableRowProps> = ({ cartItem, getCart }) => {
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
    <tr>
      <td className="align-middle py-3" width="50%">
        <img
          src={cartItem?.product?.imageUrl}
          alt={cartItem?.product?.title}
          className={`${styles.img}`}
        />
        <span className="ms-3">{cartItem?.product?.title}</span>
      </td>
      <td className="align-middle" width="20%">
        <NumberInputGroup
          quantity={cartQuantity}
          setQuantity={setCartQuantity}
          isReadOnly={true}
          isButtonClicked={isButtonClicked}
        />
      </td>
      <td className="align-middle text-center" width="20%">
        NT${cartItem?.final_total}
      </td>
      <td className="align-middle text-center" width="10%">
        <button type="button" className="btn border-0" onClick={removeCartItem}>
          <FaRegTrashAlt className="text-primary" />
        </button>
      </td>
    </tr>
  );
};
