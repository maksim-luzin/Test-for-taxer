import { Directive, HostBinding, HostListener } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { CertificateService } from '../services/certificate.service';

@Directive({
  selector: '[appDropZone]'
})
export class DropZoneDirective {
  @HostBinding('class.upload')
  files: any[] = [];

  constructor(
    private localStorageService: LocalStorageService,
    private certificateService: CertificateService
  ) {}

  //DragoverListener
  @HostListener('dragover', ['$event']) onDragover(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  //Drop listener
  @HostListener('drop', ['$event']) async onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      await this.certificateService.certificateUpload(files[0]);
    }
    this.certificateService.toggleIsAddCertificate();
  }
}
