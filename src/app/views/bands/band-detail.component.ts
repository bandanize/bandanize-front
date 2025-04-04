import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BandService } from '../../services/band.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInstagram, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-band-detail',
  standalone: true,
  templateUrl: './band-detail.component.html',
  styleUrls: ['./band-detail.component.css'],
  imports: [CommonModule, FontAwesomeModule, FormsModule],
})
export class BandDetailComponent implements OnInit {
  band: any;
  isEditing = false; // Controla si estamos en modo edición
  updatedBand: any = { rrss: {} }; // Inicializa rrss como un objeto vacío

  icons = {
    instagram: faInstagram,
    youtube: faYoutube,
    tiktok: faTiktok,
    edit: faEdit,
  };

  constructor(private route: ActivatedRoute, private bandService: BandService) {}

  ngOnInit(): void {
    const bandId = this.route.snapshot.paramMap.get('id');
    if (bandId) {
      this.bandService.getBandById(+bandId).subscribe({
        next: (data) => {
          this.band = data;
          this.updatedBand = { ...data, rrss: { ...data.rrss } }; // Asegúrate de inicializar rrss
        },
        error: (err) => {
          console.error('Error fetching band details:', err);
        },
      });
    }
  }

  toggleEdit(): void {
    if (!this.isEditing) {
      // Inicializa los valores del formulario con los datos actuales de la banda
      this.updatedBand = { ...this.band, rrss: { ...this.band.rrss } };
    }
    this.isEditing = !this.isEditing;
  }

  saveChanges(): void {
    if (!this.band || !this.band.id) return;

    const payload = {
      ...this.updatedBand,
      rrss: { ...this.updatedBand.rrss }, // Asegura que rrss sea un objeto
    };

    this.bandService.updateBand(this.band.id, payload).subscribe({
      next: (updatedBand) => {
        this.band = updatedBand; // Actualiza los datos de la banda
        this.isEditing = false; // Salir del modo edición
      },
      error: (err) => {
        console.error('Error updating band:', err);
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