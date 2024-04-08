import { FC, useState } from "react";
import { CartItem } from "../../types/cart.type";
import styles from "./CartTableRow.module.scss";
import { FaRegTrashAlt } from "react-icons/fa";
import { NumberInputGroup } from "../numberInputGroup/NumberInputGroup";

type CartTableRowProps = {
  cartItem: CartItem;
};

export const CartTableRow: FC<CartTableRowProps> = ({ cartItem }) => {
  const [cartQuantity, setCartQuantity] = useState(cartItem?.qty);

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
        />
      </td>
      <td className="align-middle text-center" width="20%">
        NT${cartItem?.final_total}
      </td>
      <td className="align-middle text-center" width="10%">
        <button type="button" className="btn border-0">
          <FaRegTrashAlt className="text-primary" />
        </button>
      </td>
    </tr>
  );
};
