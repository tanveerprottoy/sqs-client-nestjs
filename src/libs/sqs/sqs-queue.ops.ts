import { CreateQueueCommand, CreateQueueCommandInput, DeleteQueueCommand, DeleteQueueCommandInput, GetQueueUrlCommand, GetQueueUrlCommandInput, ListQueuesCommand } from "@aws-sdk/client-sqs";
import { Logger } from "@nestjs/common";
import { SqsClientInstance } from "./sqs.client";

class SqsQueueOps {
    private static instance: SqsQueueOps;

    private constructor() {
        console.log('SqsQueueOps init');
        if(SqsQueueOps.instance) {
            throw new Error("Error - already initialized");
        }
    }

    static getInstance(): SqsQueueOps {
        SqsQueueOps.instance = SqsQueueOps.instance || new SqsQueueOps();
        return SqsQueueOps.instance;
    }

    create = async (
        params: CreateQueueCommandInput
    ) => {
        try {
            return await SqsClientInstance.sqsClient.send(
                new CreateQueueCommand(params)
            );
        }
        catch(e) {
            Logger.error(e);
            return null;
        }
    }

    list = async () => {
        try {
            return await SqsClientInstance.sqsClient.send(
                new ListQueuesCommand({})
            );
        }
        catch(e) {
            Logger.error(e);
            return null;
        }
    }

    getUrl = async (
        params: GetQueueUrlCommandInput
    ) => {
        try {
            return await SqsClientInstance.sqsClient.send(
                new GetQueueUrlCommand(params)
            );
        }
        catch(e) {
            Logger.error(e);
            return null;
        }
    }

    delete = async (
        params: DeleteQueueCommandInput
    ) => {
        try {
            return await SqsClientInstance.sqsClient.send(
                new DeleteQueueCommand(params)
            );
        }
        catch(e) {
            Logger.error(e);
            return null;
        }
    }
}

export const SqsQueueOpsInstance = SqsQueueOps.getInstance();