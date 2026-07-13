# Runbook de lanzamiento — laraauditrisk.com

Guía paso a paso para poner el sitio en línea en Cloudflare Pages con la cuenta de tu papá, y darle a él un panel para escribir artículos. Síguelo en orden. Los pasos con cuenta (GitHub, Cloudflare, Sanity) los haces tú porque requieren tus inicios de sesión.

Resumen de decisiones:
- Dominio principal: **laraauditrisk.com** (el otro redirige a este).
- Despliegue: **GitHub → Cloudflare Pages** (recompila solo).
- Artículos: **Sanity** (panel visual para tu papá).

---

## Paso A — Subir el código a GitHub (tu cuenta)

El repositorio puede ser **tuyo**; el hosting y los dominios siguen en la cuenta de Cloudflare de tu papá. No hay problema en separarlos.

1. Crea un repositorio vacío en tu GitHub, por ejemplo `laraauditrisk-web` (privado está bien).
2. Desde la carpeta `laraauditrisk-web/`:

```bash
git init
git add .
git commit -m "Sitio Lara ARA — diseño aprobado + Perspectivas via Sanity"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/laraauditrisk-web.git
git push -u origin main
```

---

## Paso B — Cloudflare Pages (cuenta de tu papá)

1. Entra a **dash.cloudflare.com** con la cuenta de tu papá → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Autoriza GitHub y elige el repo `laraauditrisk-web`.
3. Configuración de build:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** 18 o superior (variable `NODE_VERSION = 18` si hiciera falta).
4. **Save and Deploy.** En ~1 minuto tendrás una URL tipo `laraauditrisk-web.pages.dev`. Revisa que se vea bien.

---

## Paso C — Conectar los dominios

Los dos dominios ya están en Cloudflare, así que esto es directo.

1. En el proyecto de Pages → pestaña **Custom domains** → **Set up a domain** → escribe `laraauditrisk.com` y también `www.laraauditrisk.com`. Cloudflare crea los registros DNS solo.
2. Para que **laraauditriskadvisory.com** redirija al principal:
   - Ve a ese dominio en Cloudflare → **Rules** → **Redirect Rules** → **Create rule**.
   - Condición: *Hostname* contiene `laraauditriskadvisory.com`.
   - Acción: **Dynamic redirect** → `concat("https://laraauditrisk.com", http.request.uri.path)` → código **301**.
   - Guarda. Ahora cualquier entrada al dominio largo cae en el principal, conservando la ruta.

---

## Paso D — Sanity (panel de artículos para tu papá)

Esto le da a tu papá una web limpia donde escribe y publica, sin tocar código.

1. Crea el Studio de Sanity (en tu máquina, en una carpeta aparte del sitio):

```bash
npm create sanity@latest -- --template clean --create-project "Lara ARA" --dataset production
```

   Anota el **Project ID** que te da (algo como `a1b2c3d4`).
2. Copia el esquema `sanity/schemaTypes/article.js` de este proyecto a la carpeta `schemaTypes/` del Studio y regístralo en `schemaTypes/index.js`:

```js
import article from './article';
export const schemaTypes = [article];
```

3. Haz el dataset **público** (para que el sitio pueda leerlo sin token): en **sanity.io/manage** → tu proyecto → **API** → **Datasets** → `production` → *Public*.
4. Publica el Studio para que tu papá entre por web:

```bash
npx sanity deploy      # elige un nombre, ej. lara-ara  →  https://lara-ara.sanity.studio
```

   Ese enlace es el que le pasas a tu papá. Entra, crea un "Artículo (Perspectiva)", llena título/resumen/cuerpo en ES y EN, marca fecha y **Publish**.

---

## Paso E — Conectar Sanity con el sitio

1. En **Cloudflare Pages → Settings → Environment variables** agrega (para *Production* y *Preview*):
   - `PUBLIC_SANITY_PROJECT_ID` = el Project ID del paso D.
   - `PUBLIC_SANITY_DATASET` = `production`
2. Vuelve a desplegar (**Deployments → Retry deployment** o haz un commit). A partir de ahí, el sitio muestra los artículos reales de Sanity en lugar de los de muestra.
3. **Recompilar al publicar** (para que un artículo nuevo aparezca solo):
   - En Cloudflare Pages → **Settings → Builds & deployments → Deploy hooks** → crea uno, copia la URL.
   - En **sanity.io/manage** → tu proyecto → **API → Webhooks** → **Create webhook** → pega la URL del deploy hook, método `POST`, dispara en *Create/Update/Delete* del tipo `article`.
   - Ahora, cada vez que tu papá le da **Publish**, Cloudflare reconstruye el sitio en ~1 minuto.

---

## Qué queda pendiente (demo)

Estos flujos están como demostración visual; dime cuándo quieres activarlos:

- **Pago** de la Matriz (USD 29 / COP 99.000): falta elegir proveedor (por ejemplo Lemon Squeezy, Gumroad o Stripe) y conectar el botón.
- **Descargas gratuitas**: falta subir los PDF y conectar el formulario de entrega (nombre, email, organización).
- **Formulario de contacto**: hoy solo muestra confirmación. Se conecta con un servicio como Formspree o un Worker de Cloudflare.
- **Foto** profesional de José Antonio Lara en `/nosotros`.

## Mantenimiento

- Cambios de diseño o texto: editas los archivos, `git push`, y Cloudflare publica solo.
- Artículos: los hace tu papá desde el Studio de Sanity. No necesita tocar el código.
