import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserCommonNameComponent } from './components/user-common-name/user-common-name.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CertificateService } from './services/certificate.service';
import { CertificateUploadComponent } from './components/certificate-upload/certificate-upload.component';
import { DropZoneDirective } from './directive/drop-zone-directive';
import { LocalStorageService } from './services/local-storage.service';
import { CertificateFileService } from './services/certificate-file.service';

@NgModule({
  declarations: [
    AppComponent,
    UserCommonNameComponent,
    UserInfoComponent,
    CertificateUploadComponent,
    DropZoneDirective
  ],
  imports: [BrowserModule, BrowserAnimationsModule],
  providers: [CertificateService, LocalStorageService, CertificateFileService],
  bootstrap: [AppComponent]
})
export class AppModule {}
