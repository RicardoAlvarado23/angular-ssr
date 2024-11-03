import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'about-page',
  standalone: true,
  imports: [],
  templateUrl: './about-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPageComponent implements OnInit {

    constructor(private title: Title, private meta: Meta) {}

    ngOnInit(): void {
      this.title.setTitle('About Page');
      this.meta.updateTag({
        name: 'description', 'content': 'This is mi about page'
      });
      this.meta.updateTag({
        name: 'og:title', 'content': 'About page'
      });
      this.meta.updateTag({
        name: 'keywords', 'content': 'Hola, Angular, Page, About'
      });
    }


 }
