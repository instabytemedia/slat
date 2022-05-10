import * as React from "react";
import * as Constants from "~/common/constants";

import { Input } from "~/components/system/components/Input";
import { SelectMenu } from "~/components/system/components/SelectMenus";
import { CheckBox } from "~/components/system/components/CheckBox";
import { ButtonPrimary } from "~/components/system/components/Buttons";
import { css } from "@emotion/react";

const SELECT_MENU_OPTIONS = [
  { value: "1", name: "BLS" },
  { value: "2", name: "SECP256K1" },
  // { value: '3', name: 'MULTISIG' },
];

const SELECT_MENU_MAP = {
  1: "BLS",
  2: "SECP256K1",
  // '3': 'MULTISIG',
};

const SELECT_MENU_SAVE_STRINGS = {
  1: "bls",
  2: "secp256k1",
};

const STYLES_CONTAINER = css`
  font-family: ${Constants.font.text};
  box-sizing: border-box;
  padding: 24px;
  border-radius: 4px;
  background-color: ${Constants.system.white};
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  border: 1px solid ${Constants.semantic.borderGrayLight};
  max-width: 320px;
  width: 100%;
`;

export class CreateFilecoinAddress extends React.Component {
  state = { name: "", type: "1", makeDefault: false };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  _handleSubmit = () => {
    this.props.onSubmit({
      name: this.state.name,
      type: SELECT_MENU_SAVE_STRINGS[this.state.type],
      makeDefault: this.state.makeDefault,
    });
  };

  render() {
    return (
      <div css={STYLES_CONTAINER}>
        <Input
          label="Address name"
          name="name"
          value={this.state.name}
          onChange={this._handleChange}
        />

        <SelectMenu
          full
          containerStyle={{ marginTop: 24 }}
          name="type"
          label="Address type"
          value={this.state.type}
          category="type adresss"
          onChange={this._handleChange}
          options={SELECT_MENU_OPTIONS}
        />

        <CheckBox
          style={{ marginTop: 24 }}
          name="default"
          value={this.state.default}
          onChange={this._handleChange}
        >
          Make this wallet the default
        </CheckBox>

        <ButtonPrimary full style={{ marginTop: 48 }} onClick={this._handleSubmit}>
          Create address
        </ButtonPrimary>
      </div>
    );
  }
}
