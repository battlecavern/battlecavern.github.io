const webpackConfig = require('./webpack.config')

module.exports = function (grunt) {
  grunt.initConfig({
    eslint: {
      target: ['*.js', '*.jsx']
    },
    watch: {
      files: ['*.js', '*.jsx'],
      tasks: ['eslint', 'webpack']
    },
    webpack: {
      server: Object.assign({ watch: true }, webpackConfig)
    }
  })

  grunt.loadNpmTasks('grunt-eslint')
  grunt.loadNpmTasks('grunt-webpack')

  grunt.registerTask('default', ['eslint', 'webpack'])
}
