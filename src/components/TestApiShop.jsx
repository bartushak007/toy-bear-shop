// // https://shop-app-brtshk.herokuapp.com/api/products
// import React, { useContext, useState } from "react";
// import { withTranslation } from "react-i18next";
// import ComponentWide from "../components/shared/component-wide";

// import { DataContext } from "../index";

// const TestApiShop = ({ t }) => {
//   const [data, setData] = useState([]);
//   // React.useEffect(async () => {
//   //   try {
//   //     const response = await fetch(
//   //       "https://shop-app-brtshk.herokuapp.com/api/products"
//   //     );
//   //     const dataResponse = await response.json();
//   //     setData(dataResponse.data);
//   //   } catch (e) {
//   //     console.log(e);
//   //   }
//   // }, []);
//   return (
//     <ComponentWide backgroundColor="#ccc">
//       <table style={{margin:"0 auto", maxWidth: "700px", width: "100%"}}>
//         <tbody>
//           {data.map(
//             ({
//               _id,
//               productName,
//               description,
//               urlImage,
//               quantity,
//               added,
//               characteristic,
//               price,
//               asset
//             }) => (
//               <tr key={_id}>
//                 <td>{productName}</td>
//                 <td>{description}</td>
//                 <td>{quantity}</td>
//                 <td>{characteristic}</td>
//                 <td>{added}</td>
//                 <td>
//                   {price} {asset}
//                 </td>
//               </tr>
//             )
//           )}
//         </tbody>
//       </table>
//     </ComponentWide>
//   );
// };

// export default withTranslation()(TestApiShop);
