'use client';

import { ChevronRight, MapPin, Star } from 'lucide-react';

export function MapsReviewButton({ brand, notify, header = false }: {
  brand: string;
  notify: (message: string) => void;
  header?: boolean;
}) {
  return <button
    type="button"
    className={'maps-review-button ' + (header ? 'is-header' : '')}
    onClick={() => notify(`Simulación: se abrirá Google Maps para calificar a ${brand}`)}
    aria-label={`Calificar a ${brand} en Google Maps`}
  >
    <span className="maps-review-pin" aria-hidden="true"><MapPin /><i><Star fill="currentColor" /></i></span>
    <span className="maps-review-copy"><b>Califica este negocio en Google Maps</b><small>Comparte tu experiencia con {brand}</small></span>
    <span className="maps-review-stars" aria-hidden="true">★★★★★</span>
    <ChevronRight className="maps-review-arrow" aria-hidden="true" />
  </button>;
}
