import React from "react";

const Pagination = ({ size, filterPagination }) => {
    return (
      <>
        <div className="flex justify-center items-center py-4">
          <div className="pagination space-x-2 flex">
            <button className="hover:text-blue-500">&laquo;</button>
            {[...Array(size)].map((e, i) => {
              const pageNumber = i + 1;
              return pageNumber <= 9 ? (
                <button
                  className="cursor-pointer m-2 px-3 py-1 bg-yellow-300 hover:bg-yellow-500 rounded-full"
                  onClick={() => filterPagination(pageNumber)}
                  key={i}
                >
                  {pageNumber}
                </button>
              ) : null;
            })}
            
            <button className="hover:text-blue-500">&raquo;</button>
          </div>
        </div>
      </>
    );
  };

export default Pagination;