import { Injectable } from '@angular/core';

const parseTemplate = {
  commonName: /6 3 85 4 3 12 .+? 49 \w\w 48/gi,
  serialNumber: /6 3 85 4 5 12 .+? 49 \w\w 48/gi,
  UTCTime: /23 13( \w\w?){13}/gi
};

@Injectable({
  providedIn: 'root'
})
export class CertificateFileService {
  getData(certificateData: string = '') {
    const textDecoder = new TextDecoder();

    const getDataFromCertificate = (template: RegExp) => {
      const srcData = certificateData.match(template);

      if (!Array.isArray(srcData)) throw 'error';

      return srcData.map((data) =>
        textDecoder.decode(
          new Uint8Array(
            data.split(' ').slice(7, -3) as unknown as ArrayBufferLike
          )
        )
      );
    };

    const getDateFromCertificate = (template: RegExp) => {
      const srcData = certificateData.match(template);

      if (!Array.isArray(srcData)) throw 'error';

      return srcData.map((data) => {
        const dateString = `20${textDecoder.decode(
          new Uint8Array(data.split(' ').slice(2) as unknown as ArrayBufferLike)
        )}`;

        return `${dateString.slice(0, 4)}-${dateString.slice(
          4,
          6
        )}-${dateString.slice(6, 8)}`;
      });
    };

    const commonNames = getDataFromCertificate(parseTemplate.commonName);
    const serialNumbers = getDataFromCertificate(parseTemplate.serialNumber);
    const dates = getDateFromCertificate(parseTemplate.UTCTime);

    return {
      serialNumber: serialNumbers[0],
      subject: {
        commonName: commonNames[1]
      },
      issuer: {
        serialNumber: serialNumbers[1],
        commonName: commonNames[0]
      },
      validity: {
        validFrom: dates[0],
        validTill: dates[1]
      }
    };
  }
}
