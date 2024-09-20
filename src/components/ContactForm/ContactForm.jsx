import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";;
import css from "./ContactForm.module.css";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";

const phoneRegExp = /^[\d-]+$/;
  const ContactSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Too Short. Should be more than 3 symbols!")
      .max(50, "Too Long. Should be less than 50 symbols!")
      .required("Required"),
    number: Yup.string()
      .min(3, "Too Short. Should be more than 3 symbols!")
      .max(50, "Too Long. Should be less than 50 symbols!")
      .matches(phoneRegExp, "Invalid phone number!")
      .required("Required"),
  });

  const fieldValues = {
    username: '',
    number: '',
  };

  const ContactForm = () => {
    const dispatch = useDispatch();
  
    const handleSubmit = (values, actions) => {
      const name = values.username;
      const number = values.number;
      
      const userProfile = {
        name,
        number,
      };
        const thunk = addContact(userProfile);
        dispatch(thunk);
        
        actions.resetForm();
      };
    
    return (
      <Formik
        initialValues={fieldValues}
        onSubmit={handleSubmit}
        validationSchema={ContactSchema}
      >
        <Form className={css.form}>
          <div className={css.formInputWrapper}>
          <label className={css.label}>
            <span className={css.labelName}>Name</span>
            <Field
              name="username"
              type="text"
              placeholder="Enter name"
              className={css.formInput}
            />
            <ErrorMessage
              name="username"
              component="span"
              className={css.formInputErrorMsg}
            />
          </label>
          </div>
          <div className={css.formInputWrapper}>
          <label className={css.label}>
            <span className={css.labelName}>Number</span>
            <Field
              name="number"
              type="tel"
              placeholder="Enter phone"
              className={css.formInput}
            />
            <ErrorMessage name="number" component="span" className={css.formInputErrorMsg} />
          </label>
          </div>
          <button type="submit" className={css.formSbmBtn}>
            Add contact
          </button>
        </Form>
      </Formik>
    );
  };
  
  export default ContactForm;