import { createUseStyles } from "react-jss";
import { useSelector, useDispatch } from "react-redux";
import operations from "../../redux/phoneBook/operations";
import { getContact } from "../../redux/phoneBook/selectors";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const useStyles = createUseStyles({
  item: {
    display: "flex",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    color: "#b30047",
  },
  button: {
    height: "25px",
  },
  margin: {
    marginRight: "15px",
  },
});

const ContactItem = ({ contactID }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const contact = useSelector(getContact(contactID)); //from redux
  const { name, id, number } = contact;

  const handleDeleteItem = () => dispatch(operations.deleteContact(id));

  return (
    <li key={id} className={classes.item}>
      <Box color="info.main" className={classes.margin}>
        {name}
      </Box>

      <Box color="info.main" className={classes.margin}>
        {number}
      </Box>

      <Button
        className={classes.button}
        id={id}
        type="button"
        onClick={handleDeleteItem}
        variant="contained"
        color="primary"
      >
        Delete
      </Button>
    </li>
  );
};

export default ContactItem;
