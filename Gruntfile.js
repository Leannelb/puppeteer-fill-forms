module.exports = grunt => {
  grunt.initConfig({
    execute: {
      target: {
        src: ["working_puppeteer.js"]
      }
    },
    watch: {
      scripts: {
        files: ["app.js"],
        tasks: ["execute"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-execute");
};
