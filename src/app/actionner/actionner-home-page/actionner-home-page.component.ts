import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { Exercise } from 'src/app/shared/models/exercise.model';
import { CharbonService } from 'src/app/shared/services/charbon.service';

@Component({
  selector: 'app-actionner-home-page',
  templateUrl: './actionner-home-page.component.html',
  styleUrls: ['./actionner-home-page.component.scss'],
})
export class ActionnerHomePageComponent implements OnInit {
  newCharbon: Partial<Charbon> = {};

  constructor(
    private charbonService: CharbonService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  addCharbon(): void {
    console.log(this.newCharbon);
  }




  fileName = '';

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      const formData = new FormData();
      formData.append('thumbnail', file);

      const upload = this.http.post('http://localhost/PLSres/api/exercises', formData);
      upload.subscribe();
    }
  }
}
