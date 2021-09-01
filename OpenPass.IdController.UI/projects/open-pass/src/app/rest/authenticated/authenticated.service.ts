import { Injectable } from '@angular/core';
import { environment } from '@env';
import { HttpClient } from '@angular/common/http';
import { OtpDto } from '../otp/otp.dto';
import { Observable } from 'rxjs';
import { TokenDto } from '../otp/token.dto';
<<<<<<< HEAD
import { EventTypes } from '@shared/enums/event-types.enum';
=======
import { EventTypes } from '@enums/event-types.enum';
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedService {
  private readonly namespace = environment.namespace;

  constructor(private http: HttpClient) {}

  generateOtp(otp: OtpDto): Observable<void> {
    return this.http.post<void>(this.namespace + '/authenticated/otp/generate', otp);
  }

  validateOtp(otp: OtpDto): Observable<TokenDto> {
    return this.http.post<TokenDto>(this.namespace + '/authenticated/otp/validate', otp);
  }

  getTokenByEmail(email: string, eventType: EventTypes): Observable<TokenDto> {
    return this.http.post<TokenDto>(this.namespace + '/authenticated/sso', { email, eventType });
  }
}
