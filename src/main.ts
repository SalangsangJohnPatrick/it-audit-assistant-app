import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { apiBaseInterceptor } from './app/core/interceptors/api-base.interceptor';
import { errorInterceptor } from './app/core/interceptors/error.interceptor';
import { loadingInterceptor } from './app/core/interceptors/loading.interceptor';
import { registerIcons } from './app/shared/icons/fontawesome';

registerIcons();

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([
      apiBaseInterceptor,
      loadingInterceptor,
      errorInterceptor
    ])),
    ...appConfig.providers
  ]
}).catch(console.error);

