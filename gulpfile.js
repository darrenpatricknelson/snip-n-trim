"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass")(require("sass"));
var concat = require("gulp-concat");
var cleanCss = require("gulp-clean-css");
sass.compiler = require("sass");

gulp.task("sass", function () {
  return gulp
    .src("./app/scss/main.scss")
    .pipe(concat("index.css"))
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("."));
});

gulp.task("sass:watch", function () {
  gulp.watch("./app/scss/**/*.scss", gulp.series(["sass"]));
});

gulp.task("sass:minify", function () {
  return gulp.src("./index.css").pipe(cleanCss()).pipe(gulp.dest("."));
});

gulp.task("sass:build", gulp.series(["sass", "sass:minify"]));
