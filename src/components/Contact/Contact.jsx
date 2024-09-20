import { BsFillTelephoneFill } from "react-icons/bs";
import { IoIosContact } from "react-icons/io";
import css from "./Contact.module.css";
import { deleteContact } from "../../redux/contactsOps";
import { useDispatch } from "react-redux";

const Contact = ({ contactId, name, phone }) => {
  const dispatch = useDispatch();

  const handleClick = contactId => {
    const thunk = deleteContact(contactId);
    dispatch(thunk);
  };

  return (
    <>
    <div className={css.contactCard}>
      <div className={css.contactInfo}>
        <p className={css.contactText}>
          <IoIosContact />
          {name}
        </p>
        <a href={`tel:${phone}`} className={css.contactText}>
          <BsFillTelephoneFill />
          {phone}
        </a>
      </div>

      <button onClick={() => handleClick(contactId)} className={css.contactDeleteBtn}>
        Delete
      </button>
      </div>
    </>
  );
};

export default Contact;