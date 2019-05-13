// Karma configuration
// Generated on Sat Jan 05 2019 22:31:58 GMT-0800 (PST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    plugins: ['@metahub/karma-rollup-preprocessor', 'karma-*'],


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'], // Added Chai


    // list of files / patterns to load in the browser
    files: [
      'chapter12and13/components/**/test/karma-test.js',
      'chapter12and13/components/**/*.js'
    ],


    // list of files / patterns to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        './chapter12and13/components/**/*.js': ['rollup']  // ADD preprocessors
    },

    rollupPreprocessor: {
      options: {
          output: {
              sourcemap: true,
              format: 'iife',
              name: 'testing'
          }
      }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    browsers: ['FirefoxHeadless', 'ChromeHeadless', 'Safari'],

    // defining custom launchers wouldn't be necessary if karma-safari-launcher worked, but due to an issue in Mojave:
    // https://github.com/karma-runner/karma-safari-launcher/issues/29
    // we're using an alternate karma-safarinative-launcher
    // not sure if the original package works out a solution
    customLaunchers: {
      Safari: {
          base: 'SafariNative'
      }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true, // Change to true

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    // Add TDD testing
    client: {
        mocha: {
            ui: 'tdd'
        }
    }
  })

};
