import replace from "gulp-replace";
import plumber from "gulp-plumber"; // error handling
import notify from "gulp-notify";
import browsersync from "browser-sync";
import newer from "gulp-newer";
import ifPlugin from "gulp-if";

export const plugins = {
  replace,
  plumber,
  notify,
  if: ifPlugin,
  browsersync,
  newer
};
