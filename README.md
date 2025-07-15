T�tulo del Proyecto:  API RESTful  para E-Commerce:

Esta aplicaci�n incluye tanto el c�digo del backend como el c�dido de fronted (pretendi�ndose convertir en una modesta app fullstack).

La mimsa consiste en una API RESTful, desarrollada con Node.js  y  el framework Express. 
Su prop�sito es servir como el backend para una tienda en l�nea, permitiendo la gesti�n completa de productos (CRUD: Crear, Leer, Actualizar, Eliminar) y protegiendo las operaciones sensibles mediante un sistema de autenticaci�n basado en JSON Web Tokens (JWT).

La arquitectura est� dise�ada para ser escalable y mantenible, separando las responsabilidades en distintas capas l�gicas. 
Los datos de la aplicaci�n se almacenan en una base de datos NoSQL en la nube, utilizando el servicio Firestore de Google Firebase.

Tecnolog�as Utilizadas:   Node.js,  Express, Firestore, JWT. 

Estructura de Carpetas y Archivos:
A continuaci�n se detalla la estructura completa del proyecto, explicando la importancia y la funci�n de cada archivo clave. Se indican la carpeta del proyecto y sus subcarpetas.

Backend_proyecto_final_ecomerce_api/
  
�
__ node_modules/             # (Carpeta autogenerada) Contiene todas las dependencias del proyecto.
�
__ src/                      # Carpeta principal que contiene todo el c�digo fuente de la aplicaci�n.
�   �
�   __ app.js                # Coraz�n y punto de entrada de la aplicaci�n.
�   �
�   __ config/
�   �   __ firebase.config.js    # Configuraci�n y conexi�n a servicios externos (Firebase).
�   �
�   __ controllers/
�   �   __ auth.controller.js    #  L�gica para manejar las peticiones de autenticaci�n.
�   �   __ product.controller.js # L�gica para manejar las peticiones relacionadas con productos.
�   �
�   __ middlewares/
�   �   __ auth.middleware.js    # Middleware de seguridad para proteger rutas.
�   �
�   __ models/
�   �   __ product.model.firestore.js   # Interacci�n directa con la base de datos para productos.
�   �
�   __ routes/
�   �   __ auth.routes.js            #  Define las rutas de autenticaci�n (ej: /login).
�   �   __ products.routes.js        #  Define las rutas para los productos (ej: /api/products).
�   �
�   __ services/
�       __ auth.service.js           # L�gica de negocio para la autenticaci�n.
�       __ product.service.js        # L�gica de negocio para los productos.
�  
__ .env                              #  (Archivo local, no se sube al repositorio) Almacena las variables de entorno y secretos (PORT,                                                    JWT SECRET KEY y las correspondientes a Firebase).

__ .gitignore                        #  Especifica qu� archivos y carpetas ignorar en Git.
__ package.json                      #  Manifiesto del proyecto: dependencias, scripts y metadatos.
__ package-lock.json                 #  (Autogenerado) Registra las versiones exactas de las dependencias.
__ README.md                         #  Documentaci�n principal del proyecto.



Descripci�n Detallada de Archivos y Responsabilidades:

Ra�z del Proyecto (/)

package.json:   Es el archivo m�s importante de un proyecto Node.js.  Define el nombre del proyecto, la versi�n, y lo m�s crucial:  los scripts para ejecutar tareas (npm start, npm run dev) y las dependencias (librer�as como Express, Firebase, JWT) que el proyecto necesita para funcionar.

.env:   Archivo de configuraci�n fundamental para la seguridad. Almacena "secretos" como las credenciales de la base de datos y la clave para firmar los JWT. Al estar listado en .gitignore, se evita que esta informaci�n sensible se suba a repositorios p�blicos.

.gitignore:   Esencial para mantener el repositorio limpio y seguro. Le dice a Git que ignore la carpeta node_modules (que puede ser muy pesada) y el archivo .env.

C�digo Fuente (/src/)

app.js:  Punto de Entrada Principal. Este archivo crea el servidor Express, configura los middlewares globales (como cors para permitir peticiones de otros dominios y body-parser para entender JSON), monta las diferentes rutas de la API y define los manejadores de errores generales (como el error 404 para rutas no encontradas). Es el orquestador principal de la aplicaci�n.

Capa de Configuraci�n (/src/config/)

firebase.config.js: Su �nica responsabilidad es inicializar la conexi�n con Firebase. Lee las credenciales del archivo .env y exporta la instancia de la base de datos (db), que ser� utilizada por los modelos para interactuar con Firestore.

Capa de Rutas (/src/routes/)

products.routes.js y auth.routes.js: Definen los Endpoints de la API. Act�an como una tabla de contenidos para la API. Cada archivo asocia una URL y un m�todo HTTP (ej: GET /api/products/:id) con una funci�n espec�fica del controlador. Tambi�n es donde se aplica el middleware de autenticaci�n a las rutas que necesitan ser protegidas.

Capa de Controladores (/src/controllers/)

