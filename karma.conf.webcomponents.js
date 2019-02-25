// Karma configuration
// Generated on Sat Jan 05 2019 22:31:58 GMT-0800 (PST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    plugins: ['@metahub/karma-rollup-preprocessor', 'karma-*'],


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'web-components'], // Added Chai and web-components


    // list of files / patterns to load in the browser
    files: [
      'chapter12and13/components/**/src/*.js',
      './node_modules/karma-web-components/framework.js',
        {
            pattern: './chapter12and13/components/**/test/karma-wc-test.html',
            watched: true,
            included: false // <--- THIS PART IS IMPORTANT!!!
        }
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
              // To include inlined sourcemaps as data URIs
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

    browsers: ['FirefoxHeadless', 'ChromeHeadless'],

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
