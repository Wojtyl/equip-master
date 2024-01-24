import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {iconOptions} from "../models/icon-options";


@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor(private httpClient: HttpClient) { }

  getIcon(icon: string, options: iconOptions): Observable<SVGSVGElement> {
    return this.httpClient.get(`/assets/icons/${icon}.svg`, { responseType: 'text' }).pipe(
      map(svgFileContent => {
        const document = <XMLDocument>(new DOMParser().parseFromString(svgFileContent, 'image/svg+xml'));
        const svgElement = <SVGSVGElement>document.querySelector('svg');

        svgElement.setAttribute('width', (svgElement.width.baseVal.value * options.scale).toString());
        svgElement.setAttribute('height', (svgElement.height.baseVal.value * options.scale).toString());
        svgElement.setAttribute('fill', options.fill)
        svgElement.setAttribute('stroke', options.stroke)
        svgElement.setAttribute('stroke-width', options.strokeWidth)

        return svgElement;
      }),
    );
  }
}
