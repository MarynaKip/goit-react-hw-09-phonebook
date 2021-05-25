import axios from "axios";
import actions from "./actions";

axios.defaults.baseURL = "https://connections-api.herokuapp.com";

const getContacts = () => (dispatch) => {
  dispatch(actions.fetchContactsRequest());

  axios
    .get("/contacts")
    .then(({ data }) => dispatch(actions.fetchContactsSuccess(data)))
    .catch((error) => dispatch(actions.fetchContactsError(error)));
};

const addContact = ({ name, number }) => (dispatch) => {
  const contacts = { name, number };

  dispatch(actions.addContactRequest());

  axios
    .post("/contacts", contacts)
    .then(({ data }) => dispatch(actions.addContactSuccess(data)))
    .catch((error) => dispatch(actions.addContactError(error)));
};

const deleteContact = (id) => (dispatch) => {
  dispatch(actions.deleteContactRequest());

  axios
    .delete(`/contacts/${id}`)
    .then(() => dispatch(actions.deleteContactSuccess(id)))
    .catch((error) => dispatch(actions.deleteContactError(error)));
};

export default { getContacts, addContact, deleteContact };
