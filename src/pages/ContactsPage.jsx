import { useSelector, useDispatch } from "react-redux";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Contacts from "../components/Contacts";
import ContactList from "../components/ContactList";
import actions from "../redux/phoneBook/actions";
import { getFilter, getIsLoading } from "../redux/phoneBook/selectors";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

const ContactsPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);

  const filter = useSelector(getFilter); //from redux

  const handleFilter = (filterText) =>
    dispatch(actions.changeFilter(filterText));

  const handleChange = (e) => {
    const filter = e.target.value;

    handleFilter(filter);
  };

  return (
    <Container maxWidth="md">
      <Box bgcolor="info.main" color="info.contrastText" p={2}>
        <span>Find:</span>
        <input
          className="input"
          type="text"
          value={filter}
          name="filter"
          onChange={handleChange}
        />
        <AlertProvider template={AlertTemplate} {...options}>
          <Contacts />
        </AlertProvider>
      </Box>

      {isLoading && <p>Loading...</p>}
      <ContactList />
    </Container>
  );
};

export default ContactsPage;
