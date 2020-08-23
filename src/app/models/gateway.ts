import { Device } from './device';

export class Gateway {
  serialNumber: string;
  name: string;
  ipv4Address: string;
  devices: Device[];
}
