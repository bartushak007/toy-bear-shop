import React, { Component } from "react";
import { connect } from "react-redux";
import { lotsRequest, lotsSelector } from "../../reducers/lotsList";

import LotsList from "../../components/lots-list";

class LotsPlace extends Component {
  componentDidMount() {
    const { lotsRequest } = this.props;
    lotsRequest();
  }

  render() {
    const {
      lots: { lots, load }
    } = this.props;

    return (
      <div>
        <LotsList lots={lots} pageLoad={load} />
      </div>
    );
  }
}
const mapStateToProps = state => ({ lots: lotsSelector(state) });
const mapDispatchToProps = { lotsRequest };

export default connect(mapStateToProps, mapDispatchToProps)(LotsPlace);
