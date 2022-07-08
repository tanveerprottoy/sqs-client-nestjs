export const Constants = {
    API: 'api',
    API_VERSION_1: '1',
    GENERIC_QUEUE_NAME: "GENERIC.fifo",
    GENERIC_QUEUE_URL: "http://localhost:4566/000000000000/GENERIC.fifo",
    QUEUE_GROUP_ID: "queueGroup",

    WAIT_TIME_SECONDS: 0, // 0-20
    VISIBILITY_TIMEOUT: 15,

    QUEUE_DELAY: 0,
    QUEUE_MESSAGE_RETENTION_PERIOD: 86400,

    IS_FIFO_QUEUE: true,
} as const;
