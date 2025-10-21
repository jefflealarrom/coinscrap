Datos
-----
Nombre: Jeff Leal Arrom
Fecha: 21/10/2025
Opcion practica elegida: A

1) Respuestas cortas
-----------------------------------
# Pregunta 1: ¿Qué es el “callback hell” y cómo lo evitarías hoy?
El “callback hell” ocurre cuando se encadenan múltiples funciones asincrónicas con callbacks anidados, lo que genera código difícil de leer y mantener. Hoy se evita usando Promises y async/await, que permiten escribir flujo secuencial más claro. Para controlar concurrencia, se puede usar Promise.all, Promise.allSettled o librerías como p-limit. Ejemplo:
# `const roles = await Promise.all(rolesToCreate.map(role => createRole(role)));`

# ¿Qué aporta TypeScript en frontend? Da 2 ventajas y 1 limitación real.
TypeScript aporta: Autocompletado y validación de tipos en tiempo de desarrollo, lo que reduce errores Refactorización más segura, especialmente en proyectos grandes.
Limitación: Puede ralentizar el desarrollo inicial por la necesidad de definir tipos, especialmente en prototipos o cuando el dominio aún no está claro.

# Ejemplo: `type Transaction = { id: string; amount: number }; function formatAmount(tx: Transaction) { return tx.amount.toFixed(2);}`


2) Practiico A 
-----------------------
Elegí CSR (Client Side Rendering) para el componente TransactionsList porque las interacciones de filtrado y orden no dependen del servidor y deben ser inmediatas.
En un entorno real, combinaría SSR para el listado inicial (mejor SEO y TTFB) con CSR para los filtros locales.

Estado: manejado localmente con useState y useMemo para rendimiento en el filtrado.
Estilos: TailwindCSS por simplicidad y consistencia visual.
Accesibilidad: uso de aria-label, role, y aria-live para estados de carga/vacío.
Seguridad: sin entrada de usuario persistente, pero se controla el try/catch al filtrar para evitar errores en renderizado.


Test 1: Filtrado por texto (simula input y verifica resultados).
Test 2: Estados vacíos (sin datos iniciales o filtro sin resultados).
Ambos validan la experiencia del usuario final y los posibles edge cases visuales.


Falta manejo de errores del servidor (mock no cubre esa rama).
No hay test de ordenamiento por importe.
Futuro: integrar API real con SWR o React Query, y testear interacción con red.


3) Tiempo invertido (aprox.)
----------------------------
Implementacion: 30 min · Tests: 25 min · README: 2 min



Cómo ejecutar

1. Instalar dependencias:

```bash
pnpm install
```

2. Ejecutar tests:

```bash
pnpm test
```

