import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'

async function run(): Promise<void> {
  try {
    const toolDir = tc.find('equinox', '1.14.0', 'x64')
    if (toolDir !== '') {
      core.addPath(toolDir)
      return
    }

    const channel = core.getInput('channel')

    if (!['stable', 'beta', ''].includes(channel)) {
      core.setFailed(`Unknown release channel ${channel}`)
      return
    }

    switch (process.platform) {
      case 'win32': {
        let toolUrl =
          'https://bin.equinox.io/a/3tDrUv1NjAT/release-tool-1.14.0-windows-amd64.zip'
        if (channel === 'beta') {
          toolUrl =
            'https://bin.equinox.io/a/ihPCmxfgCRn/release-tool-1.11.0-windows-amd64.zip'
        }
        const downloadPath = await tc.downloadTool(toolUrl)
        const extPath = await tc.extractZip(downloadPath)
        const cachedPath = await tc.cacheDir(extPath, 'equinox', '1.14.0')
        core.addPath(cachedPath)
        break
      }

      case 'darwin': {
        let toolUrl =
          'https://bin.equinox.io/a/dsR9Yc3Uxrc/release-tool-1.14.0-darwin-amd64.zip'
        if (channel === 'beta') {
          toolUrl =
            'https://bin.equinox.io/a/mQkEFPVp73u/release-tool-1.11.0-darwin-amd64.zip'
        }
        const downloadPath = await tc.downloadTool(toolUrl)
        const extPath = await tc.extractZip(downloadPath)
        const cachedPath = await tc.cacheDir(extPath, 'equinox', '1.14.0')
        core.addPath(cachedPath)
        break
      }

      case 'linux': {
        let toolUrl =
          'https://bin.equinox.io/a/hFqBgoEANbs/release-tool-1.14.0-linux-amd64.tar.gz'
        if (channel === 'beta') {
          toolUrl =
            'https://bin.equinox.io/a/2F6Hftj7dsf/release-tool-1.11.0-linux-amd64.tar.gz'
        }
        const downloadPath = await tc.downloadTool(toolUrl)
        const extPath = await tc.extractTar(downloadPath)
        const cachedPath = await tc.cacheDir(extPath, 'equinox', '1.14.0')
        core.addPath(cachedPath)
        break
      }

      default: {
        core.setFailed(`Unsupported platform: ${process.platform}`)
      }
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
