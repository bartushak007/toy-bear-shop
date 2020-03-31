import React from "react";

import Image from "../shared/image";
import Lot from "../lot";
import ComponentWide from "../shared/component-wide";

import style from "./lots-list.module.scss";

const LotsList = ({ lots, children, edit, ...restProps }) => {

  return (
    <ComponentWide>
      <div className={style.lotsList}>
        {children}
        {lots.map(lot => (
          <Lot key={lot._id} {...lot} {...restProps} edit={edit} />
        ))}
      </div>
    </ComponentWide>
  );
};

LotsList.AddLot = ({ hendler }) => <Lot.Add hendler={hendler} />;

export default LotsList;
