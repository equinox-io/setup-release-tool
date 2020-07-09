import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'

async function run(): Promise<void> {
  try {
    switch(process.platform) {
      case 'win32': {
        const downloadPath = await tc.downloadTool('https://bin.equinox.io/a/3tDrUv1NjAT/release-tool-1.14.0-windows-amd64.zip')
        const extPath = await tc.extractZip(downloadPath)
        const cachedPath = await tc.cacheFile(extPath, 'equinox', 'equinox', '1.14.0')
        core.debug(cachedPath)
        break;
      }

      case 'darwin': {
        const downloadPath = await tc.downloadTool('https://bin.equinox.io/a/dsR9Yc3Uxrc/release-tool-1.14.0-darwin-amd64.zip')
        const extPath = await tc.extractZip(downloadPath)
        const cachedPath = await tc.cacheFile(extPath, 'equinox', 'equinox', '1.14.0')
        core.debug(cachedPath)
        break;
      }

      default: {
        const downloadPath = await tc.downloadTool('https://bin.equinox.io/a/hFqBgoEANbs/release-tool-1.14.0-linux-amd64.tar.gz')
        const extPath = await tc.extractTar(downloadPath)
        const cachedPath = await tc.cacheFile(extPath, 'equinox', 'equinox', '1.14.0')
        core.debug(cachedPath)
        break;
      }
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
