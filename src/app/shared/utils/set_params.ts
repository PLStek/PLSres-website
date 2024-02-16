import { HttpParams } from '@angular/common/http';

export function setParam(
  params: HttpParams,
  name: string,
  value: any
): HttpParams {
  if (value) {
    if (value instanceof Date) {
      params = params.set(name, Math.floor(value.getTime() / 1000));
    } else {
      params = params.set(name, value.toString());
    }
  }
  return params;
}
