---
title: "Implementando permisos ABAC en un frontend React"
date: 2025-09-13
tags: ["auth", "abac", "architecture"]
description: Implementando control de acceso basado en atributos en un frontend React — patrones, trampas y la arquitectura detrás de permisos por rol y atributo.
thumb:
  base: https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop
---

Toda aplicación con autenticación debe atajar autorización en algún momento. En nuestro caso, una vez el producto creció a una aplicación de tamaño medio, se volvió claro que necesitábamos un modelo apropriado para evitar que los usuarios llevaran a cabo acciones que no deberían.

Para hacer la idea más concreta, imaginemos un blog con múltiples autores y lectores. Así es como exploré múltiples formas de atajar el problema.

## La forma más ingenua

Cuando construimos nuestro MVP, empezamos con lo obvio: comprobaciones de rol en línea.

```js
function submitUserPostEdit(user) {
  if (user.roles.includes("admin") || user.roles.includes("editor")) {
    // submit the code to the back-end
  }
}
```

O dentro de un componente:

```jsx
<form>
	<textarea>
	{user.roles.includes("admin") || user.roles.includes("editor") && (
		<button id="edit-post-button" type="submit">
	)}
</form>
```

Es rápido, fácil y funciona. Pero el problema aparece más tarde: estas condiciones están esparcidas por toda la lógica de negocio y UI. Cuando la app crece y un permiso necesita cambiar, tienes que excavar cada condicional enterrado en el código.

## Control de acceso por rol

En el ejemplo del blog, podemos definir algunos conceptos: sujetos (usuarios), roles, permisos y acciones. El control de acceso por rol (RBAC, role-based access control) los enlaza entr esí: cada usuario tiene uno o más roles, y cada rol viene con una serie de permisos que definen qué acciones están permitidas.

![Role-based access control diagram](/assets/images/blog/implementing-abac-permissions/01.png){.prefers-media}

Así sería una implementación mínima:

```js
const PERMISSIONS = {
  admin: ["create:post", "update:post", "view:post", "delete:post"],
  editor: ["update:post", "view:post"],
  reader: ["view:post"],
};
```

And a simple checker:

```js
export const hasPermission = (user, permission) => {
  return user.roles.some((role) => {
    return PERMISSIONS[role].includes(permission);
  });
};
```

Que usaríamos de esta forma:

```js
// User should be like { id: "a", roles: ["editor"] }

hasPermission(user, "update:post");
```

Esto de por sí ya mejora las cosas: ya no hay comprobaciones hard-codeadas repartidas por el código. Pero RBAC todavía tiene límites. No maneja casos más delicados donde el contexto es importante.

## Control de acceso por atributos

¿Qué pasa si los autores solo pueden actualizar sus propios artículos? O si los lectores no deberían poder ver artículos marcados como borrador? Los roles por sí solos no responden a estas preguntas.

El control de acceso por atributos (ABAC, attribute-based access control) expande el modelo considerando más que solo roles. Tiene en cuanta también atributos del sujeto (el usuario), el objeto (el post), el entorno y la política en sí misma.

![Attribute-based access control diagram](/assets/images/blog/implementing-abac-permissions/02.png){.prefers-media}

Aquí tienes un esbozo:

```js
const PERMISSIONS = {
  posts: {
    editor: {
      view: true,
      update: (user, post) => user.id === post.authorId,
    },
  },
};
```

De esta forma los permisos pueden ser un booleano o una callback. La función `hasPermission` sólo necesita manejar ambas casuísticas:

```js
const hasPermission(user, resource, action, data) {
	return user.roles.some(role => {
		const permission = PERMISSIONS[role][resource]?.data;
		if (permission === null) return false;
		if (typeof permission === "boolean") return permission;

		return data !== null && permission(user,data)
	})
}
```

Y su uso es tal que así:

```js
hasPermission(user, "posts", "update", post);
```

Con ABAC obtenemos flexibilidad. Tanto si la condición está basada en IDs de usuario, etiquetas, fechas o variables de entorno, las reglas viven en un solo lugar y pueden escalar junto a la aplicación.

## Próximos pasos

Lo que hemos construido hasta ahora ya es mantenible y expresivo, pero hay lugar a mejora:

- Centralizar permisos de todo el stack. Ahora mismo, estas comprobaciones solo existen en el front-end. Moverlas al lado del servicor (o compartirlas entre cliente y servidor) reforzarían la seguridad del sistema.

- Delegar la gestión de permisos. En lugar de tener un archivo JSON en vivo, los permisos podrían estar en un dashboard o servicio de políticas para que miembros del equipo no-técnicos puedan ajustarlas.

- Utilizar una librería. Implementar tu propio sistema puede ser un muy buen ejercicio de aprendizaje, pero en producción una librería como [CASL](https://casl.js.org/v6/en) disminuiría tiempo de mantenimiento y delegaría mejoras.

## Reflexiones

Hasta aquí he llegado de momento. Esto no es la fuente única de conocimiento sobre permisos, pero es un patrón que se siente mantenible sin añadir complejidad extra.