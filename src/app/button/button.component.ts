import { Component, Input, OnInit } from '@angular/core';
import { ButtonStyle } from 'src/models/ButtonStyle';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() buttonName !: string;

  buttonStyleMap = new Map<string, ButtonStyle>([
    ['actionner-filled', new ButtonStyle('btn-style btn-filled', 'Actionner')],
    ['actionner-not-field', new ButtonStyle('btn-style btn-not-filled', 'Actionner')],
    ['profil-filled', new ButtonStyle('btn-style btn-filled', 'User')],
    ['profil-not-filled', new ButtonStyle('btn-style btn-not-filled', 'User')],

    ['plus-filled', new ButtonStyle('btn-style btn-filled', 'En savoir plus')],
    ['plus-not-filled', new ButtonStyle('btn-style btn-not-filled', 'En savoir plus')],

    ['planning-filled', new ButtonStyle('btn-style btn-filled', 'Planning complet')],
    ['planning-not-filled', new ButtonStyle('btn-style btn-not-filled', 'Planning complet')],

    ['all-filled', new ButtonStyle('btn-style btn-filled', 'Toutes les annonces')],
    ['all-not-filled', new ButtonStyle('btn-style btn-not-filled', 'Toutes les annonces')],

    ['ressource', new ButtonStyle('btn-style ressource-style', 'Ressources')],
    ['participate', new ButtonStyle('btn-style participate-style', 'Participer')],
    ['edit', new ButtonStyle('btn-style edit-style', 'Editer')],
  ]);

  constructor() {
  }

  ngOnInit(): void {
  }

}
