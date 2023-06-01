export class CotizadorRequestDto {
  originCountyCode: string;
  destinationCountyCode: string;
  package: PackageDto;
  productType: number;
  contentType: number;
  declaredWorth: string;
  deliveryTime: number;
}

export class PackageDto {
  weight: string;
  height: string;
  width: string;
  length: string;
}
