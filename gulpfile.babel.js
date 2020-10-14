import gulp from 'gulp'
import sass from 'gulp-sass'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import browsersync from 'browser-sync'
import plumber from 'gulp-plumber'
import sourcemaps from 'gulp-sourcemaps'
import rename from 'gulp-rename'

//Variables/constantes
//Css/Sass
const cssPlugins = [
    autoprefixer()
]

gulp.task('styles', () => {
    return gulp
    .src('scss/**/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
	.pipe(sass({
        outputStyle: 'expanded',
        sourceComments: true
    }))
    .pipe(postcss(cssPlugins))  
    .pipe(sourcemaps.write('./')) 
    .pipe(gulp.dest('css/'))
    .pipe(browsersync.stream()) 
})

gulp.task('styles-min', () => {
    return gulp
    .src('scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(postcss(cssPlugins)) 
    .pipe(rename('layout-maker.min.css'))
    .pipe(gulp.dest('css/'))
})

//Default task
gulp.task('default', () => {
//Css/Sass
    gulp.watch('scss/**/*.+(scss|css)', gulp.series('styles'))
    gulp.watch('scss/**/*.+(scss|css)', gulp.series('styles-min'))

//browsersync
    browsersync.init({
        server: {
            baseDir: "./"
        }
    })
    gulp.watch('./**/*.html').on('change', browsersync.reload)
})
