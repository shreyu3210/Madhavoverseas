import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private meta: Meta,
    private title: Title
  ) {}

  updateTitle(title: string) {
    this.title.setTitle(`${title} | Madhav Overseas`);
  }

  updateMetaTags(config: {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
  }) {
    if (config.title) {
      this.meta.updateTag({ name: 'title', content: config.title });
      this.meta.updateTag({ property: 'og:title', content: config.title });
      this.meta.updateTag({ name: 'twitter:title', content: config.title });
    }

    if (config.description) {
      this.meta.updateTag({ name: 'description', content: config.description });
      this.meta.updateTag({ property: 'og:description', content: config.description });
      this.meta.updateTag({ name: 'twitter:description', content: config.description });
    }

    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    if (config.image) {
      this.meta.updateTag({ property: 'og:image', content: config.image });
      this.meta.updateTag({ name: 'twitter:image', content: config.image });
    }
  }
} 