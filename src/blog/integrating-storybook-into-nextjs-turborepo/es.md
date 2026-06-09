---
title: "Integrando Storybook en un Turborepo con Next.js"
date: 2025-08-23
tags: ["storybook", "design-systems", "dx"]
description: Integrando Storybook en un monorepo Turborepo con Next.js — configuración, patrones de documentación de componentes y mejoras de DX.
thumb:
  base: https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=800&h=450&fit=crop
---

En nuestra startup, el testing de UI era mínimo. Esto estaba bien para el MVP, pero a medida que la plataforma creció en tamaño y usuarios, también lo hizo la neceidad de aumentar la mantenibilidad. Hace unas semanas recordé esta [charla por Kevin Yank](https://kevinyank.com/posts/help-storybook-is-eating-all-our-tests/) donde describe como Culture Amp usa Storybook para casi cada test.

Durante la pasadas fiestas, mi project manager autorizó un par de semans para atacar la deuda técnica, y una de las tareas que me asignó fue implementar Storybook en nuestra base de código.

## Qué es Storybook

Puedes imaginarte Storybook como un cajón donde cada componente vive de forma independente entre sí. En lugar de levantar una aplicación de Next.js entera para testear unos componentes en específico, puedes previsualizarlos y ajustarlos por separado.

## Añadiendo Storybook a Turborepo

Tenemos Turborepo para gestionar nuestras apps porque necesitábamos un ecossitema compartido de componentes, hooks, operaciones CRUD y proveedores. Turborepo nos dio escalabilidad con una carpeta de `packages/ui` para elementos UI y `packages/lib` para configuraciones de API, integraciones y utilidades.

Montamos Storybook como una nueva app de Turborepo (`apps/storybook`) junto con el resto. Esto permitió mantener sus configuraciones aisladas mientras que nos permite importar `packages` para montar nuestras Stories.

Nuestra primera `Story` fue para el componente primitivo `Button`:

```tsx
import type { Meta, StoryObj } from "@storybook/nextjs";
import { Button } from "@platform/ui/primitives/button";

const meta = {
  title: "Primitives/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: Button.variantOptions,
      defaultValue: "primary",
    },
    size: {
      control: { type: "select" },
      options: Button.sizeOptions,
      defaultValue: "default",
    },
  },
  args: {
    variant: "primary",
    size: "default",
    children: "Button",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { variant: "primary", children: "Button" },
};
```

## Añadiendo soporte para NextAuth

La mayoría de nuestros componentes dependen del estado del usuario, y sin NextAuth se romperían o enseñarían contenido sin sentido. Solventamos este problema mediante un proveedor de sesión específico para Storybook:

```tsx
import { unauthenticatedSession } from "@storybook/mocks/session";
import { SessionContext, Session } from "next-auth/react";

export default function NextAuthDecorator({
  children,
  session,
}: PropsWithChildren<{ session?: Session }>) {
  const sessionData = session || unauthenticatedSession;

  return (
    <SessionContext.Provider
      value={‎{
        update: () => Promise.resolve(sessionData) as any,
        data: sessionData as any,
        status: "authenticated",
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
```

Con este decorator, podemos previsualizar componentes desde distintos puntos de vista de usuario. Por ejemplo, nuestra `PlanCard` muestra acciones diferentes para admins vs. usuarios, así que podemos cambiar de sesión instantáneamente sin crear una nueva cuenta de pruebas para cada tipo de usuario.

```tsx
import NextAuthDecorator from "@storybook/decorators/NextAuthDecorator";
import { sessionOptions } from "@storybook/mocks/session";
import AddServiceButton from "@platform/ui/components/projects/business-add-service/AddServiceButton";

export default {
  title: "Components/Project/Creation/Services/AddServiceButton",
  component: AddServiceButton,
  argTypes: {
    session: {
      control: { type: "select" },
      options: Object.keys(sessionOptions),
      mapping: sessionOptions,
    },
  },
};

export const Default = (args: { session?: keyof typeof sessionOptions }) => {
  return (
    <NextAuthDecorator session={args.session}>
      <AddServiceButton />
    </NextAuthDecorator>
  );
};
```

## Añadiendo add-ons para Storybook

Una vez el setup técnico estaba terminado, me centré en lo que quería conseguir desde el principio: mejor colaboración con diseño y probar la lógica de negocio por separado.

### Colaboración con diseño

Usando el `@storybook/addon-designs`, podemos enlazar y mostrar archivos de Figma dentro del propio Storybook. Nuestros diseñadores ahora pueden revisar la calidad de la UI desde una sola interfaz.

```tsx
export const Playground: Story = {
  args: { variant: "primary", children: "Button" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/...",
    },
  },
};
```

### Simulación de daots y APIs

Muchos de nuestros componentes se nutren de los datos del backend. En Storybook, apuntar a APIs en vivo es arriesgado y lento y nos quita un control más personalizado sobre la información con la que queremos hacer pruebas. En su lugar:

- **Añadimos contexto de React Query** con un `QueryClientProvider` global.

  ```tsx
  import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  export const decorators = [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ];
  ```

- **Mockeamos llamadas al backend** usando Mock Service Worker (MSW).

  ```tsx
  import { HttpResponse, http } from "msw";
  import { unauthenticatedSession } from "@storybook/mocks/session";

  export const authHandlers = [
    http.get("/api/auth/session", () => {
      return HttpResponse.json(unauthenticatedSession, { status: 200 });
    }),
  ];
  ```

  Y lo habilitamos globalmente en `preview.tsx`:

  ```tsx
  import { initialize, mswLoader } from "msw-storybook-addon";
  import { authHandlers } from "../src/mocks/handlers/authHandlers";

  initialize();

  export const parameters = {
    msw: {
      handlers: [...authHandlers],
    },
  };

  export const loaders = [mswLoader];
  ```

Esto nos permite simular respuestas (ej. usuario autenticado vs. estado erróneo) y probar componentes sin depender de APIs reales.

## Añadir internacionalización

Nuestra aplicación depende de `next-intl` completamente. Sin i18n, Storybook pintaría las claves como `auth.login.button` en lugar del texto traducido. La solución era re-utilizar el mismo proveedor de i18n que usamos en nuestras apps en Storybook.

```tsx
import LocaleProvider from "@platform/lib/client-only/providers/locale-provider.storybook";

const preview: Preview = {
  decorators: [
    (Story) => (
      <LocaleProvider locale="es">
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      </LocaleProvider>
    ),
  ],
};
```

Ahora los componentes mostrarían los textos apropriados ("Iniciar sesión" / "Login"), permitiendo una revisión más realista.

## Siguientes pasos

Storybook comenzó como una forma de poder ver los componentes aislados, pero poco a poco se está convirtiendo en nuestro hub de UI. Próximamente:

1. **Interaction testing** - escribir flujos de usuario (ej. validación de formularios) con las utilidades de testing de Storybook.
2. **Comprobaciones de accesibilidad** - añadir `@storybook/addon-a11y` para pillar fallos de accesibilidad cuanto antes.
3. **Documentación en vivo** - usar `@storybook/addon-docs` para que las Stories actúen como documentación de desarrollo y diseño.

Aunque nuestro equipo ha cambiado a otras prioridades, Storybook se mantiene como parte de nuestro flujo de trabajo diario. Primero planteo prototipos en Storybook, lo que hace que el desarollo sea más fluido, las reviews más claras y la colaboración más inclusiva.