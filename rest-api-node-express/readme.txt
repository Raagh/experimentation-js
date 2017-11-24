API REST hecha con node.js 6.11.0 y express.js
La misma cuenta de 4 endpoints dentro de la ruta /api:

/getClientDataById - el cual recibe el userId (id del usuario solicitante) y el clientId (id del cliente que se necesita información).Devuelve el cliente.
/getClientDataByName - el cual recibe el userId (id del usuario solicitante) y el clientName (nombre del cliente que se necesita información). Devuelve el cliente.
/getClientByPolicyNumber - el cual recibe el userId (id del usuario solicitante) y un policyId (id de la póliza de seguro relacionada al cliente que se necesita información). Devuelve el cliente.
/getPoliciesByClientName - el cual recibe el userId (id del usuario solicitante) y un clientName (Nombre del cliente que se necesita información). Devuelve las pólizas asociadas al clientName.

Consideraciones: Asumí que la persona que solicitaba la información y el cliente eran distintas (en una situación real la información del usuario y de los clientes estaría en 2 servicios separados).
Si lo que se esperaba es que la información solicitada se refiere a la persona que hace la consulta entonces no había la necesidad de consultar el servicio de clientes 2 veces (una para traer el rol y otra para hacer la consulta). 
Directamente se chequeaba el rol al momento de hacer la consulta.
