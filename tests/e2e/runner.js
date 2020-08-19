const path = require('path')

const { Nuxt, Builder } = require('nuxt')
const spawn = require('cross-spawn')

let opts = process.argv.slice(2)

if (!opts.includes('--config')) {
  opts = opts.concat(['--config', 'nightwatch.conf.js'])
}

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'test'
}

const rootDir = path.resolve(__dirname, '../../')
const startJsonServer = require('../../api/server')

async function runTests() {
  const config = require(path.resolve(rootDir, 'nuxt.config.js'))

  config.rootDir = rootDir
  config.dev = false

  let nuxt

  if (!opts.includes('--local')) {
    nuxt = new Nuxt(config)

    try {
      await new Builder(nuxt).build()
      await nuxt.listen(3000, 'localhost')
    } catch (err) {
      nuxt.close()
      process.exit(1)
    }
  }

  const runner = spawn('./node_modules/.bin/nightwatch', opts, {
    stdio: 'inherit'
  })

  runner.on('exit', function(code) {
    nuxt && nuxt.close()
    process.exit(code)
  })

  runner.on('error', function(err) {
    nuxt && nuxt.close()
    throw err
  })
}

startJsonServer(runTests)
