import { ChangeMessageVisibilityBatchCommand, ChangeMessageVisibilityBatchCommandInput, ChangeMessageVisibilityCommand, ChangeMessageVisibilityCommandInput, DeleteMessageBatchCommand, DeleteMessageBatchCommandInput, DeleteMessageCommand, DeleteMessageCommandInput, ReceiveMessageCommand, ReceiveMessageCommandInput, SendMessageBatchCommand, SendMessageBatchCommandInput, SendMessageCommand, SendMessageCommandInput } from "@aws-sdk/client-sqs";
import { Logger } from "@nestjs/common";
import { SqsClientInstance } from "./sqs.client";

class SqsMessageOps {
    private static instance: SqsMessageOps;

    private constructor() {
        console.log('SqsMessageOps init');
        if(SqsMessageOps.instance) {
            throw new Error("Error - already initialized");
        }
    }

    static getInstance(): SqsMessageOps {
        SqsMessageOps.instance = SqsMessageOps.instance || new SqsMessageOps();
        return SqsMessageOps.instance;
    }

    send = async (
        params: SendMessageCommandInput
    ) => {
        try {
            return await SqsClientInstance.sqsClient.send(
                new SendMessageCommand(params)
            );
        }
        catch(e) {
            Logger.error(e);
            return null;
        }
    }

    sendBatch = async (
        params: SendMessageBatchCommandInput
    ) => {
        try {
            return await SqsClientInstance.sqsClient.send(
                new SendMessageBatchCommand(params)
            );
        }
        catch(e) {
            Logger.error(e);
            return null;
        }
    }

    receive = async (
        params: ReceiveMessageCommandInput
    ) => {
        try {
            return await SqsClientInstance.sqsClient.send(
                new ReceiveMessageCommand(params)
            );
        }
        catch(e) {
            Logger.error(e);
            return null;
        }
    }

    changeMessageVisibility = async (
        params: ChangeMessageVisibilityCommandInput
    ) => {
        try {
            return await SqsClientInstance.sqsClient.send(
                new ChangeMessageVisibilityCommand(params)
            );
        }
        catch(e) {
            Logger.error(e);
            return null;
        }
    }

    changeMessageVisibilityBatch = async (
        params: ChangeMessageVisibilityBatchCommandInput
    ) => {
        try {
            return await SqsClientInstance.sqsClient.send(
                new ChangeMessageVisibilityBatchCommand(params)
            );
        }
        catch(e) {
            Logger.error(e);
            return null;
        }
    }

    delete = async (
        params: DeleteMessageCommandInput
    ) => {
        try {
            return await SqsClientInstance.sqsClient.send(
                new DeleteMessageCommand(params)
            );
        }
        catch(e) {
            Logger.error(e);
            return null;
        }
    }

    deleteBatch = async (
        params: DeleteMessageBatchCommandInput
    ) => {
        try {
            return await SqsClientInstance.sqsClient.send(
                new DeleteMessageBatchCommand(params)
            );
        }
        catch(e) {
            Logger.error(e);
            return null;
        }
    }
}

export const SqsMessageOpsInstance = SqsMessageOps.getInstance();