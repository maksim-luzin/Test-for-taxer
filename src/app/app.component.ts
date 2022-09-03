import { Component, OnInit } from '@angular/core';
import { Certificate } from 'src/app/models';
import { CertificateService } from './services/certificate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  certificateList!: Certificate[];
  isAddCertificate!: boolean;

  constructor(private certificateService: CertificateService) {}

  ngOnInit() {
    this.certificateList =
      this.certificateService.getCertificateList() as Certificate[];
  }

  ngAfterContentChecked() {
    this.isAddCertificate = this.certificateService.isAddCertificate;
  }

  toggleIsAddCertificate() {
    this.certificateService.toggleIsAddCertificate();
  }

  getError() {
    return this.certificateService.getError();
  }
}
