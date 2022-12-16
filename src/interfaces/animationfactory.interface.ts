import Animationinitializer = require("./animationinitializer.interface");

interface Animationfactory {
  get: (animationName: string) => Animationinitializer;
}

export = Animationfactory;
