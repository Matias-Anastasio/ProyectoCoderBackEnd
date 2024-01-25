# Tercer desafio
<h2 align="center">Servidor Express</h1>
<div><p>Desarrollar un servidor basado en express donde podamos hacer consultas a nuestro archivo de productos.</p><br/>
<p>EI servidor debe contar con los siguientes endpoints:</p>
<ul>
  <li>ruta '/products', la cual debe leer el archivo de productos y devolverlos dentro de un objeto. Agregar el soporte para recibir por query param el valor ?limit= el cual recibirá un límite de resultados.Si no se recibe query de límite, se devolverán todos los roductos. Si se recibe un límite, sólo devolver el número de roductos solicitados</li>
  <li>ruta '/products/:pid', la cual debe recibir por req.params el pid (product Id), y devolver sólo el producto solicitado, en lugar de todos los productos.</li>
</ul><br/>
</div>
