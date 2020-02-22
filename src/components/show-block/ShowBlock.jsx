import React from "react";
import Image from "../shared/image";
import style from "./show-block.module.scss";
import classNames from "classnames";

const ShowBlock = ({ src, reverse, title, text }) => {
  return (
    <div
      className={classNames(style.ShowBlock, {
        [style.ShowBlock_reverse]: reverse
      })}
    >
      <div className={style.ShowBlock__image}>
        <Image {...{ src }} />
      </div>
      <div className={style.ShowBlock__text}>
        <h2 className={style.ShowBlock__title}>{title}</h2>
        {text.map((txt, i) => (
          <p key={i}>{txt}</p>
        ))}
      </div>
    </div>
  );
};

export default ShowBlock;
