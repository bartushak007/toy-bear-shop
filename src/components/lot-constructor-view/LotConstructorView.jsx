import React from "react";
import style from "./lotconstructorview.module.scss";
import { ComponentWide, Loader } from "../shared";
import LotConstructorForm from "../forms/lot-constructor-form";
import Lot from "../lot";

const LotConstructorView = ({
  onSubmit,
  onSetField,
  fields,
  lotFields,
  updateMod,
  submitLoad,
  pageLoad
}) => {

  return (
    <Loader.Wrapper {...{pageLoad}}>      
      <ComponentWide>
        <div className={style.lotConstructorView}>
          <h2 className={style.lotConstructorView__title}>
            {updateMod ? "Update your Lot" : "Create your Lot"}:
          </h2>
          <div className={style.lotConstructorView__wrap}>
            <LotConstructorForm
              {...{
                onSubmit: onSubmit,
                onSetField: onSetField,
                fields,
                submitLoad,
                pageLoad
              }}
            />
            <div className={style.lotConstructorView__preview}>
              <Lot {...lotFields} />
            </div>
          </div>
        </div>
      </ComponentWide>
    </Loader.Wrapper>
  );
};

export default LotConstructorView;
