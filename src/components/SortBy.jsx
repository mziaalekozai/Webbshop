import React from "react";
import { GrSort } from "react-icons/gr";

const SortBy = ({ list, setList }) => {
  const sortItems = (direction, criteria = "price") => {
    const sortedItems = [...list].sort((a, b) => {
      if (criteria === "price") {
        return direction === "asc" ? a.price - b.price : b.price - a.price;
      } else if (criteria === "name") {
        if (direction === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      }
    });
    setList(sortedItems);
  };

  return (
    <div>
      <button onClick={() => sortItems("asc")}>
        <GrSort /> Lägsta pris
      </button>
      <button onClick={() => sortItems("desc")}>
        <GrSort /> Högsta pris
      </button>
      <button onClick={() => sortItems("asc", "name")}>
        <GrSort /> A - Ö
      </button>
      <button onClick={() => sortItems("desc", "name")}>
        <GrSort /> Ö - A
      </button>
    </div>
  );
};

export default SortBy;

// import React from "react";
// import { GrSort } from "react-icons/gr";

// const SortBy = ({ list, setList }) => {
//   const sortItems = (direction) => {
//     const sortedItems = [...list].sort((a, b) => {
//       if (direction === "asc") {
//         return a.price - b.price; // Antaget att sortering sker på pris
//       } else {
//         return b.price - a.price;
//       }
//     });
//     setList(sortedItems);
//   };

//   return (
//     <div>
//       <button onClick={() => sortItems("asc")}>
//         <GrSort /> Lägsta pris
//       </button>
//       <button onClick={() => sortItems("desc")}>
//         <GrSort /> Högsta pris
//       </button>
//       <button onClick={() => sortItems("desc")}>
//         <GrSort /> A - Ö
//       </button>
//     </div>
//   );
// };

// export default SortBy;

// // import React from "react";
// // import { GrSort } from "react-icons/gr";

// // const SortBy = ({ onSort }) => {
// //   return (
// //     <div>
// //       <button onClick={() => onSort("asc")}>
// //         <GrSort /> Sort Ascending
// //       </button>
// //       <button onClick={() => onSort("desc")}>
// //         <GrSort /> Sort Descending
// //       </button>
// //     </div>
// //   );
// // };

// // export default SortBy;
