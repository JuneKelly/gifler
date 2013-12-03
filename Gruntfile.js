'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      coffee: {
        files: [
          "resources/scripts/*.coffee",
          "resources/scripts/controllers/*.coffee"
        ],
        tasks: 'newer:coffee',
        options: {
          liveReload: true
        }
      },
      styles: {
        files: ["resources/styles/main.css"],
        tasks: "newer:copy:styles"
      },
      views: {
        files: ["resources/views/*.html"],
        tasks: "newer:copy:views"
      }
    },
    exec: {
      server: {
        cmd: "lein ring server-headless"
      }
    },
    coffee: {
      compile: {
        files: {
          "resources/public/js/app.js": [
            "resources/scripts/*.coffee",
            "resources/scripts/controllers/*.coffee"
          ]
        }
      }
    },
    copy: {
      styles: {
        expand: true,
        cwd: 'resources/styles',
        dest: 'resources/public/css/',
        src: '{,*/}*.css'
      },
      views: {
        expand: true,
        cwd: 'resources/views',
        dest: 'resources/public/views/',
        src: '*.html'
      },
      bower: {
        expand: true,
        cwd: 'resources/bower_components',
        dest: 'resources/public/vendor/',
        src: '**/*'
      }
    },
    concurrent: {
      server: ['exec:server', 'watch']
    }
  });

  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('server', ['copy:styles', 'copy:views', 'copy:bower', 'coffee', 'concurrent:server']);
};
