import Animationbase = require("./animationbase.interface");

interface Animationinitializer {
  initialize: (
    inputColors: Array<string>,
    ledsCount: number,
    frameRate: number
  ) => Animationbase;
}

export = Animationinitializer;
