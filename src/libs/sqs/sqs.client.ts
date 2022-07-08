import { SQSClient } from "@aws-sdk/client-sqs";

class SqsClient {
    private static instance: SqsClient;
    public sqsClient: SQSClient;

    private constructor() {
        console.log("SqsClient init");
        if(SqsClient.instance) {
            throw new Error("Error - already initialized");
        }
    }

    public init() {
        // region e.g. "us-east-1"
        this.sqsClient = new SQSClient(
            {
                endpoint: process.env.SQS_ENDPOINT,
                apiVersion: process.env.SQS_API_VERSION,
                region: process.env.SQS_REGION,
                credentials: {
                    accessKeyId: process.env.SQS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.SQS_SECRET_ACCESS_KEY
                }
            }
        );
    }

    destroy() {
        this.sqsClient.destroy();
    }

    static getInstance(): SqsClient {
        SqsClient.instance = SqsClient.instance || new SqsClient();
        return SqsClient.instance;
    }
}

export const SqsClientInstance = SqsClient.getInstance();