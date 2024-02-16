import { Component, Input } from '@angular/core';

/**
 * Reusable component to display form section header and subtitle.
 *
 * @param {string} header - A header of a section.
 * @param {string} subtitle - Subtitle displayed below header.
 *
 * @example
 * <app-form-controls-header title="My custom title" subtitle="My subtitle" />
 */
@Component({
  selector: 'app-form-controls-header',
  templateUrl: './form-controls-header.component.html',
  styleUrl: './form-controls-header.component.scss'
})
export class FormControlsHeaderComponent {
  @Input() header = 'Title'
  @Input() subtitle = 'Subtitle'
}
