import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {iconOptions} from "../models/icon-options";


@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor(private httpClient: HttpClient) { }

  /**
   * @param {string} icon - Name of icon file in assets/icon folder
   * @param {iconOptions} [options] - icon options
   * @return {SVGSVGElement} SVGElement - SVG HTML Element
   */
  getIcon(icon: string, options?: iconOptions): Observable<SVGSVGElement> {
    return this.httpClient.get(`/assets/icons/${icon}.svg`, { responseType: 'text' }).pipe(
      map(svgFileContent => {
        const document = <XMLDocument>(new DOMParser().parseFromString(svgFileContent, 'image/svg+xml'));
        const svgElement = <SVGSVGElement>document.querySelector('svg');
        if (options) {
          svgElement.setAttribute('width', (svgElement.width.baseVal.value > 0 ? svgElement.width.baseVal.value * options.scale : 100 * options.scale).toString());
          svgElement.setAttribute('height', (svgElement.height.baseVal.value > 0 ? svgElement.height.baseVal.value * options.scale : 100 * options.scale).toString());
          svgElement.setAttribute('fill', options.fill)
          svgElement.setAttribute('stroke', options.stroke)
          svgElement.setAttribute('stroke-width', options.strokeWidth)
        }

        return svgElement;
      }),
    );
  }

  /**
   * @param {string} icon - Name of icon file in assets/icon folder
   * @param {string} colorInHex - Icon color in HEX value
   * @return {string} B64 string with SVG icon
   */
  getIconInB64WithColor(icon: string, colorInHex?: string): Observable<string> {
    return this.httpClient.get(`/assets/icons/${icon}.svg`, {responseType: 'text'}).pipe(
      map(svgFileContent => {
        const document = <XMLDocument>(new DOMParser().parseFromString(svgFileContent, 'image/svg+xml'));
        const svgElement = <SVGSVGElement>document.querySelector('svg');
        if (colorInHex) {
          svgElement.setAttribute('fill', colorInHex);
          svgElement.querySelectorAll('path').forEach(el => el.setAttribute('fill', colorInHex))
        }
        return `data:image/svg+xml;base64,${window.btoa(new XMLSerializer().serializeToString(svgElement))}`;
      })
    )
  }
}
