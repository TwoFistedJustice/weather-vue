

/*
https://www.npmjs.com/package/google-fonts-webpack-plugin
https://stackoverflow.com/questions/51516084/how-do-i-add-a-google-font-to-a-vuejs-component/51517799
https://fonts.google.com/specimen/Raleway
* */

const GoogleFontsPlugin = require("google-fonts-webpack-plugin");

module.exports = {
  "entry": "index.js",
  configureWebpack: {
    plugins: [
      new GoogleFontsPlugin({
        fonts: [
          {family: "Raleway"}
        ]
      })
    ]
  }
}
