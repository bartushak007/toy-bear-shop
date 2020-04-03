import React from "react";

import Lot from "../lot";
import { ComponentWide, Loader } from "../shared";

import style from "./lots-list.module.scss";

const LotsList = ({ pageLoad, lots, children, edit, ...restProps }) => {
  return (
    <Loader.Wrapper pageLoad={pageLoad}>
      <ComponentWide>
        <div className={style.lotsList}>
          {children}
          {lots.map(lot => (
            <Lot key={lot._id} {...lot} {...restProps} edit={edit} />
          ))}
        </div>
      </ComponentWide>
    </Loader.Wrapper>
  );
};

LotsList.AddLot = ({ hendler }) => <Lot.Add hendler={hendler} />;

export default LotsList;
