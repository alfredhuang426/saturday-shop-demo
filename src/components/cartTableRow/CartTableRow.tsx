import { FC, useEffect, useRef, useState } from "react";
import { CartItem } from "../../types/cart.type";
import styles from "./CartTableRow.module.scss";
import { FaRegTrashAlt } from "react-icons/fa";
import { NumberInputGroup } from "../numberInputGroup/NumberInputGroup";
import { useDebounce } from "../../custom-hooks/useDebounce";
import axios from "axios";
import {
  createAsyncMessage,
  notificationActions,
} from "../../store/notificationSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { Spinner } from "../spinner/Spinner";

type CartTableRowProps = {
  cartItem: CartItem;
  getCart: () => void;
};

export const CartTableRow: FC<CartTableRowProps> = ({ cartItem, getCart }) => {
  const [cartQuantity, setCartQuantity] = useState(1);
  const debounceCartQuantity = useDebounce(cartQuantity, 1000);
  const isButtonClicked = useRef(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isRemoveLoading, setIsRemoveLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const removeCartItem = async () => {
    try {
      const result = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart/${cartItem?.id}`
      );
      (async () => {
        setIsRemoveLoading(true);
        await getCart();
        setIsRemoveLoading(false);
        dispatch(
          createAsyncMessage({
            success: result?.data?.success,
            message: result?.data?.message,
          })
        );
      })();
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
        (async () => {
          setIsUpdateLoading(true);
          await getCart();
          setIsUpdateLoading(false);
          dispatch(
            createAsyncMessage({
              success: result?.data?.success,
              message: result?.data?.message,
            })
          );
        })();
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
        {isUpdateLoading && (
          <div className="d-flex justify-content-center">
            <Spinner />
          </div>
        )}
        {!isUpdateLoading && (
          <NumberInputGroup
            quantity={cartQuantity}
            setQuantity={setCartQuantity}
            isReadOnly={true}
            isButtonClicked={isButtonClicked}
          />
        )}
      </td>
      <td className="align-middle text-center" width="20%">
        NT${cartItem?.final_total}
      </td>
      <td className="align-middle text-center" width="10%">
        {isRemoveLoading && (
          <div className="d-flex justify-content-center">
            <Spinner />
          </div>
        )}
        {!isRemoveLoading && (
          <button
            type="button"
            className="btn border-0"
            onClick={removeCartItem}
          >
            <FaRegTrashAlt className="text-primary" />
          </button>
        )}
      </td>
    </tr>
  );
};
