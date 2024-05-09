import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";
import ttfToWoffS from "gulp-ttf-to-woff";


export const otfToTtf = () => {
  return app.gulp
    .src(`${app.path.srcFolder}/fonts/*.otf`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "FONTS",
          message: "Error <% error.message %>",
        })
      )
    )
    .pipe(fonter({ formats: ["ttf"] }))
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`));
};

export const ttfToWoff = () => {
  return app.gulp
    .src(`${app.path.srcFolder}/fonts/*.ttf`, { encoding: false })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "FONTS",
          message: "Error <% error.message %>",
        })
      )
    )
    .pipe(ttfToWoffS())
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
};

function cb() {}
export const fontStyle = () => {
  let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;

  fs.readdir(app.path.build.fonts, (err, fontFiles) => {
    if (fontFiles) {
      if (!fs.existsSync(fontsFile)) {
        fs.writeFile(fontsFile, "", cb);
        let newFileOnly;
        for (let i = 0; i < fontFiles.length; i++) {
          let fontFileName = fontFiles[i].split(".")[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split("-")[0]
              ? fontFileName.split("-")[0]
              : fontFileName;
            let fontWeight = fontFileName.split("-")[1]
              ? fontFileName.split("-")[1]
              : fontFileName;

            const weightByName = {
              thin: 100,
              extralight: 200,
              light: 300,
              medium: 500,
              semibold: 600,
              bold: 700,
              extrabold: 800,
              heavy: 800,
              black: 900,
            };

            fontWeight = weightByName[fontWeight.toLocaleLowerCase()] ?? 400;

            fs.appendFile(
              fontsFile,
              `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2");\n\tfont-style: normal;}\r\n`,
              cb
            );

            newFileOnly = fontFileName;
          }
        }
      } else {
        console.log("Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить!");
      }
    }
  });

  return app.gulp.src(`${app.path.srcFolder}`)
};
