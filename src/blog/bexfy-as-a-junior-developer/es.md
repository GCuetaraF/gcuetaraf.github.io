---
title: Bexfy - Aprendiendo a construir soluciones multiplataforma como desarrollador junior
date: 2023-11-05
tags: ["web-dev", "software-dev"]
description: Reflexiones sobre heredar y extender un sistema de señalización digital multiplataforma en web, móvil e interfaces táctiles como mi primer rol profesional.
thumb:
  base: https://images.pexels.com/photos/1827234/pexels-photo-1827234.jpeg
---

Bexfy fue mi primer trabajo como desarrollador.

Como la mayoría de desarrolladores júnior, llegué esperando un equipo de séniors donde podría ser mentorizado y aprender a la vez que vas implementando pequeñas features. En su lugar, heredé tres aplicaciones existentes que ya estaban funcionando en producción.

- Un dashboard en Angular para adminsitradores.
- Un reproductor multimedia multi-plataforma.
- Una aplicación React para pantallas táctiles.

Cada aplicación tenía usuarios reales, requisitos de producto, y años de decisiones tomadas por desarrolladores que ya no estaban disponibles para explicarlas.

Este trabajo me echó a las brasas desde el momento que pisé las oficinas y me enseñó una lección que llevo conmigo hasta este día: la mayoría del desarrollo de software no trata de crear sistemas, trata de entender sistemas que ya existen.

## Lee antes de escribir

Como desarrollador júnior todavía no has desarrollado tu sentido de la urgencia. El tiempo es el motivador tras todas las decisiones: quieres sacar nuevas features lo más pronto posible, quieres tener listos la mayoría de entregables para cada review, y los equipos que tratan con clientes piden más rapidez.

Pero pronto aprendí que el código en producción conlleva una historia. La manera más rápida de romper un sistema es cambiar algo que no entiendes del todo, y eso es más verdad cuando no hay nadie alrededor para explicar las decisiones téncicas o de negocio que llevan a una implementación específica.

Entonces cada vez que tenía una tarea nueva, me dediqué a buscar features similares primero; antes de refactorizar, aprendí a analizar por qué el código actual era como era.

## El reproductor multimedia cambió cómo pienso acerca de software

El proyecto más valioso (y doloroso) en el que trabajé es el reproductor multimedia de Bexfy.

La tarea parecía simple: Descargar contenido, almacenarlo localmente y reproducirlo en una pantalla.

En realidad, operaba en entornos en los que los desarrolladores rara vez piensan: comercios con internet inestable, dispositivos que se reiniciar de improvviso, descargas corrompidas, hardware mal configurado o localizaciones donde nadie del departamente de IT puede visitar físicamente.

El reproductor me enseñó la importancia de la fiabilidad. Cuando una aplicación web crashea, el usuario puede simplemente refrescar la página pero cuando un reproductor de cartelería digitar falla, toda la pantalla se apaga y los clientes y encargados de tienda se dan cuenta rápido.

De esta forma aprendí a nunca pensar que el camino feliz es el único camino. ¿Qué sucede si una descarga se interrumpe a medias? ¿Qué pasa si el almacenamiento está lleno? ¿Qué ocurre si el dispositivo pierde la conexión durante horas?

El objetivo principal del reproductor multimedia fue crear una aplicación que reaccionara de forma elegante siempre que hubiera algún fallo.

## En retrospectiva

Cuando me uní a Bexfy, pensé que lo más importante a desarrollar era el conocimiento de nuevas tecnologías y escribir código de calidad. Me dediqué a aprender Angular, React, Cordova, servicios de AWS y pipelines de despliegue. Y aunque esos conocimientos fueron importantes, no fueron lo más valioso que aprendí.

La lección de verdad fue aprender a trabajar con sistemas existentes, leer código con el que no estaba familiarizado, entender decisiones de otros desarrolladores y cómo hacer cambios sin añadir riesgos innecesarios.

Estas lecciones fueron más difícies de aprender que cualquier tecnología, y también son las que más han recurrido a lo largo de mi carrera.