import { app } from 'electron'
import path from 'path'
import isDev from './isDev.js'

export const getPreloadPath = () => {
    console.log(path.join(app.getAppPath()))
    return path.join(
        app.getAppPath(),
        isDev() ? '.' : '..',
        '/dist-electron/preload.cjs'
    )
}