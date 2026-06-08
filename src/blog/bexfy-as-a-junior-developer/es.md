---
title: Bexfy - Lo que mi primer trabajo me enseñó sobre software
date: 2023-11-05
tags: ["web-dev", "software-dev"]
description: Reflexiones sobre heredar y extender un sistema de señalización digital multiplataforma en web, móvil e interfaces táctiles como mi primer rol profesional.
thumb:
  base: https://images.pexels.com/photos/1827234/pexels-photo-1827234.jpeg
---

Bexfy fue mi primer trabajo como desarrollador.

Entré con una expectativa bastante típica para alguien que empieza. Pensaba que iba a trabajar con gente más senior, recibir tareas pequeñas al principio y aprender el producto poco a poco mientras iba ganando confianza. En su lugar, lo que encontré fue un entorno donde ya existían tres aplicaciones en producción y donde mi trabajo consistía directamente en mantenerlas y evolucionarlas.

Había un dashboard en Angular para administradores, un reproductor multimedia multiplataforma y una aplicación en React para pantallas táctiles. Cada una tenía usuarios reales, decisiones acumuladas durante años y un nivel de complejidad que no era evidente cuando mirabas el código por primera vez. Además, gran parte de esas decisiones no estaban documentadas y algunas habían sido tomadas por personas que ya no estaban en la empresa.

Con el tiempo entendí que esa era la parte más importante del trabajo. No tanto construir cosas nuevas, sino aprender a moverte dentro de sistemas que ya existen sin romperlos.

## Leer antes de tocar nada

Al principio tenía una urgencia bastante típica de alguien que empieza. Quería avanzar rápido, cerrar tareas, sentir que estaba aportando. Es fácil caer en la idea de que el progreso en software consiste en escribir código lo más rápido posible y entregar funcionalidades.

Pero trabajar sobre sistemas ya en producción te obliga a cambiar ese ritmo. Cada cambio tiene contexto detrás. A veces es una decisión técnica, otras veces una limitación del producto o simplemente una solución temporal que nunca se sustituyó. El problema es que ese contexto no siempre está escrito en ningún sitio.

Recuerdo que al principio tendía a modificar cosas demasiado rápido. Veía una pieza de código que no entendía del todo y asumía que estaba mal o que se podía simplificar. Con el tiempo aprendí que esa es una de las formas más fáciles de introducir errores en sistemas que no conoces bien.

Empecé a cambiar mi forma de trabajar. Antes de tocar nada intentaba encontrar partes del sistema que se comportaran de forma parecida. Seguía los flujos completos en lugar de mirar funciones aisladas. Y antes de refactorizar algo, intentaba entender qué problema original estaba resolviendo esa implementación, aunque fuera incómodo o lento.

No siempre era posible llegar a una respuesta clara, pero el simple hecho de invertir más tiempo en entender el sistema antes de cambiarlo redujo muchos errores que habría cometido al principio.

## El reproductor multimedia y la fiabilidad

El proyecto que más me marcó en esa etapa fue el reproductor multimedia.

En teoría era una aplicación bastante directa. Descargaba contenido, lo almacenaba localmente y lo reproducía en una pantalla. Nada especialmente complicado si lo miras desde una perspectiva puramente de software web.

Pero el contexto era completamente distinto. Estos dispositivos se instalaban en comercios, con conexiones a internet inestables, hardware poco controlado y entornos donde nadie del equipo técnico podía intervenir fácilmente. A veces se reiniciaban sin aviso. Otras veces perdían conexión durante horas. En algunos casos el almacenamiento se llenaba o las descargas se quedaban a medias sin que nadie lo notara inmediatamente.

Empecé a darme cuenta de que muchas de las cosas que damos por hechas en aplicaciones web normales no aplicaban aquí. Si algo fallaba en una web, el usuario podía refrescar la página o volver a intentar la acción. En este caso no había esa red de seguridad. Si el reproductor fallaba, la pantalla dejaba de mostrar contenido y el problema era visible de inmediato para cualquiera que pasara por delante.

A partir de ahí empecé a pensar menos en el camino feliz y más en los fallos. Qué pasa si una descarga se interrumpe. Qué pasa si el archivo queda corrupto. Qué ocurre si el dispositivo se queda sin espacio. Qué debería hacer la aplicación si no puede actualizar contenido durante horas.

El objetivo dejó de ser simplemente que el sistema funcionara cuando todo iba bien. Pasó a ser que el sistema siguiera comportándose de forma razonable incluso cuando algo inevitablemente fallaba.

## Lo que me quedó de aquella etapa

Cuando entré en Bexfy pensaba que lo más importante sería aprender tecnologías nuevas y escribir mejor código. Y en parte fue así. Trabajé con Angular, React, Cordova, servicios de AWS y pipelines de despliegue que no había visto antes, pero con el tiempo me di cuenta de que eso no era lo que más valor me aportó a largo plazo.

Lo más importante fue aprender a trabajar dentro de sistemas existentes. Aprender a leer código que no habías escrito tú sin intentar cambiarlo demasiado rápido. Aprender a reconocer que muchas decisiones tienen historia detrás, aunque no esté documentada. Y aprender que gran parte del trabajo de un desarrollador no consiste en construir sistemas nuevos, sino en mantener sistemas que ya existen sin introducir problemas adicionales.

Esas lecciones no fueron inmediatas ni cómodas, pero son las que más han influido en cómo trabajo hoy en día.
