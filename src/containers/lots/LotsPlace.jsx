import React, { Component } from "react";
import { connect } from "react-redux";
import { lotsRequest, lotsSelector } from "../../reducers/lotsList";

import LotsList from "../../components/lots-list";

class LotsPlace extends Component {
  componentDidMount() {
    const { lotsRequest } = this.props;
    lotsRequest();
  }

  setPage = (page) => {
    const { lotsRequest } = this.props;
    lotsRequest({ page });
  };

  render() {
    const {
      lots: { lots, load },
    } = this.props;

    return (
      <div>
        <LotsList
          lots={lots.products}
          pageLoad={load}
          pagination={{
            pageCount: Math.ceil(lots.quantity / lots.limit),
            setPage: this.setPage,
            page: (+lots.page || 0) + 1,
          }}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({ lots: lotsSelector(state) });
const mapDispatchToProps = { lotsRequest };

export default connect(mapStateToProps, mapDispatchToProps)(LotsPlace);
