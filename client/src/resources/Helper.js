import chroma from "chroma-js";
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function generatePalette(starterPalette) {
  let newPalette = {
    paletteName: starterPalette.paletteName,
    id: starterPalette.id,
    colorShades: {}
  };
  for (let level of levels) {
    newPalette.colorShades[level] = [];
  }
  for (let color of starterPalette.colorShades) {
    let scale = getScale(color.color, 10).reverse();
    for (let i in scale) {
      newPalette.colorShades[levels[i]].push({
        name: `${color.name}`,
        id: color.name.toLowerCase().replace(/ /g, "-"),
        hex: scale[i],
        rgb: chroma(scale[i]).css(),
        rgba: chroma(scale[i])
          .css()
          .replace("rgb", "rgba")
          .replace(")", ",1.0)")
      });
    }
  }
  return newPalette;
}
function getRange(hexColor) {
  const end = "#fff";
  return [
    chroma(hexColor)
      .darken(1.4)
      .hex(),
    hexColor,
    end
  ];
}

function getScale(hexColor, numberOfColors) {
  return chroma
    .scale(getRange(hexColor))
    .mode("lab")
    .colors(numberOfColors);
}

function getFromStorage(key) {
  if (!key) return null;

  try {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}

function setInStorage(key, obj) {
  if (!key) {
    console.error("Key is missing");
    return null;
  }

  try {
    localStorage.setItem(key, JSON.stringify(obj));
  } catch (err) {
    console.error(err);
    return null;
  }
}

function isAuthorized() {
  const obj = getFromStorage("main_app_token");
  if (obj && obj.token) {
    return true;
  } else {
    return false;
  }
}

function getUsername() {
  let username;
  if (isAuthorized()) {
    const obj = getFromStorage("main_app_token");
    username = obj.username;
  } else {
    username = undefined;
  }
  return username;
}

export {
  generatePalette,
  getFromStorage,
  setInStorage,
  isAuthorized,
  getUsername
};
