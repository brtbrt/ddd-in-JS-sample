// @flow
import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection';

const container: ContainerBuilder = new ContainerBuilder();
const loader = new YamlFileLoader(container);
const env = process.env.NODE_ENV || 'development';

loader.load(`${__dirname}/../config/services/application_${env}.yaml`);


export default container;
