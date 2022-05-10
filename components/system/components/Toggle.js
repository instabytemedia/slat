import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";
import { DescriptionGroup } from "~/components/system/components/fragments/DescriptionGroup";

const STYLES_TOGGLE = css`
  font-family: ${Constants.font.text};
  box-sizing: border-box;
  display: inline-flex;
  height: 32px;
  border-radius: 40px;
  width: 60px;
  ${"" /* box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15); */}
  background: ${Constants.system.gray};
  transition: background 200ms ease;
  cursor: pointer;
  user-select: none;
`;

const STYLES_DIAL = css`
  box-sizing: border-box;
  height: 24px;
  width: 24px;
  border-radius: 24px;
  margin-top: 4px;
  margin-left: 4px;
  background: ${Constants.semantic.bgLight};
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
  transition: transform 200ms ease;
`;

export class Toggle extends React.Component {
  _handleChange = () => {
    this.props.onChange({
      target: { name: this.props.name, value: !this.props.active },
    });
  };

  render() {
    return (
      <div>
        <DescriptionGroup
          full={this.props.full}
          tooltip={this.props.tooltip}
          label={this.props.label}
          description={this.props.description}
        />
        <div
          css={STYLES_TOGGLE}
          onClick={this._handleChange}
          style={{
            backgroundColor: this.props.active
              ? Constants.system.blue
              : this.props.dark
              ? Constants.system.grayDark2
              : null,
          }}
        >
          <figure
            css={STYLES_DIAL}
            style={{
              transform: this.props.active ? `translateX(28px)` : null,
              background: this.props.dark ? Constants.semantic.borderGrayLight : null,
            }}
          />
        </div>
      </div>
    );
  }
}
