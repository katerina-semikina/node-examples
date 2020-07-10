import { GenericContainer } from 'testcontainers';
import { BoundPorts } from 'testcontainers/dist/bound-ports';

export default class KafkaTestContainer extends GenericContainer {
  constructor(
    image: string,
    private kafkaPort: number,
    private kafkaName: string,
    private kafkaBrokerPort: number,
    zookeeperName: string,
    zookeeperPort: number
  ) {
    super(image);
    this.kafkaPort = kafkaPort;
    this.kafkaName = kafkaName;
    this.kafkaBrokerPort = kafkaBrokerPort;
    this.withName(kafkaName)
      .withEnv(
        'KAFKA_LISTENERS',
        `EXTERNAL_LISTENER://0.0.0.0:${kafkaPort},BROKER://0.0.0.0:${kafkaBrokerPort}`
      )
      .withEnv(
        'KAFKA_LISTENER_SECURITY_PROTOCOL_MAP',
        'BROKER:PLAINTEXT,EXTERNAL_LISTENER:PLAINTEXT,PLAINTEXT:PLAINTEXT'
      )
      .withEnv('KAFKA_ZOOKEEPER_CONNECT', `${zookeeperName}:${zookeeperPort}`)
      .withEnv('KAFKA_INTER_BROKER_LISTENER_NAME', 'BROKER')
      .withEnv('KAFKA_BROKER_ID', '1')
      .withEnv('KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR', '1')
      .withEnv('KAFKA_CONFLUENT_SUPPORT_METRICS_ENABLE', 'false')
      .withExposedPorts(kafkaPort);
  }

  protected isCreating(boundPorts: BoundPorts): void {
    this.withEnv(
      'KAFKA_ADVERTISED_LISTENERS',
      `EXTERNAL_LISTENER://${this.dockerClientFactory.getHost()}:${boundPorts.getBinding(this.kafkaPort)},BROKER://${this.kafkaName}:${this.kafkaBrokerPort}`
    );
  }
}
