import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, InjectionToken, OnInit, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-pricing-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent implements OnInit {

  constructor(private title: Title, private meta: Meta,  @Inject(PLATFORM_ID) private _platformId: Object) {}

  ngOnInit(): void {
    this.title.setTitle('Pricing Page');
    /* if(isPlatformBrowser(this._platformId)) {
      document.title = 'Pricing Page';
    } */
    this.meta.updateTag({
      name: 'description', 'content': 'This is mi Pricing page'
    });
    this.meta.updateTag({
      name: 'og:title', 'content': 'Pricing page'
    });
    this.meta.updateTag({
      name: 'keywords', 'content': 'Hola, Angular, Page, Pricing'
    });
  }
}
