import { CertificateService } from './../../services/certificate.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {
  isSelectedCertificate!: boolean;

  constructor(private certificateService: CertificateService) {}

  getSelectedCertificate() {
    const selectedCertificate =
      this.certificateService.getSelectedCertificate();
    if (!selectedCertificate) {
      return {
        commonName: '',
        issuerCN: '',
        validFrom: '',
        validTill: ''
      };
    }
    return {
      commonName: selectedCertificate.subject.commonName.trim(),
      issuerCN: selectedCertificate.issuer.serialNumber.trim(),
      validFrom: selectedCertificate.validity.validFrom.trim(),
      validTill: selectedCertificate.validity.validTill.trim()
    };
  }

  ngAfterContentChecked() {
    this.isSelectedCertificate = Boolean(
      this.certificateService.getSelectedCertificate()
    );
  }
}
