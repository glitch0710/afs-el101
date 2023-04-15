import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/product/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data.id,
      name: data.name,
      image: data.image,
      price: data.price,
      count_in_servings: data.count_in_servings,
      qty,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
