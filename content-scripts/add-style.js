const css = `
.cteTooltip {
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
.cteTooltip.top {
  margin-top: -10px;
}
.cteTooltip.right {
  margin-left: 10px;
}
.cteTooltip.bottom {
  margin-top: 10px;
}
.cteTooltip.left {
  margin-left: -10px;
}
.cteTooltip-title {
  padding: 8px 14px;
  margin: 0;
  font-size: 14px;
  font-weight: normal;
  line-height: 18px;
  background-color: #f7f7f7;
  border-bottom: 1px solid #ebebeb;
  border-radius: 5px 5px 0 0;
}
.cteTooltip-content {
  padding: 9px 14px;
}
.cteTooltip .arrow,
.cteTooltip .arrow:after {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
}
.cteTooltip .arrow {
  border-width: 11px;
}
.cteTooltip .arrow:after {
  border-width: 10px;
  content: "";
}
.cteTooltip.top .arrow {
  bottom: -11px;
  left: 50%;
  margin-left: -11px;
  border-top-color: #999999;
  border-top-color: rgba(0, 0, 0, 0.25);
  border-bottom-width: 0;
}
.cteTooltip.top .arrow:after {
  bottom: 1px;
  margin-left: -10px;
  border-top-color: #ffffff;
  border-bottom-width: 0;
  content: " ";
}
.cteTooltip.right .arrow {
  top: 50%;
  left: -11px;
  margin-top: -11px;
  border-right-color: #999999;
  border-right-color: rgba(0, 0, 0, 0.25);
  border-left-width: 0;
}
.cteTooltip.right .arrow:after {
  bottom: -10px;
  left: 1px;
  border-right-color: #ffffff;
  border-left-width: 0;
  content: " ";
}
.cteTooltip.bottom .arrow {
  top: -11px;
  left: 50%;
  margin-left: -11px;
  border-bottom-color: #999999;
  border-bottom-color: rgba(0, 0, 0, 0.25);
  border-top-width: 0;
}
.cteTooltip.bottom .arrow:after {
  top: 1px;
  margin-left: -10px;
  border-bottom-color: #ffffff;
  border-top-width: 0;
  content: " ";
}
.cteTooltip.left .arrow {
  top: 50%;
  right: -11px;
  margin-top: -11px;
  border-left-color: #999999;
  border-left-color: rgba(0, 0, 0, 0.25);
  border-right-width: 0;
}
.cteTooltip.left .arrow:after {
  right: 1px;
  bottom: -10px;
  border-left-color: #ffffff;
  border-right-width: 0;
  content: " ";
}
`;

function addStyle(styleString) {
    const style = document.createElement('style');
    style.textContent = styleString;
    document.head.append(style);
}
  

addStyle(css);