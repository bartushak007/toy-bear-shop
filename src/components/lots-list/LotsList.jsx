import React, { useState } from "react";

import Lot from "../lot";
import { ComponentWide, Loader, Pagination, Button } from "../shared";

import style from "./lots-list.module.scss";

const LotsList = ({
  deleteProducts,
  pageLoad,
  lots,
  children,
  edit,
  pagination,
  ...restProps
}) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const toggleSelected = (id) =>
    setSelectedProducts(
      selectedProducts.includes(id)
        ? selectedProducts.filter((_id) => _id !== id)
        : [...selectedProducts, id]
    );
  const deleteGroup = (group) => deleteProducts(group);

  return (
    <Loader.Wrapper pageLoad={pageLoad}>
      <ComponentWide>
        {selectedProducts.length ? (
          <Button handler={() => deleteGroup(selectedProducts)}>delete</Button>
        ) : null}
        <div className={style.lotsList}>
          {children}
          {lots &&
            lots.map((lot) => (
              <Lot
                key={lot._id}
                {...lot}
                {...restProps}
                edit={edit}
                selectedProducts={selectedProducts}
                toggleSelected={() => toggleSelected(lot._id)}
              />
            ))}
        </div>
        {pagination && <Pagination {...pagination} />}
      </ComponentWide>
    </Loader.Wrapper>
  );
};

LotsList.AddLot = ({ hendler }) => <Lot.Add hendler={hendler} />;

export default LotsList;
