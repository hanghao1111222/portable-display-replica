import { readFile, writeFile } from "node:fs/promises";
import QRCode from "qrcode";

const url = "https://www.anykingscreen.com/help-center";
const size = 420;
const logo = await readFile("public/anyking-mark.jpg");
const logoHref = `data:image/jpeg;base64,${logo.toString("base64")}`;
const qrSvg = await QRCode.toString(url, {
  type: "svg",
  errorCorrectionLevel: "H",
  margin: 2,
  width: size,
  color: {
    dark: "#111827",
    light: "#ffffff",
  },
});

const badgeSize = 108;
const badgeOffset = (size - badgeSize) / 2;
const logoSize = 72;
const logoSvg = `
  <g transform="translate(${size / 2} ${size / 2})">
    <rect
      x="${-badgeSize / 2}"
      y="${-badgeSize / 2}"
      width="${badgeSize}"
      height="${badgeSize}"
      rx="28"
      fill="#ffffff"
      stroke="#f4f4f5"
      stroke-width="4"
    />
    <image
      x="${-logoSize / 2}"
      y="${-logoSize / 2}"
      width="${logoSize}"
      height="${logoSize}"
      href="${logoHref}"
      preserveAspectRatio="xMidYMid meet"
    />
  </g>
`;

const brandedSvg = qrSvg.replace(
  "</svg>",
  `
  <rect
    x="${badgeOffset}"
    y="${badgeOffset}"
    width="${badgeSize}"
    height="${badgeSize}"
    rx="28"
    fill="#ffffff"
    opacity="0.97"
  />
  ${logoSvg}
</svg>`
);

await writeFile("public/help-center-qr.svg", brandedSvg, "utf8");
