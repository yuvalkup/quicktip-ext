const css = `
.qteTooltip {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1010;
  display: none;
  max-width: 400px;
  padding: 1px;
  text-align: left;
  white-space: normal;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
                  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  background-clip: padding-box;
  -webkit-bg-clip: padding-box;
  -moz-bg-clip: padding;
  color: black;
  font-family: open sans,lucida grande,sans-serif;
  font-weight: 400;
  font-size: 14px;
}
.qteTooltip.top {
  margin-top: -10px;
}
.qteTooltip.right {
  margin-left: 10px;
}
.qteTooltip.bottom {
  margin-top: 10px;
}
.qteTooltip.left {
  margin-left: -10px;
}
.qteTooltip-title {
  padding: 8px 14px;
  margin: 0;
  font-size: 14px;
  font-weight: normal;
  line-height: 18px;
  background-color: #f7f7f7;
  border-bottom: 1px solid #ebebeb;
  border-radius: 5px 5px 0 0;
}
.qteTooltip-content {
  padding: 9px 14px;
}
.qteTooltip .arrow,
.qteTooltip .arrow:after {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
}
.qteTooltip .arrow {
  border-width: 11px;
}
.qteTooltip .arrow:after {
  border-width: 10px;
  content: "";
}
.qteTooltip.top .arrow {
  bottom: -11px;
  left: 50%;
  margin-left: -11px;
  border-top-color: #999999;
  border-top-color: rgba(0, 0, 0, 0.25);
  border-bottom-width: 0;
}
.qteTooltip.top .arrow:after {
  bottom: 1px;
  margin-left: -10px;
  border-top-color: #ffffff;
  border-bottom-width: 0;
  content: " ";
}
.qteTooltip.right .arrow {
  top: 50%;
  left: -11px;
  margin-top: -11px;
  border-right-color: #999999;
  border-right-color: rgba(0, 0, 0, 0.25);
  border-left-width: 0;
}
.qteTooltip.right .arrow:after {
  bottom: -10px;
  left: 1px;
  border-right-color: #ffffff;
  border-left-width: 0;
  content: " ";
}
.qteTooltip.bottom .arrow {
  top: -11px;
  left: 50%;
  margin-left: -11px;
  border-bottom-color: #999999;
  border-bottom-color: rgba(0, 0, 0, 0.25);
  border-top-width: 0;
}
.qteTooltip.bottom .arrow:after {
  top: 1px;
  margin-left: -10px;
  border-bottom-color: #ffffff;
  border-top-width: 0;
  content: " ";
}
.qteTooltip.left .arrow {
  top: 50%;
  right: -11px;
  margin-top: -11px;
  border-left-color: #999999;
  border-left-color: rgba(0, 0, 0, 0.25);
  border-right-width: 0;
}
.qteTooltip.left .arrow:after {
  right: 1px;
  bottom: -10px;
  border-left-color: #ffffff;
  border-right-width: 0;
  content: " ";
}
`;

export function addStyle() {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.append(style);
}
