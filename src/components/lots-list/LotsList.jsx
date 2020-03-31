import React from "react";

import Image from "../shared/image";
import Lot from "../lot";
import ComponentWide from "../shared/component-wide";

import style from "./lots-list.module.scss";

const LotsList = ({ lots, children }) => {
  return (
    <ComponentWide>
      <div className={style.lotsList}>
        {children}
        {lots.map(lot => (
          <Lot key={lot._id} {...lot} />
        ))}
      </div>
    </ComponentWide>
  );
};

LotsList.AddLot = ({ addlot }) => <Lot.Add addlot={addlot} />;

export default LotsList;
