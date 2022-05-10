import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as UserBehaviors from "~/common/user-behaviors";

import { css } from "@emotion/react";
import { LoaderSpinner } from "~/components/system/components/Loaders";

const STYLES_SLATE_NAME = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: ${Constants.font.medium};
  color: ${Constants.system.black};
`;

const STYLES_SLATE_NAME_DARK = css`
  ${STYLES_SLATE_NAME}
  color: ${Constants.system.white};
`;

const STYLES_NO_VISIBLE_SCROLL = css`
  overflow-y: scroll;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;

  ::-webkit-scrollbar {
    width: 0px;
    display: none;
  }

  ::-webkit-scrollbar-track {
    background: ${Constants.semantic.bgLight};
  }

  ::-webkit-scrollbar-thumb {
    background: ${Constants.system.grayLight2};
  }
`;

const STYLES_SLATE_LIST = css`
  ${STYLES_NO_VISIBLE_SCROLL}
  max-height: 316px;
  border-radius: 4px;
`;

const STYLES_SLATE_LINE = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 16px;
  background-color: ${Constants.system.white};
  border-bottom: 1px solid ${Constants.semantic.bgLight};
  cursor: pointer;
  color: ${Constants.system.grayLight2};
  height: 48px;

  :hover {
    color: ${Constants.system.grayDark2};
  }
`;

const STYLES_SLATE_LINE_DARK = css`
  ${STYLES_SLATE_LINE}
  background-color: transparent;
  border-bottom: 1px solid #3c3c3c;

  :hover {
    color: ${Constants.system.blue};
  }

  :last-child {
    border: none;
  }
`;

const STYLES_SLATE_CREATE = css`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  background-color: ${Constants.system.white};
  cursor: pointer;
  color: ${Constants.system.grayLight2};
  border-radius: 4px;

  :hover {
    color: ${Constants.system.grayDark2};
  }
`;

const STYLES_SLATE_CREATE_DARK = css`
  ${STYLES_SLATE_CREATE}
  background-color: transparent;
  border: 1px solid #3c3c3c;

  :hover {
    color: ${Constants.system.blue};
  }
`;

const STYLES_ICON_BOX = css`
  display: flex;
  align-items: center;
`;

export class SlatePicker extends React.Component {
  render() {
    const selected = this.props.selected;
    return (
      <React.Fragment>
        <div
          css={this.props.dark ? STYLES_SLATE_CREATE_DARK : STYLES_SLATE_CREATE}
          onClick={this.props.onCreateSlate}
        >
          <SVG.Plus
            height="24px"
            style={{
              marginRight: 8,
              pointerEvents: "none",
            }}
          />
          <div>Create new collection</div>
        </div>

        {this.props.slates.length ? (
          <React.Fragment>
            <br />
            <div
              css={STYLES_SLATE_LIST}
              style={{ border: this.props.dark ? "1px solid #3c3c3c" : "none" }}
            >
              {this.props.slates.map((slate) => (
                <div
                  key={slate.id}
                  css={this.props.dark ? STYLES_SLATE_LINE_DARK : STYLES_SLATE_LINE}
                  onClick={() => this.props.onAdd(slate)}
                >
                  <div
                    style={{ minWidth: "10%", width: "100%", display: "flex", flexWrap: "nowrap" }}
                  >
                    <div css={STYLES_ICON_BOX}>
                      {selected[slate.id] ? (
                        <SVG.Slate
                          height="24px"
                          style={{
                            marginRight: 8,
                            pointerEvents: "none",
                            color: this.props.dark
                              ? Constants.system.white
                              : Constants.system.black,
                          }}
                        />
                      ) : (
                        <SVG.PlusCircle
                          height="24px"
                          style={{
                            marginRight: 8,
                            pointerEvents: "none",
                          }}
                        />
                      )}
                    </div>
                    <div
                      css={this.props.dark ? STYLES_SLATE_NAME_DARK : STYLES_SLATE_NAME}
                      style={{
                        color: selected[slate.id] ? this.props.selectedColor : "inherit",
                      }}
                    >
                      {Strings.getPresentationSlateName(slate)}
                    </div>
                  </div>
                  {slate.isPublic ? (
                    <div style={{ flexShrink: 0, marginLeft: 16 }}>
                      <SVG.Globe height="24px" />
                    </div>
                  ) : (
                    <div style={{ flexShrink: 0, marginLeft: 16 }}>
                      <SVG.SecurityLock height="24px" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </React.Fragment>
        ) : null}
      </React.Fragment>
    );
  }
}
