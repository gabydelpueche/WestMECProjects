/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.ejs",
            "./node_modules/tw-elements/dist/js/**/*.js"
          ],
  theme: {
    extend: {},
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
  darkMode: "class",
}

import {
  Input,
  Ripple,
  initTE,
} from "tw-elements";

initTE({ Input, Ripple });