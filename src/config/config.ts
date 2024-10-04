import dotenv from 'dotenv';

dotenv.config();

const config = {
  aws: {
    region: process.env.AWS_REGION || 'us-east-1',
  },
  dynamodb: {
    tableName: process.env.DYNAMODB_TABLE || 'medico-cita-sistema-dev',
  },
  sns: {
    topicPE: process.env.SNS_TOPIC_PE || 'medico-cita-sistema-pe-dev',
    topicCL: process.env.SNS_TOPIC_CL || 'medico-cita-sistema-cl-dev',
  },
  sqs: {
    queuePE: process.env.SQS_QUEUE_PE || 'medico-cita-sistema-pe-dev',
    queueCL: process.env.SQS_QUEUE_CL || 'medico-cita-sistema-cl-dev',
  },
  eventBridge: {
    eventBusName: process.env.EVENT_BUS_NAME || 'medico-cita-sistema-dev',
  },
  rds: {
    hostPE: process.env.RDS_HOST_PE || 'pe-database-endpoint.rds.amazonaws.com',
    hostCL: process.env.RDS_HOST_CL || 'cl-database-endpoint.rds.amazonaws.com',
    port: parseInt(process.env.RDS_PORT || '3306', 10),
    username: process.env.RDS_USERNAME || 'admin',
    password: process.env.RDS_PASSWORD || 'your_secure_password_here',
    databasePE: process.env.RDS_DATABASE_PE || 'cita_db_pe',
    databaseCL: process.env.RDS_DATABASE_CL || 'cita_db_cl',
    resourceArn: process.env.RDS_RESOURCE_ARN || '',
    secretArn: process.env.RDS_SECRET_ARN || '',
  },
  api: {
    gatewayEndpoint:
      process.env.API_GATEWAY_ENDPOINT ||
      'https://api-gateway-id.execute-api.us-east-1.amazonaws.com/dev',
  },
  lambda: {
    appointment:
      process.env.LAMBDA_APPOINTMENT || 'medico-cita-sistema-dev-appointment',
    appointmentPE:
      process.env.LAMBDA_APPOINTMENT_PE ||
      'medico-cita-sistema-dev-appointment-pe',
    appointmentCL:
      process.env.LAMBDA_APPOINTMENT_CL ||
      'medico-cita-sistema-dev-appointment-cl',
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
  app: {
    maxRetries: parseInt(process.env.MAX_RETRIES || '3', 10),
    appointmentExpiryHours: parseInt(
      process.env.APPOINTMENT_EXPIRY_HOURS || '24',
      10
    ),
  },
};

export default config;
