import { Certificate } from '../models/certificate';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { CertificateFileService } from './certificate-file.service';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  certificateList: Certificate[];
  selectedCertificate?: Certificate;
  isAddCertificate: boolean;
  private error: string;

  constructor(
    private localStorageService: LocalStorageService,
    private certificateFileService: CertificateFileService
  ) {
    this.certificateList = [];
    this.isAddCertificate = false;
    this.error = '';
  }

  setSelectedCertificate(selectedCertificate?: Certificate) {
    if (this.isAddCertificate) return;
    this.selectedCertificate = selectedCertificate;
    this.error = '';
  }

  getSelectedCertificate() {
    return this.selectedCertificate;
  }

  getCertificateList() {
    try {
      const certificateFileList =
        this.localStorageService.getAllCertificate() as string[];

      const certificateList = certificateFileList.map((certificateFile) =>
        this.certificateFileService.getData(certificateFile)
      );

      this.sortCertificateList(certificateList);

      this.selectedCertificate = this.certificateList[0];
      return this.certificateList;
    } catch {
      this.error = 'Помилка при завантаженні сторінки';
      return this.certificateList;
    }
  }

  isSelectedCertificate(certificate: Certificate) {
    return (
      certificate.serialNumber === this.selectedCertificate?.serialNumber &&
      certificate.issuer.serialNumber ===
        this.selectedCertificate.issuer.serialNumber
    );
  }

  toggleIsAddCertificate() {
    this.isAddCertificate = !this.isAddCertificate;
    if (this.isAddCertificate) this.selectedCertificate = undefined;
    this.error = '';
  }

  sortCertificateList(certificateList: Certificate[]) {
    this.certificateList = certificateList.sort((str1, str2) =>
      str1.subject.commonName.localeCompare(str2.subject.commonName, [
        'en',
        'uk',
        'ru'
      ])
    );
  }

  async certificateUpload(certificate: File) {
    try {
      const certificateName = certificate.name;
      const reader = new FileReader();
      reader.readAsArrayBuffer(certificate);

      reader.onload = () => {
        try {
          const buffer = reader.result as ArrayBuffer;
          const certificateAsString = new Uint8Array(buffer).join(' ');
          const certificate =
            this.certificateFileService.getData(certificateAsString);
          this.addCertificate(certificate);
          this.setSelectedCertificate(certificate);
          this.localStorageService.certificateSave(
            certificateName,
            certificateAsString
          );
        } catch {
          this.error = 'Помилка при завантаженні сертифікату';
        }
      };

      reader.onerror = () => {
        this.error = 'Помилка при завантаженні сертифікату';
      };
    } catch {
      this.error = 'Помилка при завантаженні сертифікату';
    }
  }

  addCertificate(certificate: Certificate) {
    if (
      this.certificateList.some(
        (cert) =>
          //certificate Identity Condition
          cert.serialNumber === certificate.serialNumber &&
          cert.issuer.serialNumber === certificate.issuer.serialNumber
      )
    ) {
      return;
    }
    this.certificateList.push(certificate);
    this.sortCertificateList(this.certificateList);
  }

  getError() {
    return this.error;
  }
}
