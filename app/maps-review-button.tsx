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
    onClick={() => notify(`Aquí se abrirá Google Maps para dejar tu reseña de ${brand}`)}
    aria-label={`Calificar a ${brand} en Google Maps`}
  >
    <span className="maps-review-pin" aria-hidden="true"><MapPin /><i><Star fill="currentColor" /></i></span>
    <span className="maps-review-copy">
      <small className="maps-review-kicker">TU OPINIÓN CUENTA</small>
      <b>Déjanos tu reseña en Google Maps</b>
      <small>Califica tu experiencia con {brand}</small>
    </span>
    <span className="maps-review-stars" aria-hidden="true"><b>5.0</b> ★★★★★</span>
    <ChevronRight className="maps-review-arrow" aria-hidden="true" />
  </button>;
}
