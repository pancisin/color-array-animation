# Color Array Animation

## Getting Started

Install from npm

```
npm install color-array-animation
```

Import animation factory into the project

```javascript
import animationFactory from "color-array-animation";
```

Build animation generator

```javascript
const accentColor = "#f00";
const baseColor = "#000";

const animation = animationFactory
  .get("scanner")
  .initialize([accentColor, baseColor], 20, 1);

animation.start((colorsArray) => /* Use generated color array. */);
```

## Animation Library

```
scanner
bubbles
traveller
```

## Api
