const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
// plumber evita que sass se detenga al encontrar un error
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
/**
 * En el package.json se debe añadir browserlist
 * Se pueden encontrar configuraciones varias en
 * https://browsersl.ist
 * 
 */
const autoprefixer = require('autoprefixer');


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

function dev( done ) {
	watch( 'src/scss/app.scss', css );
	done();
}
exports.css = css;
exports.dev = dev;
exports.default = series( css, dev);
