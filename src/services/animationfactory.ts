import bubles = require("../animations/bubbles");
import scanner = require("../animations/scanner");

const animationsMap: Record<string, Function> = {
  bubbles: bubles,
  scanner: scanner,
};

const animationfactory = {
  get: (animationName: string) => {
    const animation: Function = animationsMap[animationName];

    if (animation == null || typeof animation !== "function") {
      throw Error(`Animation with name ${animationName} does not exists.`);
    }

    return {
      initialize: (
        inputColors: Array<string>,
        ledsCount: number,
        frameRate: number
      ) => {
        // animation.apply({}, inputColors, ledsCount, frameRate);
        animation.call({}, inputColors, ledsCount, frameRate);
      },
    };
  },
};

export = animationfactory;
