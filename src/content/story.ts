import type { StoryContent } from "../types/story.ts";

/**
 * La palabra es Pituka. Cámbiala aquí cuando quieras otra.
 * Las imágenes están en public/futuro. Sustituye el archivo y conserva el nombre.
 */
export const story = {
  answer: "Pituka",
  tries: 6,
  invitation: {
    kicker: "Un juego solo para ti",
    title: "He preparado algo para ti…",
    subtitle: "Seis letras, seis intentos. Si das con la palabra, hay una puerta que quiero abrirte.",
    cta: "Empezar el juego",
  },
  wordle: {
    heading: "La palabra",
    hint: "Verde: la letra está en su sitio. Dorado: está, pero en otra casilla.",
    short: "Faltan letras.",
    attempt: "Intento {current} de {total}",
    won: "La encontraste.",
    dedication: "Quédate con esa palabra.",
    lost: "Casi. La palabra era {word}. Aun así, la puerta sigue ahí.",
    future: "¿Lista para un vistazo de nuestro futuro?",
    enter: "Enviar",
    delete: "Borrar",
  },
  gallery: {
    kicker: "Lo que aún no pasa",
    title: "Nuestro futuro",
    intro: "Días que aún no han pasado. Ninguna es real. Todas podrían serlo.",
    back: "Volver a la palabra",
    close: "Cerrar",
    previous: "Anterior",
    next: "Siguiente",
    room: "Sala {index}",
    wander: "Arrastra la foto y suéltala lejos. Tócala para verla entera.",
    solo: "Verla a solas",
    plaque: "Volver a la placa",
  },
  letter: {
    kicker: "Un manuscrito",
    title: "Para Valentina",
    open: "Abrir el manuscrito",
    hint: "Desliza la hoja para seguir.",
    back: "Volver a las fotos",
    closing: "Con cariño,",
    signature: "Luke Price",
    pages: [
      "He estado pensando mucho en nuestro futuro, en todas las cosas que todavía nos quedan por vivir y en lo bonito que sería poder compartirlas contigo. Es extraño, porque antes pensaba en mi futuro como algo que tenía que construir por mi cuenta, centrándome en mi trabajo, en mis metas y en todo lo que quería conseguir. Pero ahora, cuando pienso en lo que viene, también te imagino a ti. Me imagino cómo sería tenerte conmigo, compartir mis días contigo y poder decir que, entre tantas cosas que me ha dado la vida, también tuve la suerte de encontrarte.",
      "¿Sabes qué es lo que más ilusión me hace? Pensar que algún día voy a despertar y lo primero que vea seas tú. Imaginar que voy a abrir los ojos, girarme hacia ti y encontrarte ahí, a mi lado, sin tener que despedirme de ti ni preguntarme cuándo volveré a verte. Poder darte un beso por la mañana, abrazarte un rato más antes de levantarnos y escuchar tu voz cuando todavía tengas sueño. Puede parecer una tontería, pero para mí sería algo enorme. No necesito que todos los días sean especiales, porque creo que lo bonito sería compartir contigo hasta los días más normales.",
      "También pienso en todas esas cosas pequeñas que podríamos vivir juntos. Salir a algún sitio sin tener un plan, quedarnos hablando hasta tarde, hacerte reír cuando tengas un mal día o simplemente sentarnos juntos sin necesidad de decir nada. Me gustaría conocer cada parte de ti, aprender tus gustos, tus manías y esas cosas que quizá nadie más nota. Quiero saber qué te hace feliz, qué te preocupa y qué necesitas cuando las cosas no van bien. Y también quiero que tú puedas conocerme de verdad, que veas mis días buenos y los malos, que conozcas mis miedos y que sepas que, aunque no siempre encuentre las palabras correctas, mis ganas de hacer las cosas bien contigo son sinceras.",
      "No voy a decirte que nuestro futuro será perfecto, porque sé que la vida no funciona así. Habrá días difíciles, podremos tener diferencias y seguramente habrá momentos en los que las cosas no salgan como las habíamos pensado. Pero me gusta imaginar que, cuando eso pase, vamos a saber hablar, escucharnos y encontrar la manera de seguir adelante. No quiero prometerte una vida sin problemas, quiero poder darte motivos para sentirte querida, para confiar en mí y para saber que no tienes que enfrentarte a todo sola. Si algún día llegamos a construir algo bonito, quiero que sea porque los dos lo cuidamos y porque, incluso en los días complicados, seguimos teniendo ganas de estar juntos.",
      "Creo que por eso me gusta tanto la idea de escribir este manuscrito de nuestro futuro. Porque todavía no sé qué nos espera, pero me emociona pensar en todo lo que podríamos llegar a vivir. Me gustaría que algún día pudiéramos leer estas palabras juntos y reírnos al recordar que hubo un momento en el que yo ya imaginaba algunas de estas cosas sin saber cuándo iban a pasar. Que pudiéramos mirar atrás y reconocer todo lo que hemos vivido, las primeras veces, los momentos difíciles que superamos y todas esas pequeñas historias que terminaron siendo nuestras. No sé cuántas páginas tendrá este manuscrito ni cómo terminará cada capítulo, pero me encantaría que pudiéramos escribirlo juntos.",
      "Y si me preguntas qué es lo que más deseo de todo eso, mi respuesta es bastante sencilla. Quiero despertar contigo. Quiero abrir los ojos por la mañana y que seas la primera persona que vea, acercarme a ti, darte un beso y empezar el día sabiendo que estás ahí. Quiero llegar a casa y tener ganas de contarte cómo me ha ido, escuchar cómo ha sido tu día y encontrar en ti esa tranquilidad que no se consigue en cualquier lugar. Quiero tener planes contigo, recuerdos contigo y motivos para seguir imaginando todo lo que todavía nos falta por vivir.",
      "No sé qué nos tiene preparado la vida, Valentina, ni cuánto tardaremos en llegar a esos momentos que ahora imagino. Pero sí sé que me hace feliz pensar en ellos y que me gustaría tener la oportunidad de vivirlos contigo. No quiero correr ni adelantarme a lo que nos toca vivir ahora. Quiero disfrutar de conocerte, de cada conversación, de cada momento que compartamos y de todo lo que vaya naciendo entre nosotros. Porque, al final, un futuro bonito no empieza el día que conseguimos todo lo que soñábamos, sino mucho antes, cuando encontramos a alguien con quien nos hace ilusión intentarlo.",
      "Y ojalá, cuando llegue ese día que tanto imagino, pueda mirarte al despertar y recordar esta carta. Ojalá pueda abrazarte, sonreírte y decirte que todo aquello que alguna vez escribí pensando en ti terminó convirtiéndose en parte de mi vida.\n\nPorque, Valentina, de todas las cosas que quiero para mi futuro, hay una que tengo muy clara: quiero que algún día, al abrir los ojos, seas tú lo primero que vea. Y que, cuando me dé cuenta de que estás ahí, no tenga que volver a imaginar cómo sería, porque por fin lo estaré viviendo contigo.",
    ],
  },
  exhibits: [
    {
      id: "manana",
      title: "La mañana sin prisa",
      caption: "Dos tazas, la ventana abierta, y un día que no nos exige nada.",
      image: "/futuro/foto1.png",
    },
    {
      id: "camino",
      title: "La carretera",
      caption: "Un viaje sin hora de vuelta. El mar a un lado y tu mano cerca.",
      image: "/futuro/foto2.png",
    },
    {
      id: "casa",
      title: "La casa",
      caption: "Todavía no tiene dirección. Ya tiene una luz encendida para los dos.",
      image: "/futuro/foto3.png",
    },
    {
      id: "sofa",
      title: "La noche del sofá",
      caption: "Una manta de más, una película vieja, y ninguna razón para irnos.",
      image: "/futuro/foto4.png",
    },
  ],
} satisfies StoryContent;
