import replace from "gulp-replace";
import plumber from "gulp-plumber"; // error handling
import notify from "gulp-notify";
import browsersync from "browser-sync";

export const plugins = {
  replace,
  plumber,
  notify,
  browsersync
};
