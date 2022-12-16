import chroma = require("chroma-js");
import times = require("lodash/times");
import Animationbase = require("../interfaces/animationbase.interface");
import animationbase = require("./animationbase");

const traveller = (
  inputColors = [],
  ledsCount = 0,
  frameRate = 1
): Animationbase => {
  const cycles = 5;

  const accentColor: string = inputColors[0];
  const baseColor: string = inputColors[1];

  let palette: Array<string> = times(ledsCount, () => baseColor);
  let colors: Array<string> = palette;
  let currentIndex = 0;
  let round = 0;
  let currentCycle = 0;

  return animationbase(() => {
    colors = palette.map((color, idx) => {
      const targetColor = round ? baseColor : accentColor;
      if (idx < currentIndex) {
        return targetColor;
      }

      if (idx === currentIndex) {
        const targetColor = round ? baseColor : accentColor;
        return chroma.mix(color, targetColor, currentCycle / cycles).hex();
      }

      return color;
    });

    if (currentCycle + 1 >= cycles) {
      if (currentIndex + 1 >= ledsCount) {
        round = round == 1 ? 0 : 1;
        currentIndex = 0;
        palette = colors;
      } else {
        currentIndex += 1;
      }

      currentCycle = 0;
    } else {
      currentCycle += 1;
    }

    return colors;
  }, frameRate);
};

export = traveller;
