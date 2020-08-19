module.exports = {
  src_folders: ['./tests/e2e/specs'],
  output_folder: './tests/e2e/reports',
  custom_commands_path: [
    './node_modules/nightwatch-xhr/es5/commands',
    './tests/e2e/custom-commands'
  ],
  custom_assertions_path: ['./node_modules/nightwatch-xhr/es5/assertions'],
  page_objects_path: ['./tests/e2e/page-objects'],
  globals_path: './tests/e2e/globals.js',

  webdriver: {
    start_process: true,
    port: 9515,
    server_path: require('chromedriver').path
  },

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: [
            '--window-size=1920,1080',
            '--start-maximized',
            '--no-sandbox',
            '--disable-dev-shm-usage'
          ]
        }
      },
      launch_url: process.env.BASE_URL,
      screenshots: {
        enabled: true,
        on_failure: true,
        on_error: false,
        path: './tests/e2e/screenshots'
      }
    },

    safari: {
      desiredCapabilities: {
        browserName: 'safari',
        alwaysMatch: {
          acceptInsecureCerts: false
        }
      },
      webdriver: {
        start_process: true,
        port: 4445,
        server_path: '/usr/bin/safaridriver'
      }
    },

    firefox: {
      desiredCapabilities: {
        browserName: 'firefox'
      },
      webdriver: {
        start_process: true,
        port: 4444,
        server_path: require('geckodriver').path
      }
    }
  }
}
