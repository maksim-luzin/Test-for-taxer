import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-certificate-upload',
  templateUrl: './certificate-upload.component.html',
  styleUrls: ['./certificate-upload.component.scss']
})
export class CertificateUploadComponent {
  isCertificateDrop: boolean;
  fileDragInfo: string;
  fileDropInfo: string;

  constructor() {
    this.isCertificateDrop = false;
    this.fileDragInfo = 'Перетягніть файл сертифіката у поле';
    this.fileDropInfo = 'Відпустіть сертифікат щоб його завантажити';
  }

  setIsCertificateDrop() {
    this.isCertificateDrop = true;
  }

  resetIsCertificateDrop() {
    this.isCertificateDrop = false;
  }
}
