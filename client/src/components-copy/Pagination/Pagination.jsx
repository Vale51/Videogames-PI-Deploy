import React from 'react';
import styles from "./Pagination.module.css";

const Pagination = ({ currentPage, itemsPerPage, totalItems, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
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
