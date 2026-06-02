---
title: Cómo construí mi rastreador multimedia
date: 2026-02-22
tags: ["web-dev", "media"]
description: Para gestionar todos los medios con los que interactúo, creé un sistema administrado que rastrea y almacena la información en una base de datos externa que luego puedo consumir en cualquiera de mis aplicaciones.
thumb:
  base: https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=800&h=450&fit=crop
---

Quería un solo lugar en el que almacenar información acerca de los medios que consumo. Juegos, logros, libros, series, y eventualmente cualquier cosa que quisiera.

La solución más simple era obtener datos directos de APIs externas y pintarlas en mi web personal.

Esto funcionó sorprendentemente bien hasta que dejó de funcionar.

A medida que iba añadiendo integraciones, la página web comenzó a tener responsabilidades para las que no estaba diseñada.

* Obtener datos
* Sincronizar servicios externos
* Resolver conflictos
* Normalizar formatos
* Guardar estados
* Servir contenido

La capa presentacional se fue tranformando en una pipeline de información y en ese punto me di cuenta de que tenía dos responsabilidades escondidas en una sola aplicación: recolectar y gestionar información sobre medios y mostras esa información.

No había ningún motivo para que fueran el mismo sistema así que las dividí.

Lo que empezó siendo una feature de mi página personal se convirtió en un rastreador multimedia independiente.

## El cambio que simplificó todo

El cambio más importante no fue elegir TypeScript o Supabase, fue decidir que la página web se convertiría en un consumidor en lugar del propietario. Una vez tomé esa decisión, la arquitectura se volvió evidente.

Las APIs externas alimentan a un servicio de sincronización, el cual es el propietario de toda la información y las distintas aplicaciones consumen los datos resultantes.

La página web ya no necesita saber cómo Steam da forma a sus respuestas, ni le importa cada cuanto se sincroniza. Simplemente lee la información normalizada y la pinta como quiere.

## El problema real no era la sincronización.

Obtener información de las APIs resultós er bastante simple, pero modelar esa información fue más difícil. Cada servicio describe medios de forma diferente: juegos tienen logros, series tienen temporadas y episodios, libros tienen capítulos, álbumes tienen canciones. Cada plataforma decide su propia estructura y mi primera implementación simplemente imitaba cómo lo hacía la API que estuviera integrando en ese momento.

Esto funcionó hasta que añadí un proveedor secundario, y uno terciario. Al final dejé de modelar APIs y empecé a modelar conceptos. En lugar de "Juegos de Steam" o "Vídeos de YouTube", esbocé una serie de primitivos de dominio:

- Entidades
- Relaciones
- Metadata
- Identidades origen
- Estado de progreso

Todo lo demás fue construido alrededor de esos conceptos. Juegos y logros son entidades, pero la conexión entre ellos es una relación. El mismo sistema de relaciones puede representar temporadas, episodios, canciones o cualquier otra cosa que decida almacenar.

El rastreador ya no está acoplado a unos proveedores en específico, ahora simplemente entiende el concepto de "medio" y adapta a los proveedores a si mismo.