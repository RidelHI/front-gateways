import { Device } from './device';

export class Gateway {
  _id: string;
  serialNumber: string;
  name: string;
  ipv4Address: string;
  devices: Device[];
}