product.controller.js y auth.controller.js: Manejan las Peticiones y Respuestas. Son el puente entre el mundo exterior (HTTP) y la l�gica de la aplicaci�n. Extraen datos de la petici�n (req.params, req.body), llaman a los servicios correspondientes para procesar la solicitud y, finalmente, env�an una respuesta al cliente con el c�digo de estado apropiado (200, 201, 404, etc.) y los datos en formato JSON.

Capa de Middlewares (/src/middlewares/)

auth.middleware.js: El Guardia de Seguridad de la API. Es una funci�n que se ejecuta antes que el controlador en las rutas protegidas. Su trabajo es verificar la validez del token JWT que viene en la cabecera de la petici�n. Si el token es v�lido, permite que la petici�n contin�e hacia el controlador; si no, la detiene y devuelve un error de autenticaci�n (401 o 403).

Capa de Servicios (/src/services/)

product.service.js y auth.service.js: Contienen la L�gica de Negocio. Esta capa es el cerebro de la aplicaci�n. Los controladores le delegan el trabajo "real". Los servicios orquestan las operaciones, realizan validaciones de negocio (m�s complejas que las del controlador) y llaman a los modelos para acceder a los datos. Por ejemplo, el auth.service.js valida las credenciales y genera el token; el product.service.js se asegura de que un producto exista antes de intentar actualizarlo.

Capa de Modelos (/src/models/)

product.model.firestore.js: Capa de Acceso a Datos (DAL). Es la �nica capa que tiene permitido hablar directamente con la base de datos. Contiene todas las funciones CRUD (getAll, getById, create, update, delete) que ejecutan las operaciones correspondientes en la colecci�n products de Firestore. Abstrae la complejidad de las consultas a la base de datos del resto de la aplicaci�n.

    M�todo,   Ruta ,      Descripci�n ,    Acceso :  
*   POST   /auth/login   Autentica a un usuario y devuelve un token.   P�blico.  
*   GET    /api/products   Obtiene todos los productos.   P�blico.  
*   GET    /api/products/:id   Obtiene un producto por su ID.   P�blico.  
*   POST   /api/products   Crea un nuevo producto.   Protegido (Requiere Token)  .
*   PATCH  /api/products/:id   Actualiza un producto existente.   Protegido (Requiere Token).  
*   DELETE /api/products/:id   Elimina un producto.   Protegido (Requiere Token).  

C�mo Subir y Actualizar el Proyecto en GitHub

Esta secci�n describe brevemente los comandos para versionar el c�digo de este proyecto usando Git y para subirlo a un repositorio remoto en GitHub.
Requisitos Previos:  Tener Git instalado en tu sistema y  una cuenta en GitHub.

Paso 1.1: Inicializar el Repositorio Local
Navegar a la carpeta ra�z del proyecto en la terminal y ejecuta:

git init           //   Este comando crea un nuevo repositorio de Git en tu proyecto.

git remote add origin https://github.com/tu-usuario/tu-repositorio.git      //  Este comando establece un "control remoto" llamado origin que apunta a tu repositorio en GitHub.

git remote �v     //  Para visualizar la URL del repositorio listada para fetch y push.

git status  //  Para ver los archivos modificados

git add .   // Para agregar  todos los archivos modificados al "�rea de preparaci�n" (Staging Area). El . representa todos los archivos y carpetas.

git commit -m  "Para incorporar nuevas rutas de productos" // Crea una "foto instant�nea" (un commit) de los cambios m�s una despcripci�n.

git push origin main    //  Para enviar  todos los commits  desde tu computadora local al repositorio GitHub.  Si el repositorio en GitHub  tuviera cambios que no existen en el repositorio local, Git no  dejar� usar git push directamente, dado que antes es necesario sincronizar.
git pull origin main �rebase. Para descargar e integrar los cambios en Github al repositorio local; el repositorio local quedar� actualizado a nivel del remoto en GitHub.


En esta aplicaci�n Fullstack se ha implementado la siguiente cadena de eventos:

  *   Frontend (Static Site en Render): Se carg� correctamente en el navegador desde la URL p�blica:   https://frontend-proyecto-final-ecommerce-api.onrender.com/
  *   Login: Se enviaron las  credenciales del usuario desde el frontend.
  *   Comunicaci�n Frontend -> Backend: La petici�n fetch viaj� por internet desde la URL del frontend hasta la URL del backend en Render: https://backend-proyecto-final-ecommerce-api.onrender.com/
  *   Recepci�n del Backend (Web Service en Render): La API de Node.js, corriendo en la nube, recibi� la petici�n.
  *   Variables de Entorno: La API en Render ley� correctamente las variables de entorno que se configuraron, incluyendo las de Firebase y la JWT_SECRET_KEY.
  *   Autenticaci�n: El servicio de autenticaci�n valid� las credenciales y gener� un token JWT (con la duraci�n establecida).
  *   Respuesta del Backend -> Frontend: El token fue enviado de vuelta al navegador.
  *   Manejo del Token: El JavaScript del navegador guard� el token en localStorage.
  *   Petici�n Protegida: Al crear un nuevo producto, el frontend envi� una petici�n POST incluyendo el token en la cabecera Authorization.
  *   Middleware de Seguridad: El authMiddleware en el backend intercept� la petici�n, verific� que el token era v�lido y que no hab�a expirado, y le dio paso a la ruta.
  *   L�gica del CRUD: El controlador, servicio y modelo hicieron su trabajo, creando un nuevo documento en la base de datos de Firestore.
  *   Actualizaci�n de la User Interfase: El frontend recibi� la respuesta de �xito y actualiz� la lista de productos en tiempo real.
