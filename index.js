const inquirer = require("inquirer");
const pg = require("pg");

const questions = [
  {
    type: "input",
    name: "text",
    message: "Enter up to three characters for the logo:",
    validate: (input) =>
      input.length <= 3 ? true : "Text must be up to three characters.",
  },
  {
    type: "list",
    name: "shape",
    message: "Choose a shape for the logo:",
    choices: ["circle", "triangle", "square"],
  },
  {
    type: "input",
    name: "shapeColor",
    message: "Enter a color for the shape (name or hex):",
  },
  {
    type: "input",
    name: "textColor",
    message: "Enter a color for the text (name or hex):",
  },
];

inquirer.prompt(questions).then((answers) => {
  const svgContent = generateSVG(answers);
  saveSVG(svgContent);
});
