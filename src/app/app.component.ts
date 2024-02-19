import { Component, OnInit } from '@angular/core';
import { ExerciseService } from 'src/app/shared/services/exercise.service';
import { SocialNetworksComponent } from './shared/components/social-networks/social-networks.component';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NavBarComponent, RouterOutlet, SocialNetworksComponent],
})
export class AppComponent {
  title = 'PLSres';

  constructor(private exerciseService: ExerciseService) {}
}
