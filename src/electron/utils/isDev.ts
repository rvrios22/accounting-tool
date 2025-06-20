/*this function returns a boolean value that tells electron if you are in dev mode. 
This value is used in main.ts to determine if the project needs to be in the localhost vite server or running through the dist .html file*/

const isDev = (): boolean => {
    return process.env.NODE_ENV === 'development'
}

export default isDev