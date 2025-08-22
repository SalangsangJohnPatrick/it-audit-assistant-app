import { library, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faClipboard,
  faTrash,
  faTriangleExclamation,
  faWandMagicSparkles,
  faBroom
} from '@fortawesome/free-solid-svg-icons';

export function registerIcons() {
  const icons: IconDefinition[] = [
    faClipboard,
    faTrash,
    faTriangleExclamation,
    faWandMagicSparkles,
    faBroom
  ];

  library.add(...icons);
}