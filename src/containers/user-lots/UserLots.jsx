import React, { Component } from "react";
import { connect } from "react-redux";
import { userLotsRequest, userLotsSelector } from "../../reducers/userLots";
import LotsList from "../../components/lots-list";

class Userlots extends Component {
  componentDidMount() {
    const { userLotsRequest } = this.props;
    userLotsRequest();
  }

  callLotConstructor = () => {
    const {history} = this.props;
    history && history.push('/lots-constructor')
  }

  render() {
    const {
      userLots: { userLots, load }, ...props
    } = this.props;

    return (
      <div>
        <LotsList lots={userLots} pageLoad={load} edit={true} {...props}>
          <LotsList.AddLot hendler={this.callLotConstructor}/>
        </LotsList>
      </div>
    );
  }
}
const mapStateToProps = state => ({ userLots: userLotsSelector(state) });
const mapDispatchToProps = { userLotsRequest };

export default connect(mapStateToProps, mapDispatchToProps)(Userlots);
