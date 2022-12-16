import Animationbase = require("../interfaces/animationbase.interface");
import animationbase = require("./animationbase");
import chroma = require("chroma-js");
import random = require("lodash/random");
import times = require("lodash/times");

const bubles = (
  inputColors = [],
  ledsCount = 0,
  frameRate = 1
): Animationbase => {
  const cycles = 15;
  const spring = 0.1;
  const bubbleSize = Math.floor(ledsCount / 4);

  const accentColor = inputColors[0];
  const baseColor = inputColors[1];

  const bubblePalette = chroma
    .scale([baseColor, accentColor, baseColor])
    .padding(0.2)
    .colors(bubbleSize);

  let currentCycle = 0;
  let currentPosition = 0;

  const randomizePosition = () => {
    const range = ledsCount - bubbleSize;
    currentPosition = random(range);
  };

  return animationbase(() => {
    if (currentCycle + 1 >= cycles) {
      currentCycle = 0;
      randomizePosition();
    } else {
      currentCycle += 1;
    }

    const descending = currentCycle >= cycles / 2;
    return times(ledsCount, (i: number) => {
      if (i < currentPosition || i >= currentPosition + bubbleSize) {
        return baseColor;
      }

      const targetColor = bubblePalette[i - currentPosition] || baseColor;

      if (descending) {
        return chroma
          .mix(targetColor, baseColor, currentCycle / cycles + spring)
          .hex();
      }

      return chroma
        .mix(baseColor, targetColor, currentCycle / cycles + spring)
        .hex();
    });
  }, frameRate);
};

export = bubles;
