import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { authInterceptor } from './app/interceptors/auth.interceptor';
import { routes } from './app/app.routes'; // Asegúrate de tener un archivo de rutas

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])), // Registra el interceptor
    provideRouter(routes), // Proporciona las rutas
  ]
}).catch(err => console.error(err));