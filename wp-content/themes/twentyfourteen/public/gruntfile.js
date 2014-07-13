module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    // Task configuration.

    clean: {
      dist: ['javascripts/min','stylesheets/min']
    },

    //必要的语法检查
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: [
          'Gruntfile.js',
          'javascripts/jc.js',
          'javascripts/coraui.media.js'
        ]
      }
    },

    //js的合并与压缩
    uglify: {
      lib: {
        src: ['javascripts/jquery-1.9.1.js','javascripts/underscore-min.js','javascripts/prefixfree.min.js'],
        dest: 'javascripts/min/lib.js'
      },
      buildplugins:{ //, 'javascripts/flame.js'
        src:['javascripts/director.js','javascripts/jquery.vegas.js','javascripts/jquery.lettering.js','javascripts/jquery.transform-0.9.1.min','javascripts/coraui.media.js'],
        dest:'javascripts/min/jquery.plugins.js'
      },
      buildjc:{
        src:'javascripts/jc.js',
        dest:'javascripts/min/jc.min.js'
      },
      buildTheme1:{
        src:'../js/functions-src.js',
        dest:'../js/functions.js'
      },
      buildTheme2:{
        src:'../js/slider-src.js',
        dest:'../js/slider.js'
      }
    },

      /*
    //Less的编译

    less: {
      production: {
        options: {
          paths: ["pageload-ajax/Demo/style/","pageguide/Demo/style/"],
          cleancss: true // development please set false
        },
        files: {
          "pageload-ajax/Demo/style/page.css": "pageload-ajax/Demo/style/page.less"
        }
      }
    }*/

    //CSS处理连结及压缩
    concat : {
        css : {
            src: ['stylesheets/*.css'],
            dest:'stylesheets/min/all.css'
        }
    },
    cssmin: {
        css1: {
            src:'stylesheets/min/all.css',
            dest:'stylesheets/min/all-min.css'
        },
        css2: {
            src:'../style-src.css',
            dest:'../style.css'
        }
    },
    htmlmin: {                                     // Task
        dist: {                                      // Target
          options: {                                 // Target options
            removeComments: true,
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS: true
          },
          files: {                                   // Dictionary of files
            '../jc.php': '../jc-src.php'    // 'destination': 'source'
          }
        }
    }
  
  });



  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-contrib-less');
  
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-css');

  

  // JS distribution task.
  grunt.registerTask('dist-js', ['jshint', 'uglify']);
  // grunt.registerTask('dist-js', ['jshint', 'requirejs']);

  // CSS distribution task.
  //grunt.registerTask('dist-css', ['less:production']);
  grunt.registerTask('dist-css', ['concat','cssmin']);
  // HTML validate.
  //grunt.registerTask('html-validate', ['htmlhint']);
  grunt.registerTask('dist-html', ['htmlmin']);
  // Default task.
  // grunt.registerTask('default', ['dist-css', 'dist-js', 'html-validate']);
  grunt.registerTask('default', ['dist-css', 'dist-js', 'dist-html']);
  // grunt.registerTask('default', ['dist-js']);

};