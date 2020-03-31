import React from "react";
import Image from "../shared/image";
import style from "./lot.module.scss";
import Button from "../shared/button";

const Lot = ({
  _id,
  productName,
  description,
  urlImage,
  quantity,
  added,
  characteristic,
  price,
  asset,
  user_id,
  edit,
  history
}) => {
  const editHandler = () => history && history.push(`/edit-lot/${_id}`);

  return (
    <div className={style.lot}>
      <div className={style.lot__container}>
        <div className={style.lot__image}>
          <Image src={urlImage} />
          {edit && (
            <Button className={style.lot__edit} handler={editHandler}>
              Edit
            </Button>
          )}
        </div>
        <div className={style.lot__textContainer}>
          <div className={style.lot__title}>{productName}</div>
          <div>
            <div className={style.lot__buyDescription}>
              <div className={style.lot__price}>{price}</div>
              <div>
                <span className={style.lot__fieldTitle}>quantity:</span>{" "}
                {quantity}
              </div>
            </div>
            <div className={style.lot__description}>
              <div>Description:</div>
              <div>{description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Lot.Add = () => (
  <div className={style.lot}>
    <div className={style.lot__plus} />
  </div>
);

export default Lot;
