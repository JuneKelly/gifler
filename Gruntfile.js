'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      coffee: {
        files: [
          "resources/scripts/*.coffee"
        ],
        tasks: 'newer:coffee',
        options: {
          liveReload: true
        }
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
    concurrent: {
      server: ['exec:server', 'watch']
    }
  });

  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('server', ['coffee', 'concurrent:server']);
};
