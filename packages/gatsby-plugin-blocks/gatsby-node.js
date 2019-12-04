const fs = require('fs')
const path = require('path')
const util = require('util')
const bodyParser = require('body-parser')

const write = util.promisify(fs.writeFile)

exports.onCreateDevServer = ({ app, store }) => {
  const state = store.getState()
  const dirname = path.join(state.program.directory, 'src', 'pages')

  //  const filename = path.join(dirname, 'theme.json')

  //  console.log(dirname)

  app.use(bodyParser.json())

  app.post('/___blocks', async (req, res) => {
    const { code, page } = req.body
    if (!code) {
      return res.status(500).send({
        error: 'Did not receive code'
      })
    }

    const filename = path.join(dirname, page)
    await write(filename, code)
    res.send('ok beep')
  })
}
