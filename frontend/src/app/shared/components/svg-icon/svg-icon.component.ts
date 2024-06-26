import {Component, ElementRef, HostListener, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {IconService} from "../../services/icon.service";
import {Subject, Subscription} from "rxjs";
import {iconOptions} from "../../models/icon-options";

/**
 * Component to generate SVG element inside HTML. As @param {string} icon argument provide name of SVG file inside assets/icons folder.
 * @example <app-svg-icon icon="delete_icon" iconClass="mt-4 px-2" scale=2 fill="#3df4ac" stroke="#a4cdf2" strokeWidth="3px" [triggerable]="true">
 */
@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss']
})
export class SvgIconComponent implements OnInit, OnDestroy {
  @ViewChild('svgContainer', { static: true }) svgContainer: ElementRef;

  @Input() icon = '';
  @Input() iconClass = '';
  @Input() scale = 1;
  @Input() fill = 'transparent';
  @Input() stroke = '#000000';
  @Input() strokeWidth = '1px';
  @Input() triggerable = false;

  @Output() trigger = new Subject<void>();

  private readonly subscriptions = new Subscription();

  @HostListener('click')
  @HostListener('keydown.enter')
  emitTriggerEvent(): void {
    if (this.triggerable) {
      this.trigger.next();
    }
  }

  constructor(private iconService: IconService) { }

  ngOnInit(): void {
    this.triggerable ? this.iconClass += ' cursor-pointer' : '';
    const options: iconOptions = {
      fill: this.fill,
      scale: this.scale,
      strokeWidth: this.strokeWidth,
      stroke: this.stroke
    }

    this.subscriptions.add(this.iconService.getIcon(this.icon, options).subscribe(svgElement => {
      (<HTMLElement>this.svgContainer.nativeElement).appendChild(svgElement);
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