Se ha construido y desplegado una aplicaci�n Full-Stack completa. 


Resumen del Frontend: Gestor de Productos:
Este frontend es una Aplicaci�n de Una Sola P�gina (Single Page Application - SPA) desarrollada con HTML, CSS y JavaScript puro (Vanilla JS). Su prop�sito es consumir la API RESTful del backend para proporcionar una interfaz gr�fica de usuario (GUI) que permita a los usuarios visualizar, crear, editar y eliminar productos de la tienda, as� como gestionar su sesi�n mediante un sistema de autenticaci�n.

Estructura de Archivos del Frontend
El c�digo del frontend reside en la carpeta public y est� organizado de la siguiente manera:

public/
�
+-- index.html            # La estructura principal y el esqueleto de la aplicaci�n.
+-- styles.css            # Hoja de estilos para la apariencia visual y el dise�o.
+-- js/                   # Carpeta que contiene toda la l�gica de la aplicaci�n.
    �
    +-- api.js            # M�dulo de comunicaci�n: maneja todas las peticiones a la API del backend.
    +-- ui.js             # M�dulo de interfaz: controla la manipulaci�n del DOM (lo que el usuario ve).
    +-- main.js           # M�dulo principal: orquesta la aplicaci�n, maneja el estado y los eventos.


index.html
 Es la base de toda la aplicaci�n. Contiene la estructura sem�ntica de todos los elementos visuales, como el encabezado, el �rea de visualizaci�n de productos, los formularios y el modal para la creaci�n/edici�n.
Importancia: Define todos los id y class que los archivos JavaScript utilizan para seleccionar y manipular elementos del DOM. Tambi�n es responsable de cargar la hoja de estilos (styles.css) y el punto de entrada de JavaScript (main.js), utilizando el atributo type="module" para habilitar la sintaxis de m�dulos de ES6 (import/export).

styles.css
 Proporciona la capa de presentaci�n visual de la aplicaci�n. Define los colores, fuentes, espaciados, dise�o de la cuadr�cula de productos y la apariencia del modal.
Importancia: Separa completamente el estilo de la estructura (HTML) y la l�gica (JS), siguiendo las mejores pr�cticas del desarrollo web. Hace que la aplicaci�n sea intuitiva y agradable a la vista.

Carpeta /js
Esta carpeta contiene el cerebro de la aplicaci�n, dividido en tres m�dulos especializados:

js/api.js - La Capa de Datos (Comunicador)
Responsabilidad: Contiene todas las funciones async/await que realizan peticiones fetch al backend. Cada funci�n (ej: getProducts, login, createProduct) se corresponde con un endpoint de la API.
Importancia: Centraliza toda la l�gica de comunicaci�n con el servidor en un solo lugar. Si la URL del backend cambia, solo necesita ser modificada en este archivo. Tambi�n maneja la inclusi�n del token de autorizaci�n en las cabeceras de las peticiones protegidas.

js/ui.js - La Capa de Vista (Manipulador del DOM)
Responsabilidad: Contiene funciones dedicadas a manipular directamente la interfaz de usuario. Por ejemplo, renderProducts() crea las tarjetas de los productos y las inserta en el HTML, updateAuthUI() muestra u oculta elementos dependiendo del estado de autenticaci�n del usuario, y showModal()/hideModal() controlan la visibilidad del formulario emergente.
Importancia: Abstrae la manipulaci�n del DOM del resto de la l�gica. Si se decide cambiar c�mo se muestra la lista de productos (por ejemplo, de una cuadr�cula a una lista), solo habr�a que modificar la funci�n renderProducts() en este archivo.

js/main.js - El Orquestador (Controlador Principal)
Responsabilidad: Es el punto de entrada y el director de orquesta del frontend.
Maneja el Estado: Mantiene variables clave como la lista actual de productos y el token de autenticaci�n.
Asigna Eventos: Utiliza addEventListener para "escuchar" las acciones del usuario (clics en botones, env�os de formularios) y asociarlas con las funciones correspondientes (ej: handleLogin, handleProductFormSubmit).
Coordina los M�dulos: Cuando ocurre un evento, main.js llama a las funciones apropiadas de api.js para obtener o enviar datos y, una vez que tiene una respuesta, llama a las funciones de ui.js para actualizar la pantalla.
Importancia: Conecta todas las piezas y define el flujo l�gico de la aplicaci�n desde la perspectiva del usuario. Gestiona el ciclo de vida de la aplicaci�n, desde la carga inicial de datos hasta la interacci�n del usuario.

�Un gran paso para Vincenzo! (aunque no lo sea para la humanidad).

Autor:   Vincenzo Natale,  vnatale52@gmail.com,   Curso:  Back-End / Node JS, TT Adultos - 1C 2025
