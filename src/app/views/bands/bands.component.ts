import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BandService } from '../../services/band.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInstagram, faYoutube, faFacebook } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-bands',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './bands.component.html',
  styleUrls: ['./bands.component.css']
})
export class BandsComponent implements OnInit {
  bands: any[] = [];
  icons = {
    instagram: faInstagram,
    youtube: faYoutube,
    facebook: faFacebook
  };

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

  getIconForRrss(rrss: string): any {
    if (rrss.includes('instagram')) {
      return this.icons.instagram;
    } else if (rrss.includes('youtube')) {
      return this.icons.youtube;
    } else if (rrss.includes('facebook')) {
      return this.icons.facebook;
    }
    return null;
  }
}