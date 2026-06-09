---
title: "Construyendo un rastreador multimedia personal desde cero"
date: 2026-02-22
tags: ["side-project", "api-design", "node"]
description: Un proyecto fullstack para rastrear películas, series y libros — desde el diseño de API hasta un frontend en React con sincronización de base de datos externa.
thumb:
  base: https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=800&h=450&fit=crop
---

Cuando comencé este proyecto quería un solo lugar en el que almacenar información acerca de los contenidos que consumo. Juegos, películas, libros, series, y eventualmente cualquier cosa que quisiera.

La solución más simple era solicitar esos datos directamente desde APIs externas y usar esa información para maquetar mi web personal.

Esto funcionó bien en pequeña escala, pero comenzó a fallar al añadir complejidas. A medida que iba añadiendo integraciones, la página web comenzó a tener responsabilidades para las que no estaba diseñada.

* Obtener datos
* Sincronizar servicios externos
* Resolver conflictos
* Normalizar formatos
* Guardar estados
* Servir contenido

La capa presentacional se fue tranformando en una pipeline de información y en ese punto me di cuenta de que tenía dos responsabilidades escondidas en una sola aplicación: recolectar y gestionar información sobre contenido y mostrar esa información.

No había ningún motivo para que fueran el mismo sistema así que las dividí. Lo que empezó siendo una feature de mi página personal se convirtió en un rastreador multimedia independiente.

## El cambio que simplificó todo

El cambio más importante no fue elegir TypeScript o Supabase, fue decidir que la página web se convertiría en un consumidor en lugar del propietario. Una vez tomé esa decisión, la arquitectura se volvió evidente.

Las APIs externas alimentan a un servicio de sincronización, el cual es el propietario de toda la información y las distintas aplicaciones consumen los datos resultantes.

La página web ya no necesita saber cómo Steam da forma a sus respuestas, ni le importa cada cuanto se sincroniza. Simplemente lee la información normalizada y la pinta como quiere.

## El problema real no era la sincronización.

Obtener información de las APIs resultó ser bastante simple, pero modelar esa información fue más difícil. Cada servicio describe el contenido de forma diferente: juegos tienen logros, series tienen temporadas y episodios, libros tienen capítulos, álbumes tienen canciones. Cada plataforma decide su propia estructura y mi primera implementación simplemente imitaba cómo lo hacía la API que estuviera integrando en ese momento.

Esto funcionó hasta que añadí un proveedor secundario, y uno terciario y cada uno competía por que su estructura fuera la utilizada. Al final dejé de modelar APIs y empecé a modelar conceptos. En lugar de "Juegos de Steam" o "Vídeos de YouTube", esbocé una serie de primitivos de dominio:

- Entidades
- Relaciones
- Metadata
- Identidades origen
- Estado de progreso

Todo lo demás fue construido alrededor de esos conceptos. Juegos y logros son entidades, pero la conexión entre ellos es una relación. El mismo sistema de relaciones puede representar temporadas, episodios, canciones o cualquier otra cosa que decida almacenar.

El rastreador ya no está acoplado a unos proveedores en específico, ahora simplemente entiende el concepto de "medio" y adapta a los proveedores a si mismo.

Ahora cuando consumo esta información me da igual de dónde provenga, simplemente soy consciente del contrato de la estructura de datos que he firmado con mi servicio y por lo tanto puedo implementar una maquetación sin preocuparme de factores externos.