import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";

const STYLES_VIEW_SOURCE_LINK = css`
  font-size: 14px;
  font-family: ${Constants.font.semiBold};
  display: inline-block;
  transition: 200ms ease all;
  cursor: pointer;
  color: ${Constants.system.grayLight2};

  :hover {
    color: ${Constants.system.blue};
  }

  :visited {
    color: ${Constants.system.green};
  }
`;

export default class ViewSourceLink extends React.Component {
  render() {
    return (
      <a
        css={STYLES_VIEW_SOURCE_LINK}
        href={`https://github.com/filecoin-project/slate/blob/main/pages/_/${this.props.file}`}
        target="_blank"
      >
        <SVG.ExpandBox height="12px" style={{ marginRight: 2 }} /> View Source
      </a>
    );
  }
}
