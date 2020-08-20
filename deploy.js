const showBanner = require('node-banner')
const FtpDeploy = require('ftp-deploy')
const axios = require('axios')
const ftpDeploy = new FtpDeploy()

const printBanner = async (title, color) => {
  await showBanner(title, '', color)
}

const updateVersion = async (api) => {
  try {
    const res = await axios.get(
      api + '/jjtPlatformAdmin/platformAdmin/common/updateAllUserToken'
    )
    console.log('更新版本成功', res.data)
  } catch (err) {
    console.error(err)
  }
}

const EnvDomain = {
  test: {
    host: '182.61.139.115',
    user: 'yangsh',
    password: '2^Jw$#2Qb5',
    short: 'test',
    api: 'http://182.61.139.115',
  },
  production: {
    host: '182.61.4.137',
    user: 'yangsh',
    password: 'b%RU470!',
    short: 'prod',
    api: 'https://jjt2.top',
  },
}
const env = EnvDomain[process.env.NODE_ENV]
const { user, host, password, short } = env
printBanner(`Deploying ${short}`, 'yellow')

const config = {
  user,
  password,
  host,
  port: 21,
  localRoot: __dirname + '/build',
  remoteRoot: '/school',
  include: ['*', '**/*'],
  deleteRemote: true,
  forcePasv: true,
}

ftpDeploy
  .deploy(config)
  .then(() => {
    updateVersion(env.api)
    printBanner(`Deploy ${short} Success`, 'green')
  })
  .catch((err) => {
    console.log(err)
    printBanner(`Deploy ${short} failed`, 'red')
  })
