import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import Settings from "./Settings";
import Notes from "./Notes";
import Contact from "./Contact";
import Common from "./Common";
import peminjamanBarangReducer from './reducers'; // Correct import

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    settings: Settings,
    notes: Notes,
    contact: Contact,
    common: Common,
    template: require("./TemplateRedux").reducer,
    auth: require("./AuthRedux").reducer,
    comments: require("./CommentsRedux").reducer,
    modalinfo: require("./ModalInfoRedux").reducer,
    loadingoverlay: require("./LoadingOverlayRedux").reducer,
    peminjamanBarang: peminjamanBarangReducer, // Correct addition
  });

export default createRootReducer;
