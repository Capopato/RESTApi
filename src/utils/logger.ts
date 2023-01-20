import logger from 'pino'

const log = logger({
    transport: {
        target: "pino-pretty",
        options: {
            translateTime: 'SYS:dd-mm-yyyy hh:mm:ss TT',
            colorize: true,
            ignore: 'pid,hostname'
        }
    }
})

export default log