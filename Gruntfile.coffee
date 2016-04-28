module.exports = (grunt) ->
	grunt.initConfig
		coffee:
			compile: {
				files: {
					'dist/js/app.js': ['app/js/main.js', 'app/js/**/*.coffee', 'app/js/**/**/*.coffee']
				}
			},
		watch:
			files: ['<%= coffee.files %>']
			tasks: ['coffee']

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', ['coffee']
  grunt.registerTask 'build', ['coffee']
