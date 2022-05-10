import * as System from "~/components/system";
import * as SVG from "~/common/svg";
import * as Constants from "~/common/constants";
import * as Styles from "~/common/styles";

import { css } from "@emotion/react";
import { useRef } from "react";
import { DynamicIcon } from "~/components/core/DynamicIcon";

const STYLES_COPY_INPUT = css`
  pointer-events: none;
  position: absolute;
  opacity: 0;
`;

const STYLES_COPY_PASTE = css`
  color: ${Constants.system.white};
  opacity: 50%;
  transition: 200ms ease all;

  :hover {
    color: ${Constants.system.white};
    opacity: 100%;
  }
`;

const STYLES_CONTAINER = css`
  ${Styles.HORIZONTAL_CONTAINER_CENTERED}
`;

const STYLES_CONTAINER_FILL = css`
  display: grid;
  align-items: center;
  grid-template-columns: 24px 1fr 24px;
`;

export default function LinkTag({ url, ...props }) {
  const _ref = useRef(null);

  const onCopy = (e) => {
    e.stopPropagation();
    e.preventDefault();
    _ref.current.select();
    document.execCommand("copy");
  };

  // let shortURL;
  // if (url.length > 40) {
  //   shortURL = url.substr(0, 40).concat("...");
  // } else {
  //   shortURL = url;
  // }
  return (
    <a css={Styles.LINK} href={url} target="_blank">
      <input ref={_ref} readOnly value={url} css={STYLES_COPY_INPUT} />
      <div
        css={props.fillWidth ? STYLES_CONTAINER_FILL : STYLES_CONTAINER}
        style={{
          maxWidth: 480,
          ...props.containerStyle,
        }}
      >
        <SVG.ExternalLink
          height="16px"
          style={{ paddingRight: 4, flexShrink: 0, ...props.style }}
        />
        <System.P2
          style={{
            paddingRight: 8,
            ...props.style,
          }}
          css={Styles.OVERFLOW_ELLIPSIS}
        >
          {url}
        </System.P2>
        <div css={[Styles.ICON_CONTAINER, STYLES_COPY_PASTE]} onClick={onCopy}>
          <DynamicIcon
            successState={<SVG.Check height="16px" style={{ display: "block", ...props.style }} />}
          >
            <SVG.CopyAndPaste style={{ display: "block", ...props.style }} height="16px" />
          </DynamicIcon>
        </div>
      </div>
    </a>
  );
}
