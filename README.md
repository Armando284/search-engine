# Buscador de Películas

Este proyecto implementa un motor de búsqueda para películas. Permite a los usuarios buscar por título, descripción corta y fecha de lanzamiento, mostrando los resultados en tiempo real y resaltando las coincidencias.

## Estructura del Proyecto

- **`index.html`**: Define la estructura básica de la interfaz del buscador. Contiene un formulario de búsqueda y un área para mostrar los resultados.
  
- **`style.css`**: Proporciona el estilo visual de la aplicación, incluyendo el diseño de los elementos y la responsividad.

- **`main.js`**: Contiene la lógica principal del motor de búsqueda, incluyendo la función de filtrado y el resaltado de coincidencias.

- **`data.js`**: Archivo que contiene un conjunto de datos de películas que se utilizarán para las búsquedas.

## Funcionamiento del Código

### Búsqueda en Tiempo Real

- **Entrada del Usuario**: Cuando el usuario escribe en el campo de búsqueda (`#search-input`), se activa un evento que llama a la función `searchData` después de un breve retraso (debouncing) para evitar múltiples llamadas a la función mientras se escribe.

- **Filtrado de Datos**: La función `searchData` filtra los datos de películas en base a los términos de búsqueda. Utiliza la función `includes` para verificar si el término de búsqueda está presente en el título, la descripción corta o la fecha de lanzamiento.

### Resaltado de Coincidencias

- **Resaltado**: Las coincidencias se resaltan utilizando un enfoque simple de envoltura en etiquetas `<span>` con un estilo específico. Esto se puede implementar dentro de la lógica de `renderData` al construir el contenido para cada tarjeta de película.

### Renderización de Resultados

- **Renderización**: La función `renderData` se encarga de mostrar los resultados filtrados en la interfaz. Borra los resultados anteriores y crea nuevas tarjetas utilizando un `template` de HTML, clonando el contenido del `template` para cada película coincidente.

### Uso del Trie (Opcional)

Si deseas experimentar con una búsqueda más eficiente, hay una implementación de Trie en la rama `trie-implementation`. Un Trie permite realizar búsquedas por prefijo de manera más rápida, lo que es útil para autocompletar y mejorar el rendimiento de búsqueda en grandes conjuntos de datos.

## Cómo Ejecutar el Proyecto

Puedes ejecutar el proyecto de dos maneras:

1. **Abriendo `index.html` en un navegador**: Funciona, pero puede tener restricciones de CORS.
  
2. **Usando Live Server en Visual Studio Code**:
   - Abre el proyecto en Visual Studio Code.
   - Instala la extensión Live Server.
   - Haz clic derecho en `index.html` y selecciona "Open with Live Server".

Esto iniciará un servidor local y podrás ver los cambios en tiempo real.

## Dudas

Si tienes alguna pregunta sobre el funcionamiento del código o necesitas ayuda adicional, no dudes en escribirme.