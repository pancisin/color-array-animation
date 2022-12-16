import Animationbase = require("../interfaces/animationbase.interface");
import animationbase = require("./animationbase");
import chroma = require("chroma-js");
import drop = require("lodash/drop");
import dropRight = require("lodash/dropRight");
import concat = require("lodash/concat");

const scanner = (
  inputColors = [],
  ledsCount = 0,
  frameRate = 1
): Animationbase => {
  const cycles = 4;

  const accentColor = inputColors[0];
  const baseColor = inputColors[1];

  const palette = chroma
    .scale([baseColor, accentColor, baseColor])
    .padding(-0.2)
    .colors(ledsCount);

  let colors = palette;
  let currentIndex = 0;
  let currentCycle = 0;

  return animationbase(() => {
    const transposedPalette: Array<string> = concat(
      drop(palette, currentIndex),
      dropRight(palette, ledsCount - currentIndex)
    );

    // const transposedPalette = _(palette)
    //   .drop(currentIndex)
    //   .concat(_.dropRight(palette, ledsCount - currentIndex))
    //   .value();

    colors = colors.map((color: string, idx: number) => {
      const targetColor = transposedPalette[idx];

      if (currentCycle + 1 === cycles) {
        return targetColor;
      }

      return chroma.mix(color, targetColor, 1 / cycles).hex();
    });

    if (currentCycle + 1 >= cycles) {
      currentIndex = currentIndex + 1 >= ledsCount ? 0 : currentIndex + 1;
      currentCycle = 0;
    } else {
      currentCycle += 1;
    }

    return colors;
  }, frameRate);
};

export = scanner;
