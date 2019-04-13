import login from './login'
const files = require.context('.', false, /\.js$/)
const modules = {
  login
}

files.keys().forEach(key => {
  if (key === './index.js') return
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default modules
