var url = "http://localhost:3000/api/v1/prodctos";

$().ready(() => {
    cargatabla();
});
var cargatabla = () => {
    var html = "";
    $.get(url, (productos) => {

        $.each(productos, (productos, val) => {
            html += "<tr>" + "<td>" + (
                productos + 1
            ) + "</td>" + "<td>" + val.nombre + "</td>" + "<td>" + val.fechaingreso + "</td>" + "<td>" + val.cantidad + "</td>" +  "<td>" + val.disponible + "</td>"  + "<td>" + val.proveedor + "</td>" + "<td>" + "<button class='btn btn-success' onclick=uno('" + val._id + "')>Editar</button>" + "<button class='btn btn-danger' onclick=eliminar('" + val._id + "')>Eliminar</button>" + "</td>" + "</tr>";
        });
        $('#cuerpoProducto').html(html);
    });
}

var eliminar = (id) => {
    Swal.fire({
        title: 'Productos',
        text: "Esta seguro de eliminar al producto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Eliminar'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: url + '/' + id,
                type: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                success:(mensaje)=>{
                   cargatabla();
                   limpiaCajas();
                    Swal.fire('Productos',  mensaje.msg, 'success')
                }

            });
            
        }
    })
}
var guardaryEditar = () => {
    var nombre = document.getElementById('nombre').value;
    var fechaingreso = document.getElementById('producto').value;
    var cantidad = $('#cantidad').val();
    var disponible = $('#disponible').val();
    var proveedor = $('#proveedor').val();
    var id = document.getElementById('_id').value;
    if (id != '') { // TODO:Editar Producto
        var tipoEnvio = "PUT";
        var ProductoDTO = {
            _id: id,
            nombre: nombre,
            fechaingreso: fechaingreso,
            cantidad: cantidad,
            disponible: disponible,
            proveedor: proveedor
        }
        url = url + "/" + id;
    } else { // TODO:Nuevo Producto
        var tipoEnvio = "POST";
        var ProductoDTO = {
            nombre: nombre,
            fechaingreso: fechaingreso,
            cantidad: cantidad,
            disponible: disponible,
            proveedor: proveedor
        }
    }
    $.ajax({
        url: url,
        type: tipoEnvio,
        data: JSON.stringify(ProductoDTO),
        processData: false,
        cache: false,
        headers: {
            "Content-Type": "application/json"
        },
        success: (IProducto) => {
            if (IProducto) {
                alert('Se guardo con exito');
                cargatabla();
                limpiaCajas();
            } else {
                console.log(IProducto);
                alert('error al guardar');
                limpiaCajas();
            }
        }
    });
}

var uno = (id) => {
    $.get(url + "/" + id, (unProducto) => {

        if (unProducto) {
            $('#_id').val(id);
            $('#nombre').val(unProducto.nombre);
            document.getElementById('producto').value = unProducto.producto;
            $('#fechaingreso').val(unProducto.fechaingreso);
            $('#cantidad').val(unProducto.cantidad);
            $('#disponible').val(unProducto.disponible);
            $('#idModal').html('Editar Producto')
            $('#ModalProducto').modal('show');
        } else {
            alert('error, no se encuentra al Producto');
            console.log(unProducto);
        }
    })
}


var limpiaCajas = () => {
    $('#_id').val('');
    $('#nombre').val('');
    document.getElementById('producto').value = '';
    $('#email').val('');
    $('#password').val('');
    $('#ModalProducto').modal('hide');
}
