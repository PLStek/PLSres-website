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
    ['actionner-filled', new ButtonStyle('btn-style-filled', 'Actionner')],
    ['actionner-not-field', new ButtonStyle('btn-style-not-filled', 'Actionner')],
    ['profil-filled', new ButtonStyle('btn-style-filled', 'User')],
    ['profil-not-filled', new ButtonStyle('btn-style-not-filled', 'User')],
  ]);

  constructor() {
  }

  ngOnInit(): void {
  }

}
