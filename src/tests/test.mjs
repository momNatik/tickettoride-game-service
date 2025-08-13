import Generator from "@daos16/landscaper";
import Palette from "@daos16/landscaper";
import { describe, it } from "node:test";
import assert from "node:assert";

describe("Landscaper class constructor", () => {
  it("should set width and height correctly", () => {
    const options = {
      width: 320,
      height: 240,
    };
    const generator = new Generator(options);

    assert.strictEqual(generator.width, 320);
    assert.strictEqual(generator.height, 240);
  });

  it("should fill RGB buffer", async () => {
    const palette = CreateBurnPalette();
    // const palette = CreateEarthPalette();
    const options = {
      width: 320,
      height: 240,
    };

    const generator = new Generator(options);
    const rgbBuffer = await generator.FillRgbBufferAsync(2, 0.95, palette);

    assert.notEqual(null, rgbBuffer);
  });
});

function CreateBurnPalette() {
  const palette = new Palette();

  palette.AddColor(255, 255, 255, 0);
  palette.AddColor(255, 208, 0, 10);
  palette.AddColor(255, 149, 0, 10);
  palette.AddColor(255, 47, 0, 10);
  palette.AddColor(105, 20, 1, 10);
  palette.AddColor(0, 0, 0, 10);

  return palette;
}