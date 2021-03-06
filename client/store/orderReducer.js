import axios from 'axios';
const SET_ITEMS = 'SET_ITEMS';
const ADD_ITEM = 'ADD_ITEM';
const NEW_ORDER = 'NEW_ORDER;';
const EDIT_ORDER = 'EDIT_ORDER';

export const setItems = (OrderItems) => ({
  type: SET_ITEMS,
  OrderItems,
});

export const addItem = (OrderItem) => ({ type: ADD_ITEM, OrderItem });

const newOrder = () => ({ type: NEW_ORDER });

export const changeItems = (OrderItem) => ({
  type: EDIT_ORDER,
  OrderItem,
});

export const getItems = (id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/orderItems/${id}`, {
        headers: { Authorization: token },
      });
      const OrderItems = response.data;
      dispatch(setItems(OrderItems));
    } catch (error) {
      console.log('test');
      console.log(error);
    }
  };
};

export const addItems = (id, item) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`/api/orderItems/${id}/cart`, item, {
        headers: { Authorization: token },
      });
      const response = await axios.get(`/api/orderItems/${id}`, {
        headers: { Authorization: token },
      });
      const newitem = response.data;
      console.log(newitem);
      dispatch(addItem(newitem));
    } catch (err) {
      console.log(err);
    }
  };
};
export const editItems = (id, item) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`/api/orderItems/${id}/cart`, item, {
        headers: { authorization: token },
      });
      const response = await axios.get(`/api/orderItems/${id}`, {
        headers: { Authorization: token },
      });
      const OrderItems = response.data;
      dispatch(changeItems(OrderItems));
    } catch (err) {
      console.log(err);
    }
  };
};
export const submitOrder = (userId) => async (dispatch) => {
  const response = await axios.patch(`/api/orders/${userId}`);
  const { orderId } = response.data;
  dispatch(newOrder());
};
const itemsState = [];
const OrderItemsReducer = (items = itemsState, action) => {
  switch (action.type) {
    case SET_ITEMS:
      return action.OrderItems;
    case ADD_ITEM:
      return action.OrderItem;
    case NEW_ORDER:
      return [];
    case EDIT_ORDER:
      return action.OrderItem;

    default:
      return items;
  }
};

export default OrderItemsReducer;
