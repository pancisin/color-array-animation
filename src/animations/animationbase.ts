import Animationbase = require("../interfaces/animationbase.interface");

const animationbase = (
  animationCallback: () => Array<string>,
  frameRate = 1
): Animationbase => {
  let intervalId: ReturnType<typeof setInterval>;

  const start = (callback: (newState: Array<string>) => void) => {
    intervalId = setInterval(() => {
      if (typeof callback === "function") {
        let newState: Array<string> = [];

        if (typeof animationCallback === "function") {
          newState = animationCallback();
        }

        callback(newState);
      }
    }, 1000 / frameRate);
  };

  return {
    dispose: () => {
      if (intervalId != null) {
        clearInterval(intervalId);
      }
    },
    start,
  };
};

export = animationbase;
