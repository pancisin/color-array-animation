import bubles = require("../animations/bubbles");
import scanner = require("../animations/scanner");
import Animationbase = require("../interfaces/animationbase.interface");
import Animationfactory = require("../interfaces/animationfactory.interface");
import Animationinitializer = require("../interfaces/animationinitializer.interface");

const animationsMap: Record<string, Function> = {
  bubbles: bubles,
  scanner: scanner,
};

const animationfactory: Animationfactory = {
  get: (animationName: string): Animationinitializer => {
    const animation: Function = animationsMap[animationName];

    if (animation == null || typeof animation !== "function") {
      throw Error(`Animation with name ${animationName} does not exists.`);
    }

    return {
      initialize: (
        inputColors: Array<string>,
        ledsCount: number,
        frameRate: number
      ): Animationbase => {
        return animation(inputColors, ledsCount, frameRate);
        // return animation.call({}, inputColors, ledsCount, frameRate);
      },
    } as Animationinitializer;
  },
};

export = animationfactory;
