import { animate, style, transition } from "@angular/animations";

export const fadeInOutAnimation = () => [transition(':enter', [ // :enter is alias for void => *
    style({ opacity: 0 }),
    animate('500ms', style({ opacity: 1 })),
  ]),
  // transition(':leave', [ // :leave is alias for * => void
  //   style({ left: 0 }),
  //   animate('500ms', style({ left: '-100%' })),
  // ])
]
