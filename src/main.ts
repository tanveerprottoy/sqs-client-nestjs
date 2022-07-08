import { CreateQueueCommandInput, GetQueueUrlCommandInput, DeleteQueueCommandInput, ReceiveMessageCommandInput } from "@aws-sdk/client-sqs";
import { VersioningType } from "@nestjs/common";
import { NestFactory } from '@nestjs/core';
import { receiveMessageOnPort } from "worker_threads";
import { AppModule } from './app.module';
import { Constants } from "./constants";
import { SqsQueueOpsInstance, SqsClientInstance, SqsMessageOpsInstance } from "./libs/sqs";

async function createQueues() {
    const paramsArray: CreateQueueCommandInput[] = [
        {
            QueueName: Constants.GENERIC_QUEUE_NAME, //SQS_QUEUE_NAME
            Attributes: {
                DelaySeconds: Constants.QUEUE_DELAY.toString(), // Number of seconds delay.
                MessageRetentionPeriod: Constants.QUEUE_MESSAGE_RETENTION_PERIOD.toString(), // The amount of time that Amazon SQS retains messages that remain in the queue.
                FifoQueue: "true",
            },
        },
    ];
    for(const params of paramsArray) {
        const res = await SqsQueueOpsInstance.create(
            params
        );
        console.log(
            res
        );
    }
}

async function getQueueUrls() {
    const paramsArray: GetQueueUrlCommandInput[] = [
        {
            QueueName: Constants.GENERIC_QUEUE_NAME
        }
    ];
    for(const params of paramsArray) {
        const res = await SqsQueueOpsInstance.getUrl(
            params
        );
        console.log(
            res
        );
    }
}

async function listQueues() {
    console.log(await SqsQueueOpsInstance.list());
}

async function deleteQueues() {
    const paramsArray: DeleteQueueCommandInput[] = [
        {
            QueueUrl: Constants.GENERIC_QUEUE_URL
        },
    ];
    for(const params of paramsArray) {
        console.log(
            await SqsQueueOpsInstance.delete(
                params
            )
        );
    }
}

async function bootstrap() {
    SqsClientInstance.init();
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix(Constants.API);
    app.enableVersioning({
        type: VersioningType.URI,
    });
    app.enableShutdownHooks();
    await createQueues();
    await listQueues();
    // await getQueueUrls();
    // await deleteQueues();
    await app.listen(3000);
    receiveMessage();
}

async function receiveMessage() {
    const params: ReceiveMessageCommandInput = {
        QueueUrl: Constants.GENERIC_QUEUE_URL,
        MaxNumberOfMessages: 10,
        WaitTimeSeconds: Constants.WAIT_TIME_SECONDS,
        VisibilityTimeout: Constants.VISIBILITY_TIMEOUT
    };
    const response = await SqsMessageOpsInstance.receive(
        params
    );
    console.log("receiveMessage: ", response);
    setTimeout(
        receiveMessage,
        5000
    );
}

bootstrap();
