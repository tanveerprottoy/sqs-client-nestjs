import { SendMessageCommandInput } from "@aws-sdk/client-sqs";
import { Injectable } from '@nestjs/common';
import { Constants } from "./constants";
import { v4 as uuidv4 } from "uuid";
import { SqsMessageOpsInstance } from "./libs/sqs";

@Injectable()
export class AppService {

    async produceMessage(
        message: string
    ) {
        await this.sendMessage(
            message
        );
        return {
            suceess: true
        };
    }

    private async sendMessage(
        message: string
    ) {
        const params: SendMessageCommandInput = {
            QueueUrl: Constants.GENERIC_QUEUE_URL,
            MessageBody: message,
            DelaySeconds: Constants.QUEUE_DELAY,
            MessageDeduplicationId: uuidv4(),
            MessageGroupId: Constants.QUEUE_GROUP_ID
        };
        console.log("SendMessageCommandInput", params);
        const result = await SqsMessageOpsInstance.send(
            params
        );
        console.log(result);
    }
}
