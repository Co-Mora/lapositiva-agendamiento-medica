## Prerequisites

- Node.js (v18.x or later)
- npm (v10.x or later)
- AWS CLI configured with appropriate credentials
- Serverless Framework CLI

## Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Copy the example environment file and update it with your settings:
   ```
   cp .env.local .env
   ```
   Edit the .env file with your specific configuration.

## Configuration

1. Update the `serverless.yml` file with your specific AWS region and any other custom settings.

2. Ensure your AWS CLI is configured with the correct credentials and region:
   ```
   aws configure
   ```

## Deployment

Deploy the application to AWS:

```
serverless deploy
```

This will create all necessary AWS resources including Lambda functions, DynamoDB tables, SNS topics, SQS queues, and EventBridge.

## Usage

### Scheduling an Appointment

To schedule an appointment, send a POST request to the API Gateway endpoint:

```
POST /appointment

{
  "insuredId": "12345",
  "scheduleId": 100,
  "countryISO": "PE"
}
```

### Listing Appointments

To list appointments for an insured person, send a GET request:

```
GET /appointment?insuredId=12345
```

## Local Development

1. Install the `serverless-offline` plugin:
   ```
   npm install serverless-offline --save-dev
   ```

2. Add the plugin to your `serverless.yml`:
   ```yaml
   plugins:
     - serverless-offline
   ```

3. Run the application locally:
   ```
   serverless offline
   ```

## Monitoring and Logging

- Use AWS CloudWatch to monitor Lambda function executions and view logs.
- Set up CloudWatch Alarms for important metrics like function errors or high latency.