import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInstagram, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: any = null;
  isEditing = false; // Controla si estamos en modo edición
  updatedUser: any = { rrss: {} }; // Inicializa rrss como un objeto vacío

  icons = {
    instagram: faInstagram,
    youtube: faYoutube,
    tiktok: faTiktok,
    edit: faEdit
  };

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (data) => {
        this.user = data;
        this.updatedUser = { ...data, rrss: { ...data.rrss } }; // Asegúrate de inicializar rrss
      },
      error: (err) => console.error('Error fetching user data:', err)
    });
  }

  toggleEdit(): void {
    if (!this.isEditing) {
      // Inicializa los valores del formulario con los datos actuales del usuario
      this.updatedUser = { ...this.user, rrss: { ...this.user.rrss } };
    }
    this.isEditing = !this.isEditing;
  }

  saveChanges(): void {
    if (!this.user || !this.user.id) return;

    // Asegúrate de enviar el objeto en el formato correcto
    const payload = {
      ...this.updatedUser,
      rrss: { ...this.updatedUser.rrss } // Asegura que rrss sea un objeto
    };

    this.userService.updateUser(this.user.id, payload).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser; // Actualiza los datos del usuario
        this.isEditing = false; // Salir del modo edición
      },
      error: (err) => {
        console.error('Error updating user:', err);
      },
    });
  }

  getIconForRrss(platform: unknown, value: unknown): any {
    if (typeof platform !== 'string' || typeof value !== 'string' || !value) {
      return null;
    }
    return this.icons[platform] || null;
  }
}