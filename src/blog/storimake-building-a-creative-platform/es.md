---
title: "Storimake: 3 años construyendo una plataforma creativa"
date: 2026-06-02
tags: ["architecture", "platform", "nextjs"]
description: Arquitectura, desafíos y lecciones escalando una plataforma de producción de contenido que conecta clientes con profesionales creativos.
thumb:
  base: https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg
---

Hace tres años me uní a Storimake como el único ingeniero frontend de la empresa.

Storimake es una plataforma que conecta clientes con fotógrafos, videógrafos, editores y otros profesionales creativos para producir contenido a escala. A primera vista, el flujo parece sencillo: un cliente solicita un proyecto, un equipo lo ejecuta y el contenido se entrega. Sin embargo, detrás de esa aparente simplicidad había una cantidad considerable de complejidad operativa.

Con el tiempo terminé siendo responsable de tres aplicaciones en producción, un sistema de diseño compartido, la infraestructura de despliegue frontend, la internacionalización de la plataforma, integraciones de analítica y cumplimiento de GDPR, además de un modelo de permisos que debía funcionar de forma consistente para distintos tipos de usuarios.

Mirando atrás, la lección más importante que me llevo de esos años tiene poco que ver con React, Next.js o TypeScript. Lo que más impacto tuvo en mi día a día fueron las decisiones que permitieron que una sola persona siguiera desarrollando nuevas funcionalidades sin que cada cambio resultara más caro que el anterior.

## El reto real

Es fácil pensar que el trabajo consiste principalmente en escribir código, pero en proyectos que crecen durante años el problema suele ser otro. Cada nueva funcionalidad introduce nuevos estados, nuevas excepciones y nuevas dependencias entre partes del sistema que antes estaban aisladas. Al principio apenas se nota, pero meses después empiezas a encontrarte con tareas aparentemente simples que requieren modificaciones en varios lugares distintos y despliegues que generan más incertidumbre de la que deberían.

Como no tenía un equipo frontend detrás con el que repartir responsabilidades, muchas decisiones acababan pasando por el filtro de una pregunta bastante simple: ¿seguiré queriendo mantener esto dentro de seis meses?

Esa limitación terminó condicionando gran parte de la arquitectura.

## Por qué un monorepo

Desde muy pronto quedó claro que la plataforma acabaría teniendo varias aplicaciones. Los clientes, los profesionales y el equipo interno trabajaban con necesidades diferentes y cada uno requería interfaces específicas.

La alternativa más obvia era separar cada aplicación en su propio repositorio, pero había un problema: aunque las interfaces fueran distintas, el dominio era prácticamente el mismo. Los proyectos seguían siendo proyectos, los usuarios seguían siendo usuarios y las reglas de permisos afectaban a todos los productos por igual.

Cada vez que se modificaba un flujo de negocio importante, el cambio terminaba impactando en varias aplicaciones. Mantener repositorios independientes habría supuesto duplicar componentes, tipos, modelos de dominio y parte de la lógica de negocio. Para una organización grande quizá no habría sido especialmente problemático. Para una sola persona sí.

Por eso el monorepo nunca fue una preferencia tecnológica. Fue una decisión práctica para reducir duplicación y mantener una única fuente de verdad para los conceptos más importantes del producto.

## Donde realmente estaba la complejidad

Curiosamente, el código más difícil de mantener no era el de la interfaz.

Cuando explicas el producto en una conversación, todo parece razonable: un cliente solicita contenido, los profesionales realizan el trabajo y el cliente aprueba el resultado final. El problema es que los sistemas reales rara vez funcionan con reglas tan simples.

Un editor no puede trabajar sobre archivos que todavía no se han subido. Un cliente no debería aprobar contenido que aún no se ha entregado. Los profesionales solo pueden acceder a proyectos concretos. Algunos servicios requieren varios profesionales trabajando en distintas fases. Otros permiten revisiones, entregas parciales o flujos específicos según el tipo de producción.

La mayoría de errores relevantes no estaban relacionados con botones, formularios o estilos visuales. Solían aparecer cuando alguna regla de negocio no contemplaba correctamente un caso concreto o cuando dos partes del sistema interpretaban el mismo proceso de manera diferente.

Con el tiempo entendí que buena parte del trabajo consistía en modelar correctamente esas reglas y asegurar que se aplicaran de forma consistente en toda la plataforma.

## Lo que haría diferente

No todas las decisiones salieron bien.

Algunos paquetes crecieron más de lo que deberían. Algunas responsabilidades quedaron mal delimitadas y tardamos demasiado en invertir en herramientas que habrían mejorado la experiencia de desarrollo. Storybook llegó más tarde de lo ideal y nunca terminamos de establecer una estrategia sólida de testing end-to-end.

Tampoco fuimos especialmente buenos documentando decisiones arquitectónicas. Había bastante documentación sobre cómo funcionaban determinadas implementaciones, pero mucha menos sobre por qué se habían tomado ciertas decisiones. Con el paso del tiempo, esa información suele ser más valiosa que los detalles de implementación.

Ninguno de estos problemas fue especialmente grave por sí mismo. Lo interesante es que casi todos compartían la misma característica: no generaban consecuencias inmediatas. Simplemente hacían que el desarrollo fuera un poco más lento, un poco más difícil o un poco más costoso cada mes.

## Lo que me enseñaron estos tres años

Después de tres años, mi conclusión es que la arquitectura tiene menos que ver con sofisticación técnica de lo que solemos pensar.

Las decisiones más valiosas no fueron las más ingeniosas ni las más complejas. Fueron las que consiguieron mantener un ritmo de desarrollo razonable a medida que el producto crecía.

Con el tiempo he dejado de fijarme tanto en cuánto trabajo me ahorra una decisión hoy y he empezado a prestar más atención a cuánto trabajo me evitará dentro de un año. En proyectos de larga duración, esa diferencia acaba siendo enorme.

Cuando eres la única persona manteniendo gran parte de una plataforma, la capacidad de seguir avanzando sin que la complejidad te frene deja de ser una ventaja. Se convierte en una necesidad.
