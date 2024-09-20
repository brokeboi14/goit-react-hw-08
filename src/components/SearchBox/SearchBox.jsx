import css from "./SearchBox.module.css";
import { useDispatch } from "react-redux";
import { changeFilter } from "../../redux/filtersSlice";


const SearchBox = () => {
  const dispatch = useDispatch();

  const handleChange = event => {
    const value = event.target.value;
    const action = changeFilter(value);
    dispatch(action);
  };

  return (
    <div className={css.searchBox}>
      <input
        className={css.SearchBoxInput}
        onChange={handleChange}
        type="text"
        placeholder="Enter name"
      />
    </div>
  );
};

export default SearchBox;