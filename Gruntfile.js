module.exports = function (grunt) {
  grunt.initConfig({
    eslint: {
      target: ['*.js', '*.jsx']
    },
    webpack: {
      compile: require('./webpack.config')
    },
    uglify: {
      options: {
        banner: `/**
 * BattleCavern Source Code
 * Copyright (c) 2018 BattleCavern
 * @license GPL-3.0
 */`
      },
      build: {
        src: 'bundle.js',
        dest: 'bundle.js'
      }
    }
  })

  grunt.loadNpmTasks('grunt-eslint')
  grunt.loadNpmTasks('grunt-webpack')
  grunt.loadNpmTasks('grunt-contrib-uglify-es')

  grunt.registerTask('default', ['eslint', 'webpack', 'uglify'])
}
