import Loader from '../../components/Loader/Loader';
import SearchBox from '../../components/SearchBox/SearchBox';
import ContactForm from '../../components/ContactForm/ContactForm';
import ContactList from '../../components/ContactList/ContactList';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoader } from '../../redux/contacts/selectors';
import { fetchContacts } from '../../redux/contacts/operations';


const ContactsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const isLoading = useSelector(selectLoader);

  return (
    <main>
      <ContactForm />
      <SearchBox />
      {isLoading && <Loader />}

      <ContactList />
    </main>
  );
};

export default ContactsPage;