import { Observable } from 'rxjs';
import { ExercisePostParameters } from '../models/exercise-post-parameters.model';

export function base64Decode(str: string): string {
  const base64Decoded = atob(str);
  const uint8Array = new Uint8Array(
    Uint8Array.from(base64Decoded, (c) => c.charCodeAt(0))
  );
  return new TextDecoder('utf-8').decode(uint8Array);
}

export function convertFileToBase64(
  data: ExercisePostParameters
): Observable<string> {
  return new Observable<string>((observer) => {
    const reader = new FileReader();
    reader.readAsDataURL(data.content);
    reader.onloadend = () => {
      const base64data = reader.result?.toString().split(',')[1];
      observer.next(base64data);
      observer.complete();
    };
  });
}
