import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './contact-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactPageComponent implements OnInit {

  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.title.setTitle('Contact Page');
    this.meta.updateTag({
      name: 'description', 'content': 'This is mi Contact page'
    });
    this.meta.updateTag({
      name: 'og:title', 'content': 'Contact page'
    });
    this.meta.updateTag({
      name: 'keywords', 'content': 'Hola, Angular, Page, Contact'
    });
  }
 }
