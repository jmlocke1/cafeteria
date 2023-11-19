const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
// plumber evita que sass se detenga al encontrar un error
const plumber = require('gulp-plumber');

function css( done ) {
	// Compilar sass
	// pasos: 1 - Identificar archivo, 2- Compilarla, 3 - Guardar el .css
	src('src/scss/app.scss')
		.pipe( plumber() )
		// Compila css minificado
		// .pipe( sass({ outputStyle: 'compressed'}) )
		.pipe( sass({ outputStyle: 'expanded'}) )
		.pipe( dest('build/css') )
	done();
}

function dev( done ) {
	watch( 'src/scss/app.scss', css );
	done();
}
exports.css = css;
exports.dev = dev;
exports.default = dev;
