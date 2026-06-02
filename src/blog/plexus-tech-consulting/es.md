---
title: Plexus Tech - Consultoría, Deuda Técnica y Desarrollo Móvil
date: 2024-03-22
tags: ["web-dev", "mobile-dev"]
description: Lecciones aprendidas trabajando como desarrollador móvil en un entorno de consultoría, gestionando bases de código legacy y equilibrando demandas de clientes con sostenibilidad técnica.
thumb:
  base: https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg
---

Trabajando en Plexus Tech ssignificó ahondar en sistemas que no diseñé, no elegí y al principio tampoco entendía completamente. Era trabajo de consulttoría, y eso significa una cosa de forma consistente: rara vez empiezas desde cero. Trabajó como desarrollador móvil en múltiples proyectos de cliente donde el trabajo no era solo construir nuevas features.

## El trabajo de verdad no era desarrollo

A lo largo de los proyecctos un patrón resultó ser consistente: siempre había un backlog de features, un backlog de problemas téncicos y había siempre un sistema que había acumulado años de decisiones por parte de diferentes equipos.

## App móvil de e-commerce: Cuando la escala resulta en problemas de rendimiento

Uno de los proyectos en los que trabajé fue una app para un supermercado perteneciente a una gran marca.

La aplicación funcionaba, hasta que el uso aumentó y entonces problemas de rendimiento empezaron a aparecer en lugares que a principio no eran muy obvios. Las interacciones con el carrito se ralentizaban cuando los usuarios añadían grandes cantidades de elementos, las actualizaciones de estado se volvían más caras bajo uso intensivo. Pequeñas ineficiencias que no tenían importancia en testing se volvieron visibles en producción.

La parte complicada no era arreglar bugs individuales, era encontrar quién era el responsable. Lógica de frontend, tiempos de respuesta de backend, funcionamiento de la red... Cada problema requirió trazar el sistema de punta a punta y en projectos de consultoría, los problemas de rendimiento rara vez tienen un único origen.

## Aplicación de Salud: Cuando actualizaciones lo rompen todo

Otro proyecto era acerca de una aplicación de React Native en el espacio de la salud.

La tarea parecía simple: actualizar el SDK de Android para poder subir nuevas versiones a la app store. En práctica, el problema no estaba aislado: una dependencia requería una versión de Gradle más moderna, la cual entró en conflicto con otro plugin, el cual dependía en un módulo nativo que ya no tenía mantenimiento activo.

Lo que en un principio parecía una actualización rutinaria se convirtió en una investigación de dependencias. Pequeños cambios en una capa crearon efectos en cascada a través del sistema de build entero.

En código legacy nada es realmente independiente.

## La realidad de la consultoría: la inceridumbre es el estado base

Lo que me llamó la atención en todos los proyectos fue la incertidumbre. La documentación estaba incompleta u obsoleta, acceso a los desarrolladores originales estaba limitado y tanto los requisitos de negocio como las constrints técnicas estaban definidas vagamente. Este paradigma define la mayoría del trabajo como consultor: nunca tienes una visión global, trbajas con partes del sistema y contexto incompleto.

## Qué saqué en claro

1. **La comunicación es más importante que la implementación**. Explicar por qué algo está bloqueado es igual de importante que saber arreglarlo. Los stakeholders y clientes no ven gráficos de dependencias, solo ven retrasos y tu trabajo es traducir de uno a otro.

2. **La estimación siempre es probabilística**. Un bug nunca es solo un bug, es una hipótesis sobre dónde está la fractura en el sitema. A veces la hipótesis es incorrecta y el trabajo consiste en descubrir por qué.

3. **La estabilidad es una feature**. En entornos de consultoría, los sistemas ya tienen usuarios. Esto significa que cada cambio conlleva riesgos y a menudo la mejor solución es la que introduce la menor disrupción posible para el usuario final.

4. **La deuda técnica no es teórica**. No aprendes sobre deuda técnica en un libro o en un curso, la descubres cuando actualizar una versión conlleva do días de trabajo en lugar de dos horas.

## Reflexiones finales

En consultoría, software no es algo que diseñes en aislamiento si no algo que heredas, estabilizas y desarrollas en un corto periodo de tiempo. El reto técnico es real pero el mayor problema es trabajar con sistemas que ya están en marcha.

Eso es lo que define el trabajo.