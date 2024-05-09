// import webp from 'gulp-webp'
import imagemin from "gulp-imagemin";
import pngquant from "imagemin-pngquant";

import jpegtran from "imagemin-jpegtran";
import imageminWebp from "imagemin-webp";
import rename from "gulp-rename";

export const images = () => {
  return (
    app.gulp
      .src(app.path.src.images)
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "IMAGES",
            message: "Error: <% error.message %>",
          })
        )
      )
      .pipe(imagemin())
      .pipe(app.gulp.dest(app.path.build.images))
      .pipe(app.plugins.browsersync.stream())
  );
};
