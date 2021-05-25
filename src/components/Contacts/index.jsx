import { createUseStyles } from "react-jss";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { v4 as uuidv4 } from "uuid";
import Button from "@material-ui/core/Button";
import { getContacts } from "../../redux/phoneBook/selectors";
import operations from "../../redux/phoneBook/operations";

const useStyles = createUseStyles({
  margin: {
    marginRight: "15px",
  },
});

const initialState = {
  id: "",
  name: "",
  number: "",
};

const Contacts = () => {
  const classes = useStyles();

  const alert = useAlert();
  const dispatch = useDispatch();

  const [state, setState] = useState(initialState);
  const { name, number } = state;

  const contacts = useSelector(getContacts);

  const handleSaveItem = (item) => dispatch(operations.addContact(item));

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: uuidv4(), // uuid
      name,
      number: Number(number),
    };

    if (contacts.some((contact) => contact.name === newItem.name)) {
      alert.show(`Contact is already in contscts.`);
      return;
    }

    handleSaveItem(newItem);
  };

  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className={classes.margin}>
          <span>Name:</span>
          <input
            type="text"
            value={name}
            name="name"
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
          />
        </label>

        <label className={classes.margin}>
          <span>Number:</span>
          <input
            type="tel"
            value={number}
            name="number"
            onChange={handleChange}
            pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
            title="Номер телефона должен состоять из 11-12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
            required
          />
        </label>
        <Button
          className="button"
          type="submit"
          variant="contained"
          color="primary"
        >
          + Add
        </Button>
      </form>
    </>
  );
};

Contacts.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Contacts;
