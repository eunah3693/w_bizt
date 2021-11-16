import React, { Component } from "react";
// import url from '../../image/url.png'
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Box } from "@material-ui/core";
import copy from "Img/copy.svg";

import Map from "appComponents/Map";

export default class Share extends Component {
  state = {
    copyUrl: "송파구 위례성로 올림픽공원 72-4",
    copied: false,
  };
  closeCopied = () => {
    setTimeout(() => {
      this.setState({ copied: false });
    }, 2000);
  };
  onCopy = () => {
    this.setState({ copied: true }, () => this.closeCopied());
  };
  render() {
    return (
      <section className="share">
        <div className="share-box">
          <Box className="Padding20px">
            <p style={{ margin: "10px 0 20px" }} className="SubtitleLeft">
              찾아 가는 방법
            </p>
            <Map
              pinCenter
              mapCenter={null} // 오피스 좌표
              style={{
                border: "1px solid lightgray",
                marginBottom: "20px",
                height: " 250px",
              }}
            />
            <Box className="SpaceBetween">
              <p className="">{this.state.copyUrl}</p>
              <CopyToClipboard onCopy={this.onCopy} text={this.state.copyUrl}>
                <img
                  src={copy}
                  style={{
                    width: "15px",
                    marginRight: "5px",
                    cursor: "pointer",
                  }}
                  alt=""
                />
              </CopyToClipboard>
            </Box>
          </Box>

          {this.state.copied
            ? // <span>복사완료!</span>
              null
            : null}
        </div>
      </section>
    );
  }
}
