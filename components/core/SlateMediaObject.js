import * as React from "react";
import * as Constants from "~/common/constants";
import * as Validations from "~/common/validations";
import * as Events from "~/common/custom-events";
import * as Strings from "~/common/strings";
import * as Actions from "~/common/actions";

import UnityFrame from "~/components/core/UnityFrame";
import FontFrame from "~/components/core/FontFrame/index.js";
import MarkdownFrame from "~/components/core/MarkdownFrame";
import SlateLinkObject from "~/components/core/SlateLinkObject";

import { css } from "@emotion/react";
import { Show } from "~/components/utility/Show";

const STYLES_FAILURE = css`
  color: ${Constants.system.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin: 0;
  padding: 24px 36px;
  width: 100%;
  min-height: 10%;
  height: 100%;
  text-decoration: none;
  background-color: rgba(20, 20, 20, 0.8);
`;

const STYLES_OBJECT = css`
  display: block;
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 10%;
  height: 100%;
  user-select: none;
`;

const STYLES_ASSET = (theme) => css`
  position: relative;
  user-select: none;
  width: 100%;
  margin: 0;
  padding: 0;
  min-height: 10%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  @supports ((-webkit-backdrop-filter: blur(500px)) or (backdrop-filter: blur(500px))) {
    background-color: ${theme.semantic.bgBlurWhiteTRN};
    -webkit-backdrop-filter: blur(500px);
    backdrop-filter: blur(500px);
  }
`;

const STYLES_IMAGE = css`
  user-select: none;
  display: block;
  max-width: 100%;
  max-height: 100%;
`;

const STYLES_IMAGE_WRAPPER = css`
  position: relative;
  width: 100%;
  height: 100%;
`;

const STYLES_IMAGE_BLUR = css`
  top: 0;
  left: 0;
  position: absolute;
  background-size: cover;
  width: 100%;
  height: 100%;
`;

const STYLES_IFRAME = (theme) => css`
  display: block;
  width: 100%;
  height: 100%;
  // NOTE(Amine): lightbackground as fallback when html file doesn't have any
  background-color: ${theme.system.grayLight6};
`;

const typeMap = {
  "video/quicktime": "video/mp4",
};

export default class SlateMediaObject extends React.Component {
  openLink = (url) => {
    window.open(url, "_blank");
  };

  componentDidMount() {
    const file = this.props.file;
    if (this.props.isMobile) {
      if (file.type && file.type.startsWith("application/pdf")) {
        const url = Strings.getURLfromCID(file.cid);
        this.openLink(url);
      }
    }
  }

  render() {
    const { file, isMobile } = this.props;
    const type = file.type || "";

    if (file.isLink) {
      return <SlateLinkObject {...this.props} />;
    }

    const url = Strings.getURLfromCID(file.cid);
    const playType = typeMap[type] ? typeMap[type] : type;

    let element = <div css={STYLES_FAILURE}>No Preview</div>;

    if (Validations.isPdfType(type)) {
      return (
        <>
          {isMobile ? (
            <a href={url} target="_blank" style={{ textDecoration: "none", height: "100%" }}>
              <div css={STYLES_FAILURE}>Tap to open PDF in new tab</div>
            </a>
          ) : (
            <object
              css={STYLES_OBJECT}
              style={{ width: "calc(100% - 64px)" }}
              data={url}
              type={type}
              key={url}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          )}
        </>
      );
    }

    if (Validations.isVideoType(type)) {
      return (
        <video
          playsInline
          controls
          autoPlay={false}
          name="media"
          type={playType}
          css={STYLES_OBJECT}
          key={url}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <source src={url} type={playType} />
          {/** NOTE(amine): fallback if video type isn't supported (example .mov) */}
          <source src={url} type="video/mp4" />
        </video>
      );
    }

    if (Validations.isAudioType(type)) {
      return (
        <div css={STYLES_ASSET}>
          <audio
            controls
            name="media"
            key={url}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <source src={url} type={playType} />
          </audio>
        </div>
      );
    }

    if (type.startsWith("text/html")) {
      return <iframe src={url} css={STYLES_IFRAME} />;
    }

    if (Validations.isFontFile(file.filename)) {
      return (
        <FontFrame
          name={file.name || file.filename}
          cid={file.cid}
          fallback={element}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      );
    }

    if (Validations.isMarkdown(file.filename, type)) {
      return <MarkdownFrame date={file.createdAt} cid={file?.cid} url={url} />;
    }

    if (Validations.isPreviewableImage(type)) {
      return (
        <div css={STYLES_IMAGE_WRAPPER}>
          <Show when={!Validations.isGif(type)}>
            <div style={{ backgroundImage: `url(${url})` }} css={STYLES_IMAGE_BLUR} />
          </Show>
          <div css={STYLES_ASSET}>
            <img
              css={STYLES_IMAGE}
              src={url}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </div>
        </div>
      );
    }

    // TODO(jim): We will need to revisit this later.
    if (Validations.isUnityType(type)) {
      const { config, loader } = file.data.unity;

      return <UnityFrame url={url} unityGameConfig={config} unityGameLoader={loader} key={url} />;
    }

    return element;
  }
}
