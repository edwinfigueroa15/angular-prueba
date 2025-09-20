# Prueba Amaris
 
 Este repositorio no corresponde a código oficial de BTG Pactual, únicamente corresponde a una prueba técnica personal.
 
 
# Guía para ejecutar el proyecto

Esta guía te ayudará a preparar tu entorno y a ejecutar la aplicación Angular en tu máquina local.

## Requisitos

- Node.js: 18.19.x, 20.11.x o 22.x (Angular 20)
- npm (incluido con Node.js)
- Git
- Navegador moderno (Chrome, Edge, Firefox)
- Opcional: Angular CLI instalada globalmente `npm i -g @angular/cli` (también puedes usar `npx`)
- Opcional: AWS CLI (solo si usarás el script de `npm run deploy`)

Verifica tus versiones:

```bash
node -v
npm -v
ng version   # opcional; si no tienes CLI global, usa: npx ng version
```

Descarga Node.js desde: https://nodejs.org

## Clonar el repositorio

```bash
git clone https://github.com/edwinfigueroa15/angular-prueba.git
cd angular-prueba
```

## Instalación de dependencias

Ejecuta una de las siguientes opciones:

- Si existe `package-lock.json` (recomendado):
  ```bash
  npm ci
  ```

- Si no existe `package-lock.json`:
  ```bash
  npm install
  ```

## Usuarios de prueba (credenciales)

 Usa cualquiera de estos usuarios para iniciar sesión durante la prueba:

 - Usuario: `admin` — Contraseña: `admin123`
 - Usuario: `consultor` — Contraseña: `consultor123`
 - Usuario: `root` — Contraseña: `root123`

## Ejecutar en modo desarrollo

Opción A (recomendada, sin CLI global):
```bash
npx ng serve --open
```

Opción B (usando scripts de npm):
```bash
npm start
```

La aplicación quedará disponible en:

- http://localhost:4200/

## Construcción para producción

```bash
npm run build
```

La salida se genera en `dist/Prueba-Amaris/browser/`.

## Despliegue AWS (opcional)

Para desplegar la aplicación en AWS primero debes crear la infraestructura con el script `deploy-aws.sh` y cuando finalice la creación de la infraestructura puedes usar el script `deploy-change.sh` para desplegar los cambios. Para que ambos archivos funcionen como ejecutable primero se le deben dar los permisos para eso con el comando:

```bash
chmod +x deploy-aws.sh
chmod +x deploy-change.sh
```

Luego puedes ejecutar los scripts de la siguiente manera:

Primero creamos la infraestructura Nota: Este script solo se ejecuta una vez y se puede tardar entre 5 a 10 minutos en terminar:
```bash
./deploy-aws.sh
```

Luego desplegamos los cambios Nota: Este script se ejecuta cada vez que se quiera desplegar un cambio:
```bash
./deploy-change.sh
```


## Estructura y tecnologías

- Angular ^20
- PrimeNG y PrimeIcons para componentes UI
- Tailwind CSS (v4) y `@tailwindcss/postcss`

Si necesitas ayuda adicional o deseas agregar más instrucciones, avísame y lo actualizamos.
