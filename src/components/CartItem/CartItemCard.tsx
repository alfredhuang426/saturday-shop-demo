import { FC, useEffect, useRef, useState } from "react";
import { CartItem } from "../../types/cart.type";
import styles from "./CardItemCard.module.scss";
import { NumberInputGroup } from "../numberInputGroup/NumberInputGroup";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDebounce } from "../../custom-hooks/useDebounce";
import axios from "axios";
import { notificationActions } from "../../store/notificationSlice";
import { useDispatch } from "react-redux";

type CartItemCardProps = {
  cartItem: CartItem;
  getCart: () => void;
};

export const CartItemCard: FC<CartItemCardProps> = ({ cartItem, getCart }) => {
  const [cartQuantity, setCartQuantity] = useState(1);
  const debounceCartQuantity = useDebounce(cartQuantity, 1000);
  const isButtonClicked = useRef(false);
  const dispatch = useDispatch();

  const removeCartItem = async () => {
    try {
      const result = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart/${cartItem?.id}`
      );
      await getCart();
      dispatch(
        notificationActions.createMessage({
          success: result?.data?.success,
          id: result?.data?.data?.product_id,
          message: result?.data?.message,
        })
      );
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
        await getCart();
        dispatch(
          notificationActions.createMessage({
            success: result?.data?.success,
            id: result?.data?.data.product_id,
            message: result?.data?.message,
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    if (isButtonClicked.current) {
      updateCartItem();
      isButtonClicked.current = false;
    }
  }, [debounceCartQuantity, cartItem.id]);

  useEffect(() => {
    setCartQuantity(cartItem?.qty);
  }, [cartItem]);

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
        <button type="button" className="btn border-0" onClick={removeCartItem}>
          <FaRegTrashAlt className="text-primary" />
        </button>
      </div>
    </div>
  );
};
