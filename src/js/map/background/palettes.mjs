import landscaper from "@daos16/landscaper";

export function GetGrayscalePalette() {
  const palette = new landscaper.Palette();

  palette.AddColor(0, 0, 0, 0);
  palette.AddColor(255, 255, 255, 4);

  return palette;
}

export function GetEarthPalette() {
  const palette = new landscaper.Palette();

  palette.AddColor(17, 31, 76, 0);
  palette.AddColor(31, 49, 99, 1000);
  palette.AddColor(78, 97, 157, 200);
  palette.AddColor(66, 55, 41, 100);
  palette.AddColor(97, 78, 54, 200);
  palette.AddColor(45, 56, 49, 300);
  palette.AddColor(60, 70, 53, 500);
  palette.AddColor(69, 80, 63, 2000);
  palette.AddColor(60, 70, 53, 500);
  palette.AddColor(52, 69, 51, 1000);
  palette.AddColor(97, 78, 54, 500);

  return palette;
}

export function GetBurnPalette() {
  const palette = new landscaper.Palette();

  palette.AddColor(255, 255, 255, 0);
  palette.AddColor(255, 208, 0, 100);
  palette.AddColor(255, 149, 0, 100);
  palette.AddColor(255, 47, 0, 100);
  palette.AddColor(105, 20, 1, 100);
  palette.AddColor(0, 0, 0, 100);

  return palette;
}