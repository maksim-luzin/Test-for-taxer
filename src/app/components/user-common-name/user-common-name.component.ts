import { CertificateService } from './../../services/certificate.service';
import { Component, Input } from '@angular/core';
import { Certificate } from '../../models';

@Component({
  selector: 'app-user-common-name',
  templateUrl: './user-common-name.component.html',
  styleUrls: ['./user-common-name.component.scss']
})
export class UserCommonNameComponent {
  @Input() certificate!: Certificate;

  constructor(private certificateService: CertificateService) {}

  getCommonName() {
    const commonName = this.certificate.subject.commonName.trim();
    return commonName.length < 37
      ? commonName
      : `${commonName.slice(0, 30)}...`;
  }

  isSelectedCertificate(certificate: Certificate) {
    return this.certificateService.isSelectedCertificate(certificate);
  }

  selectedCertificate(certificate: Certificate) {
    return this.certificateService.setSelectedCertificate(certificate);
  }
}
