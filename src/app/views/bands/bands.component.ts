import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { BandService } from '../../services/band.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInstagram, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons'; // Importa faEdit desde el paquete correcto

@Component({
  selector: 'app-bands',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, FontAwesomeModule], // Agrega RouterModule aquí
  templateUrl: './bands.component.html',
  styleUrls: ['./bands.component.css']
})
export class BandsComponent implements OnInit {
  bands: any[] = [];

  icons = {
    instagram: faInstagram,
    youtube: faYoutube,
    tiktok: faTiktok,
    edit: faEdit
  };

  showForm = false; // Controla la visibilidad del formulario
  newBand = {
    name: '',
    description: '',
    genre: '',
    city: '',
    rrss: {
      instagram: '',
      youtube: '',
      tiktok: ''
    }
  }; // Datos de la nueva banda

  constructor(private bandService: BandService) {}

  ngOnInit(): void {
    this.loadBands();
  }

  loadBands(): void {
    this.bandService.getMyBands().subscribe({
      next: (data) => {
        this.bands = data;
      },
      error: (err) => {
        console.error('Error fetching bands:', err);
      }
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  createBand(): void {
    const userId = 1; // Reemplaza con el ID del usuario autenticado
    this.bandService.createBand(userId, this.newBand).subscribe({
      next: (data) => {
        this.bands.push(data); // Añade la nueva banda a la lista
        this.newBand = {
          name: '',
          description: '',
          genre: '',
          city: '',
          rrss: {
            instagram: '',
            youtube: '',
            tiktok: ''
          }
        }; // Resetea el formulario
        this.showForm = false; // Oculta el formulario
      },
      error: (err) => {
        console.error('Error creating band:', err);
      }
    });
  }

  getIconForRrss(platform: unknown, value: unknown): any {
    if (typeof platform !== 'string' || typeof value !== 'string' || !value) {
      return null;
    }
    return this.icons[platform] || null;
  }
}