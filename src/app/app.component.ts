import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  getPaginationFactor = (width: number) => {
    if (width >= 1260) return 5;
    if (width >= 900) return 4;
    if (width >= 700) return 3;
    if (width >= 510) return 2;
    else return 1;
  };

  items = [
    {
      src: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg',
    },
    {
      src: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg',
    },
    {
      src: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg',
    },
    {
      src: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg',
    },
    {
      src: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg',
    },
    {
      src: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg',
    },
    {
      src: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg',
    },
    {
      src: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg',
    },
    {
      src: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg',
    },
    {
      src: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg',
    },
    {
      src: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg',
    },
  ];
  numberOfSlides = this.items.length;
  totalPaginationPixels = window.innerWidth - 97;
  pages = Math.ceil(
    this.numberOfSlides / this.getPaginationFactor(this.totalPaginationPixels)
  );
  scrollBy = this.getPaginationFactor(this.totalPaginationPixels);
  arrPages = new Array(this.pages).fill(0).map((_, index) => index + 1);
  offset = 0;
  atStart = this.offset === 0;
  atEnd = this.offset === this.totalPaginationPixels * (this.pages - 1) * -1;
  currentPage = 1;

  sortedItems = this.arrPages.map((item, index) => {
    return this.items.slice(index * this.scrollBy, item * this.scrollBy);
  });

  ngOnInit(): void {
    window.addEventListener('resize', this.resizeUpdate);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeUpdate);
  }

  getTransformStyles = () => {
    return { transform: `translateX(${this.offset}px)` };
  };

  getSpanStyles = (page: number) => {
    return {
      backgroundColor: `${page === this.currentPage ? 'red' : '#525665'}`,
    };
  };

  resizeUpdate = () => {
    if (this.numberOfSlides === 0) {
      return;
    }
    this.totalPaginationPixels = window.innerWidth - 97;
    this.pages = Math.ceil(
      this.numberOfSlides / this.getPaginationFactor(this.totalPaginationPixels)
    );
    if (this.currentPage > this.pages) this.currentPage = this.pages;
    this.offset = this.totalPaginationPixels * (this.currentPage - 1) * -1;
    this.arrPages = new Array(this.pages).fill(0).map((_, index) => index + 1);
    this.atStart = this.offset === 0;
    this.atEnd =
      this.offset === this.totalPaginationPixels * (this.pages - 1) * -1;
    this.scrollBy = this.getPaginationFactor(this.totalPaginationPixels);
    this.sortedItems = this.arrPages.map((item, index) => {
      return this.items.slice(index * this.scrollBy, item * this.scrollBy);
    });
  };

  move = (direction: number) => {
    if (direction > 0 && !this.atEnd) {
      this.offset -= this.totalPaginationPixels;
    } else if (direction < 0 && !this.atStart) {
      this.offset += this.totalPaginationPixels;
    }
    this.atStart = this.offset === 0;
    this.atEnd =
      this.offset === this.totalPaginationPixels * (this.pages - 1) * -1;
    this.currentPage =
      -1 * Math.round(this.offset / this.totalPaginationPixels - 1);
  };
}
