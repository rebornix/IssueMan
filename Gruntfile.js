module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        gim: {
            root: '.',
            app: 'src',
            dist: 'drop',
            tmp: '.tmp'
        },

        clean: ['<%= gim.tmp %>', '<%= gim.dist %>'],

        bowerInstall: {
            app: {
                src: ['<%= gim.app %>/index.html'],
                ignorePath: '<%= gim.app %>/'
            }
        },
		
		copy: {
            dist: {
                files: [			
					{
                        expand: true,
                        cwd: '<%= gim.app %>/fonts/',
                        src: ['**/*.{ttf,eot,svg,woff}'],
                        dest: '<%= gim.dist %>/fonts/'
                    },

                    {
                        expand: true,
                        cwd: '<%= gim.app %>/',
                        src: ['*.{html,ico,js,json}'],
                        dest: '<%= gim.dist %>/'
                    }
                ]
            }
        },
		
		ngmin: {
            dist: {
                files: {
                    '<%= gim.tmp %>/concat/js/gim.js': ['<%= gim.tmp %>/concat/js/gim.js']
                }
            }
        },

        uglify: {
            options: {
                compress: {
                    drop_console: true
                },
                mangle: {
                    except: ['$compile', '$scope']
                }
            }
        },
		
		useminPrepare: {
            html: '<%= gim.app %>/index.html',
            options: {
                dest: '<%= gim.dist %>',
                staging: '<%= gim.tmp %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['concat', 'cssmin']
                        },
                        post: {}
                    }
                }
            }
        },
		
		rev: {
            dist: {
                files: {
                    src: [
            '<%= gim.dist %>/js/*.js',
            '<%= gim.dist %>/css/*.css'
                    ]
                }
            }
        },
		
		usemin: {
            html: ['<%= gim.dist %>/index.html'],
            options: {
                assetsDirs: ['<%= gim.dist %>']
            }
        },
		
        express:{
            options: {
                port: 9000
            },
            dev: {
                options: {
                    script: '<%= gim.app %>/server.js'
                }
            },
			dist: {
                options: {
                    script: '<%= gim.dist %>/server.js'
                }
            }
        },
		
		deploy: {
            configFile: '<%= gim.root %>/DeployConfig.json'
        },
		
		watch: {
			express: {
                files: ['<%= gim.app %>/*.js'],
                tasks: ['express:dev']
            }
		}
    });

    // Plugin tasks.
	grunt.loadNpmTasks('grunt-http');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-bower-install');

	grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-usemin');
	
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

    // Custom tasks.
    grunt.task.loadTasks('tasks');

    // Alias tasks
    grunt.registerTask('dev', ['clean', 'bowerInstall','express:dev','watch']);
	grunt.registerTask('prod', ['clean', 'bowerInstall', 'useminPrepare', 'copy', 'concat', 'ngmin', 'uglify', 'cssmin', 'rev', 'usemin']);
	grunt.registerTask('serve', ['prod', 'express:dist', 'watch']);
};