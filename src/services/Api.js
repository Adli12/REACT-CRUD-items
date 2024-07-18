import apisauce from "apisauce";
import { notification, Modal, Row, Col } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { store } from "../NextApp";
import AuthActions from "../appRedux/reducers/AuthRedux";

// Base URL from the provided API
const BASE_URL = "https://crudcrud.com/api/63e1d9c3f0d54476a6b56f231cf67907";

// Create and configure an apisauce-based api object
const create = (baseURL = BASE_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 50000, // 50 seconds
  });

  api.addResponseTransform((response) => {
    if (!response.ok && response.data) {
      const message = response.data.message || "Unknown Error From Backend";
      if (message === "User account is locked") {
        Modal.warning({
          centered: true,
          icon: <ExclamationCircleFilled />,
          content: (
            <div>
              <p>Your account has been locked. Please reset your password to reactivate your account.</p>
            </div>
          ),
          title: (
            <Row type="flex" justify="start" style={{ alignItems: "center" }} gutter={[5, 0]}>
              <Col>
                <span>Warning!</span>
              </Col>
            </Row>
          ),
        });
      } else if (message === "Full authentication is required to access this resource") {
        store.dispatch(AuthActions.userSignOut());
      } else {
        Modal.error({
          centered: true,
          icon: <ExclamationCircleFilled />,
          content: <div><p>{message}</p></div>,
          title: (
            <Row type="flex" justify="start" style={{ alignItems: "center" }} gutter={[5, 0]}>
              <Col>
                <span>Warning!</span>
              </Col>
            </Row>
          ),
        });
      }
    }

    if (!response.ok && response.problem === "TIMEOUT_ERROR") {
      notification.error({
        message: "Error",
        description: "Failed to connect to the server, please check your connection",
      });
    }

    if (!response.ok && response.problem === "NETWORK_ERROR") {
      notification.error({
        message: "Error",
        description: "Cannot connect to the server",
      });
    }

    if (response.ok && response.data && response.data.error) {
      Modal.error({
        centered: true,
        icon: <ExclamationCircleFilled />,
        content: <div><p>{response.data.message || "Unknown Error From Backend"}</p></div>,
        title: (
          <Row type="flex" justify="start" style={{ alignItems: "center" }} gutter={[5, 0]}>
            <Col>
              <span>Warning!</span>
            </Col>
          </Row>
        ),
      });
    }
  });

  // CRUD functions for "peminjaman barang"
  const fetchItems = () => api.get("/items");
  const addItem = (item) => api.post("/items", item);
  const updateItem = (item) => {
    const { _id, ...data } = item; // Extract _id and the rest of the data
    return api.put(`/items/${_id}`, data);
  };
  
  const deleteItem = (itemId) => api.delete(`/items/${itemId}`);

  // Auth functions (as is)
  const authRequest = (data) => api.post("auth/signin", data);
  const logoutRequest = (data) => api.post("auth/signout", data);
  const authForgotPasswordRequest = (data) => api.post("auth/forgot-password", data);
  const authResetPasswordRequest = (data) => api.post("auth/reset-password", data);
  const authChangePasswordRequest = (data) => api.post("auth/change-password", data);

  return {
    // CRUD functions
    fetchItems,
    addItem,
    updateItem,
    deleteItem,
    // Auth functions
    authRequest,
    logoutRequest,
    authForgotPasswordRequest,
    authResetPasswordRequest,
    authChangePasswordRequest,
  };
};

export default {
  create,
};
