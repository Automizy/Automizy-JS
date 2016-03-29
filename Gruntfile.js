module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        requirejs: {
            compile: {
                options: {
                    baseUrl: "src/",
                    paths: {
                        automizy: ''
                    },
                    name: "automizy/automizy",
                    optimize: "none",
                    out: "dist/automizy.js"
                }
            },
            css: {
                options: {
                    cssIn: "src/automizy.css",
                    out: "dist/automizy.css"
                }
            },
            cssMin: {
                options: {
                    cssIn: "src/automizy.css",
                    optimizeCss: "default",
                    out: "dist/automizy.min.css"
                }
            }
        },
		uglify: {
			all: {
				files: {
					"dist/automizy.min.js": ["dist/automizy.js"],
					"doc/js/automizy.min.js": ["dist/automizy.js"]
				},
				options: {
					preserveComments: false,
					sourceMap: true,
					sourceMapName: "dist/automizy.min.map",
					report: "min",
					beautify: {
						"ascii_only": true
					},
					compress: {
						hoist_funs: false,
						loops: false,
						unused: false,
						dead_code: false,
						conditionals: false,
						comparisons: false,
						evaluate: false,
						booleans: false,
						if_return: false,
						join_vars: false,
						warnings: false,
						negate_iife: false, //
						drop_console: false
					}
				}
			}
		},
		copy: {
			main: {
				files: [
					{expand: true, cwd: 'src/images/', src: '**/*', dest: 'dist/images/'}
				]
			},
			copytodist: {
				files: [
					{expand: true, cwd: 'dist/', src: '**/automizy.min.js', dest: 'doc/js/'},
					{expand: true, cwd: 'dist/', src: '**/automizy.min.map', dest: 'doc/js/'},
					{expand: true, cwd: 'dist/', src: '**/automizy.min.css', dest: 'doc/css/'},
					{expand: true, cwd: 'dist/', src: '**/automizy.min.js', dest: 'doc/example/js/'},
					{expand: true, cwd: 'dist/', src: '**/automizy.min.map', dest: 'doc/example/js/'},
					{expand: true, cwd: 'dist/', src: '**/automizy.min.css', dest: 'doc/example/css/'},
					{expand: true, cwd: 'dist/', src: 'images/*', dest: 'doc/example/'},
					{expand: true, cwd: 'dist/', src: '**/*', dest: 'doc/downloads/'}
				]
			}
		},
		compress: {
			main: {
				options: {
					archive: 'dist/automizyjs.zip'
				},
				files: [
					{expand: true, src: ['**/*.js', '**/*.map', '**/*.css', 'images/*'], cwd : "dist/"}
				]
			}
		}
    });
	
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadTasks('build/tasks');
    grunt.registerTask("default", ["requirejs", "require_clear", "uglify", "copy:main", "copy:copytodist", "compress"]);
};

