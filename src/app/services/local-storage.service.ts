import { Injectable } from '@angular/core';
import { CertificateFileService } from './certificate-file.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor(private certificateFileService: CertificateFileService) {}
  getAllCertificate() {
    let keys = Object.keys(localStorage);
    return keys.map((key) => localStorage.getItem(key)).filter((data) => data);
  }

  certificateSave(certificateName: string, certificateAsString: string) {
    localStorage.setItem(certificateName, certificateAsString);
  }
}
