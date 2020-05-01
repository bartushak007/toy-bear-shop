import React from "react";
import classNames from "classnames";
import lodash from "lodash";
import style from "./pagination.module.scss";

class Paginate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pagesList: lodash.range(1 + 1).slice(1) };
  }
  componentDidMount() {
    const { pageCount } = this.props;
    this.setState({
      pagesList: lodash
        .range((pageCount || 1) + 1)
        .slice(1)
    });
  }
  componentDidUpdate(props) {
    const { pageCount } = this.props;
    if (
      pageCount !== props.pageCount
    ) {
      this.setState({
        pagesList: lodash
          .range((pageCount || 1) + 1)
          .slice(1)
      });
    }
  }
  render() {
    const { setPage, page } = this.props;

    const { pagesList } = this.state;

    return (
      <div className={style["paginate__pagination"]}>
        {pagesList.map(e => (
          <span
            className={classNames(style["paginate__pagination-elem-wrap"], {
              [style["paginate__pagination-elem--hidden"]]:
                !(
                  (e <= page + 3 && e >= page - 3) ||
                  e === page
                ) &&
                e != "1" &&
                e != pagesList.length
            })}
            key={e}
            onClick={() => {
              setPage(e-1);
            }}
          >
            {pagesList.length === parseInt(e) &&
              page < pagesList.length - 4 && (
                <span className={style["paginate__pagination-divide"]}>...</span>
              )}
            <span
              className={classNames(style["paginate__pagination-elem"], {
                [style["paginate__pagination-elem--active"]]: e === page
              })}
            >
              {e}
            </span>

            {"1" == e && page > 5 && (
              <span className={style["paginate__pagination-divide"]}>...</span>
            )}
          </span>
        ))}
      </div>
    );
  }
}

export default Paginate;
