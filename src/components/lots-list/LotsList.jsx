import React from "react";

import Lot from "../lot";
import { ComponentWide, Loader, Pagination } from "../shared";

import style from "./lots-list.module.scss";

const LotsList = ({
  pageLoad,
  lots,
  children,
  edit,
  pagination,
  ...restProps
}) => {
  return (
    <Loader.Wrapper pageLoad={pageLoad}>
      <ComponentWide>
        <div className={style.lotsList}>
          {children}
          {lots &&
            lots.map((lot) => (
              <Lot key={lot._id} {...lot} {...restProps} edit={edit} />
            ))}
        </div>
        {pagination && <Pagination {...pagination} />}
      </ComponentWide>
    </Loader.Wrapper>
  );
};

LotsList.AddLot = ({ hendler }) => <Lot.Add hendler={hendler} />;

export default LotsList;
