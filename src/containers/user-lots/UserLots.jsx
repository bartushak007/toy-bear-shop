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
    const { history } = this.props;
    history && history.push("/lots-constructor");
  };

  setPage = (page) => {
    const { userLotsRequest } = this.props;
    userLotsRequest({ page });
  };

  render() {
    const {
      userLots: { userLots, load },
      ...props
    } = this.props;

    return (
      <div>
        {/* {console.log('xxxxx', userLots)} */}
        <LotsList
          lots={userLots.products}
          pageLoad={load}
          edit={true}
          pagination={{
            pageCount: Math.ceil(userLots.quantity / userLots.limit),
            setPage: this.setPage,
            page: (+userLots.page || 0) + 1,
          }}
          {...props}
        >
          <LotsList.AddLot hendler={this.callLotConstructor} />
        </LotsList>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({ userLots: userLotsSelector(state) });
const mapDispatchToProps = { userLotsRequest };

export default connect(mapStateToProps, mapDispatchToProps)(Userlots);
