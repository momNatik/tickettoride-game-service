import landscaper from "@daos16/landscaper";
import sharp from "sharp";
import {
  GetGrayscalePalette,
  GetEarthPalette,
  GetBurnPalette,
} from "./palettes.js";

export default { CreateAsync };

async function CreateAsync(options) {
  const palette = GetPalette(options.paletteType);
  return await CreatePicture(options, palette);
}

async function CreatePicture(options, palette) {
  const generator = new landscaper.Generator(options);
  const rgbBuffer = await generator.FillRgbBufferAsync(2, 0.95, palette);

  const sharpOptions: sharp.SharpOptions = {
    raw: {
      width: options.width,
      height: options.height,
      channels: landscaper.Generator.CHANNELS_COUNT,
    },
  };

  return sharp(rgbBuffer, sharpOptions).toFormat("png");
}

function GetPalette(type) {
  switch (type) {
    case "earth":
      return GetEarthPalette();
    case "burn":
      return GetBurnPalette();
    default:
      return GetGrayscalePalette();
  }
}