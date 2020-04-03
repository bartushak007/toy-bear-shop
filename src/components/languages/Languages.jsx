import React from 'react';
import i18next from "i18next";
import classNames from "classnames";
import style from './languages.module.scss';

const Languages = ({languages}) => (
  <div className={style.languages}>
    {languages.map((lang, i) => (
      <div key={lang} className={style.languages}>
        <span
          onClick={() => i18next.changeLanguage(lang)}
          // eventKey={lang}
          // active={i18next.language === lang}
        >
          <span
            className={classNames(style.languages__lang, {
              [style.languages__lang_first]: i === 0
            })}
          >
            {lang}
          </span>
        </span>
        <span className={style.languages__divider}>
          {i < languages.length - 1 && " | "}
        </span>
      </div>
    ))}
  </div>
);

export default Languages;