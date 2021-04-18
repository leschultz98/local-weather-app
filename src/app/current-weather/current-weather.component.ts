import { Component, OnInit } from '@angular/core';
import { ICurrentWeather } from '../interfaces';
import { WeatherService } from '../weather/weather.service';
import { ActivatedRoute } from '@angular/router';

interface IPlace {
  city: string;
  country: string;
}

type City = 'hochiminh' | 'hanoi' | 'quynhon';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent implements OnInit {
  current!: ICurrentWeather;
  locations = {
    hochiminh: {
      city: 'Thanh pho Ho Chi Minh',
      country: 'VN',
    },
    hanoi: {
      city: 'Ha Noi',
      country: 'VN',
    },
    quynhon: {
      city: 'Quy Nhon',
      country: 'VN',
    },
  };
  place!: IPlace;

  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.place = this.locations[params.location as City];
      this.weatherService
        .getCurrentWeather(this.place.city, this.place.country)
        .subscribe((data) => (this.current = data));
    });
  }
}
