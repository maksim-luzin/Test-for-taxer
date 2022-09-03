import { Validity } from './validity';
import { Issuer } from './issuer';
import { User } from './subject';

export interface Certificate {
  serialNumber: string;
  subject: User;
  issuer: Issuer;
  validity: Validity;
}
