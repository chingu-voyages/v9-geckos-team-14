const Pallete = require("./models/Pallete");
const mongoose = require("mongoose");

const THEMES = [
  {
    name: "Gruvbox Dark",
    author: "morhetz",
    colors: [
      { color: "#282828", order: 0 },
      { color: "#cc241d", order: 1 },
      { color: "#98971a", order: 2 },
      { color: "#d79921", order: 3 },
      { color: "#458588", order: 4 },
      { color: "#b16286", order: 5 },
      { color: "#689d6a", order: 6 },
      { color: "#a89984", order: 7 },
      { color: "#928374", order: 8 },
      { color: "#fb4934", order: 9 },
      { color: "#b8bb26", order: 10 },
      { color: "#fabd2f", order: 11 },
      { color: "#83a598", order: 12 },
      { color: "#d3869b", order: 13 },
      { color: "#8ec07c", order: 14 },
      { color: "#ebdbb2", order: 15 },
      { color: "#1d2021", order: 16 },
      { color: "#282828", order: 17 },
      { color: "#3c3836", order: 18 },
      { color: "#504945", order: 19 },
      { color: "#665c54", order: 20 },
      { color: "#7c6f64", order: 21 },
      { color: "#928374", order: 22 },
      { color: "#d65d0e", order: 23 },
      { color: "#32302f", order: 24 },
      { color: "#a89984", order: 25 },
      { color: "#bdae93", order: 26 },
      { color: "#d5c4a1", order: 27 },
      { color: "#ebdbb2", order: 28 },
      { color: "#fbf1c7", order: 29 },
      { color: "#fe8019", order: 30 }
    ]
  },
  {
    name: "Gruvbox Light",
    author: "morhetz",
    colors: [
      { color: "#fbf1c7", order: 1 },
      { color: "#cc241d", order: 2 },
      { color: "#98971a", order: 3 },
      { color: "#d79921", order: 4 },
      { color: "#458588", order: 5 },
      { color: "#b16286", order: 6 },
      { color: "#689d6a", order: 7 },
      { color: "#7c6f64", order: 8 },
      { color: "#928374", order: 9 },
      { color: "#9d0006", order: 10 },
      { color: "#79740e", order: 12 },
      { color: "#b57614", order: 13 },
      { color: "#076678", order: 14 },
      { color: "#8f3f71", order: 15 },
      { color: "#427b58", order: 16 },
      { color: "#3c3836", order: 17 },
      { color: "#f9f5d7", order: 18 },
      { color: "#fbf1c7", order: 19 },
      { color: "#ebdbb2", order: 20 },
      { color: "#d5c4a1", order: 21 },
      { color: "#bdae93", order: 22 },
      { color: "#a89984", order: 23 },
      { color: "#928374", order: 24 },
      { color: "#d65d0e", order: 25 },
      { color: "#f2e5bc", order: 26 },
      { color: "#7c6f64", order: 27 },
      { color: "#665c54", order: 28 },
      { color: "#504945", order: 29 },
      { color: "#3c3836", order: 30 },
      { color: "#282828", order: 31 },
      { color: "#af3a03", order: 32 }
    ]
  },
  {
    name: "Solarized",
    colors: [
      { color: "#002b36", order: 1 },
      { color: "#073642", order: 2 },
      { color: "#586e75", order: 3 },
      { color: "#657b83", order: 4 },
      { color: "#839496", order: 5 },
      { color: "#93a1a1", order: 6 },
      { color: "#eee8d5", order: 7 },
      { color: "#fdf6e3", order: 8 },
      { color: "#b58900", order: 9 },
      { color: "#cb4b16", order: 10 },
      { color: "#dc322f", order: 12 },
      { color: "#d33682", order: 13 },
      { color: "#6c71c4", order: 14 },
      { color: "#268bd2", order: 15 },
      { color: "#2aa198", order: 16 },
      { color: "#859900", order: 17 }
    ]
  }
];

mongoose
  .connect("mongodb://localhost/chingu-color-app", {
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("DB connected");

    THEMES.map((theme, index) => {
      const { name, author, colors } = theme;

      const newPallete = new Pallete({
        name: name,
        author: author ? author : "By anonymouse"
      });

      colors.map(color => {
        newPallete.colors.push({ hex: color.color, order: color.order });
      });

      newPallete
        .save()
        .then(pallete => {
          console.log(
            `${index + 1}/${THEMES.length}. New pallete created: ${pallete._id}`
          );
          if (index + 1 >= THEMES.length) {
            console.log("Done.\nDB connection closed.\nExit.");
            mongoose.connection.close();
            process.exit();
          }
        })
        .catch(err => {
          console.error(err);
          process.emit("SIGINT");
        });
    });

    return;
  })
  .catch(error => console.error(error));
