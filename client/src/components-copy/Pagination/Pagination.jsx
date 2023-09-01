import React from 'react';
import styles from "./Pagination.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { changePage } from '../../redux/actions';

const Pagination = ({ itemsPerPage, totalItems }) => {
  const dispatch = useDispatch();

  const currentPage = useSelector(state => state.currentPage)
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(changePage(newPage));

    }
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    for (let page = 1; page <= totalPages; page++) {
      pageButtons.push(
        <button
          key={page}
          className={`${styles.button} ${page === currentPage ? styles.activeButton : ''}`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      );
    }
    return pageButtons;
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => handlePageClick(currentPage - 1)}> {"<"} </button>
      {renderPageButtons()}
      <button className={styles.button} onClick={() => handlePageClick(currentPage + 1)}> {">"} </button>
    </div>
  );
};

export default Pagination;
