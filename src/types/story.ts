/**
 * La palabra del juego viaja en el sitio estático. No es un secreto protegido.
 * Las fotos viven en public/futuro y se pueden sustituir por otras con el mismo nombre.
 */
export type Exhibit = {
  id: string;
  title: string;
  caption: string;
  image: string;
};

export type StoryContent = {
  answer: string;
  tries: number;
  invitation: {
    kicker: string;
    title: string;
    subtitle: string;
    cta: string;
  };
  wordle: {
    heading: string;
    hint: string;
    short: string;
    attempt: string;
    won: string;
    dedication: string;
    lost: string;
    future: string;
    enter: string;
    delete: string;
  };
  gallery: {
    kicker: string;
    title: string;
    intro: string;
    back: string;
    close: string;
    previous: string;
    next: string;
    room: string;
    wander: string;
    solo: string;
    plaque: string;
  };
  letter: {
    kicker: string;
    title: string;
    open: string;
    hint: string;
    back: string;
    closing: string;
    signature: string;
    pages: string[];
  };
  exhibits: Exhibit[];
};
