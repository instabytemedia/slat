import * as React from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

export default class SidebarFileRetrievalDeal extends React.Component {
  state = {};

  _handleSubmit = () => {
    this.props.onSubmit({});
  };

  _handleCancel = () => {
    this.props.onCancel();
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <System.P1
          style={{
            fontFamily: Constants.font.semiBold,
            fontSize: Constants.typescale.lvl3,
          }}
        >
          Retrieve file
        </System.P1>
      </React.Fragment>
    );
  }
}
