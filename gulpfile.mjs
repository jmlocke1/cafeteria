import gulp from 'gulp';
const { src, dest, watch, series, parallel } = gulp;

// CSS y SASS
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
// plumber evita que sass se detenga al encontrar un error
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';

/**
 * En el package.json se debe añadir browserlist
 * Se pueden encontrar configuraciones varias en
 * https://browsersl.ist
 * 
 */
import autoprefixer from 'autoprefixer';

// Imágenes
import imagemin from 'gulp-imagemin';

function css( done ) {
	// Compilar sass
	// pasos: 1 - Identificar archivo, 2- Compilarla, 3 - Guardar el .css
	src('src/scss/app.scss')
		.pipe( plumber() )
		// Compila css minificado
		// .pipe( sass({ outputStyle: 'compressed'}) )
		.pipe( sass() )
		.pipe( postcss([autoprefixer()]) )
		.pipe( dest('build/css') )
	done();
}

function imagenes ( done ) {
	src('src/img/**/*')
		.pipe( imagemin({ optimizationLevel: 3 }) )
		.pipe( dest('build/img') );
	done();
}

function dev( done ) {
	watch( 'src/scss/**/*.scss', css );
	watch('src/img/**/*', imagenes)
	done();
}
export {
	css as css,
	dev as dev,
	imagenes as imagenes
}
export default series( imagenes, css, dev);