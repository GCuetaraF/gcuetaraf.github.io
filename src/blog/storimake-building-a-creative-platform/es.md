---
title: Storimake - 3 años construyendo una plataforma creativa
date: 2026-06-02
tags: ["web-dev"]
description: Este artículo comparte la arquitectura, desafíos y lecciones aprendidas al desarrollar una plataforma que conecta clientes con profesionales creativos para producir contenido a escala.
thumb:
  base: https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg
---

Hace tres años, me uní a Storimake como el único ingeniero frontend.

Storimake es un marketplace para producción creativa donde los clientes pueden creat proyectos; los fotógrafos, videógrafos, editores y otros colaboradores completan el trabajo y la plataforma coordina todo el proceso.

Detrás de este flujo de trabajo hay tres productos diferentes, múltiples roles de usuario, permisos complejos, subida de archivos, procesamiento de pago y miles de pequeñas decisiones de producto.

Durante los siguientes tres años, me hice responsable de todo ello. Para cuando dejé la empresa, construí y mantuve:

- Tres aplicaciones en producción
- Un sistema de diseño compartido
- Infraestructura de despliegues
- Internacionalización
- Analíticas y regulación GDPR
- Un modelo de permisos que abarca múltiples tipos de usuarios

En retrospectiva, la lección más importante que saqué tiene muy poco que ver con React, Next.js o TypeScript. Es acerca de las decisiones de ingeniería que permitieron a una sola persona continuar sacando nuevas features sin ahogarse en complejidad.

## El reto real

La parte más complicada no era escribir código razonable, si no evitar que la plataforma se volviese más complicada de desarrollar mes a mes. Cada feature añadía nuevos flujos de trabajo, cada uno de ellos casos de riesgo y cada caso de riesgo más costes de mantenimiento.

Sin un equipo frontend en el que poder respaldarme, no podía permitirme soluciones que funcionaran hoy pero crearan problemas seis meses más tarde y esa limitación dio forma a casi todas las decisiones arquitectónicas que tomé.

## Por qué un monorepo

Desde el principio era claro que la plataforma iba a ser usada por usuarios muy distintos. La solución obvia era separar aplicaciones en diferentes codebases, pero el problema es que los conceptos básicos de producto eran idénticos. Los proyectos eran proyectos, los usuarios eran usuarios y los permisos eran permisos.

Cada componente duplicado necesitaría ser mantenido en múltiples ocasiones y cada cambio en un flujo de trabajo tendría que ser implementado varias veces.

Como desarrollador único, eso no era algo que me pudiera permitir. El monorepo no fue una preferencia técnica, fue una estrategia de supervivencia.

## El mayor reto es lógica de negocio

El código más complejo que escribí no era de UI, si no lógica de flujos. La producción de contenido suena bastante simple cuando la describes en una sola frase:

"*Un cliente solicita fotos, el fotógrafo toma las fotos, el editor las edita y el cliente revisa el resultado final.*"

Pero en realidad, cada paso depende de otros pasos. Los editores no pueden editar fotos que no han sido subidas. Los clientes no pueden aprobar contenido que no ha sido entregado y los colaboradores no pueden acceder a proyectos que no tienen asignados.

Para cuando múltiples roles de usuario, estados de proyecto y tipos de servicio entraron en juego, la complejidad creció rápidamente. La mayoría de bugs no eran visuales, si no reglas de negocio que no se habían definido correctamente.

## Qué haría diferente

No todas las decisiones salieron bien. Algunos paquetes se volvieron demasiado grandes, algunas responsabilidades se delinearon mal. Esperamos demasiado tiempo en invertir en Storybook, nunca llegamos a establecer una estrategia de testing end-to-end y documentamos más casos de implementación que decisiones de arquitectura.

Ninguno de estos problemas fue catastrófico, pero cobraron factura a lo largo del tiempo. Es uno de los temas recurrentes en la ingeniería de software: pocas decisiones fallan inmediatamente y en su lugar acumular interés que tendrás que pagar en algún punto.

## Lo que me enseñaron esos tres años

Tras tres años, mi mayor moraleja es que la arquitectura en realidad trata de mantener un buen ritmo. Las mejores decisiones técnicas no eran las más sofisticadas, si no las que redujeron trabajo de cara al futuro.

Como ingenieros, a menudo nos centramos en lo que construimos pero con más experiencia, ahora me centro más en lo que no tengo que reconstruir. Ahí es donde puedes conseguir una ventaja contra el tiempo.

Y cuando eres el único ingeniero frontend manteniendo toda una plataforma, esas ventajas se convierten en uno de los salvavidas más importantes que puedes tener.