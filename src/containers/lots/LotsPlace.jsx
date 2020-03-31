import React, { Component } from "react";
import { connect } from "react-redux";
import { lotsRequest, lotsSelector } from "../../reducers/lotsList";

import ComponentWide from "../../components/shared/component-wide";
import LotsList from "../../components/lots-list";

class LotsPlace extends Component {
  componentDidMount() {
    const { lotsRequest } = this.props;
    lotsRequest();
  }

  render() {
    const {
      lots: { lots }
    } = this.props;
    console.log(this.props)
    return (
      <div>
        <LotsList lots={lots}/>
      </div>
    );
  }
}
const mapStateToProps = state => ({ lots: lotsSelector(state) });
const mapDispatchToProps = { lotsRequest };

export default connect(mapStateToProps, mapDispatchToProps)(LotsPlace);
