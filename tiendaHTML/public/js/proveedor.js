var url = "http://localhost:3000/api/v1/proveedor";

$().ready(() => {
    cargatabla();
});
var cargatabla = () => {
    var html = "";
    $.get(url, (proveedor) => {

        $.each(proveedor, (proveedor, val) => {
            html += "<tr>" + "<td>" + (
                proveedor + 1
            ) + "</td>" + "<td>" + val.nombre + "</td>" + "<td>" + val.telefono + "</td>" + "<td>" + val.email + "<td>" + val.direccion + "</td>" + "</td>" + "<td>" + "<button class='btn btn-success' onclick=uno('" + val._id + "')>Editar</button>" + "<button class='btn btn-danger' onclick=eliminar('" + val._id + "')>Eliminar</button>" + "</td>" + "</tr>";
        });
        $('#cuerpoproveedor').html(html);
    });
}

var eliminar = (id) => {
    Swal.fire({
        title: 'Proveedor',
        text: "Esta seguro de eliminar al Pasajero!",
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
                    Swal.fire('Proveedor',  mensaje.msg, 'success')
                }

            });
            
        }
    })
}
var guardaryEditar = () => {
    var nombre = document.getElementById('nombre').value;
    var telefono = document.getElementById('telefono').value;
    var email = $('#email').val();
    var direccion = $('#direccion').val();
    var id = document.getElementById('_id').value;
    if (id != '') { // TODO:Editar Pasajero
        var tipoEnvio = "PUT";
        var PasajeroDTO = {
            _id: id,
            nombre: nombre,
            telefono: telefono,
            email: email,
            direccion: direccion
        }
        url = url + "/" + id;
    } else { // TODO:Nuevo pasajero
        var tipoEnvio = "POST";
        var PasajeroDTO = {
            nombre: nombre,
            telefono: telefono,
            email: email,
            direccion: direccion
        }
    }
    $.ajax({
        url: url,
        type: tipoEnvio,
        data: JSON.stringify(PasajeroDTO),
        processData: false,
        cache: false,
        headers: {
            "Content-Type": "application/json"
        },
        success: (IPasajero) => {
            if (IPasajero) {
                alert('Se guardo con exito');
                cargatabla();
                limpiaCajas();
            } else {
                console.log(IPasajero);
                alert('error al guardar');
                limpiaCajas();
            }
        }
    });
}

var uno = (id) => {
    $.get(url + "/" + id, (unPasajero) => {

        if (unPasajero) {
            $('#_id').val(id);
            $('#nombre').val(unPasajero.nombre);
            document.getElementById('usuario').value = unPasajero.pasajero;
            $('#telefono').val(unPasajero.telefono);
            $('#email').val(unPasajero.email);
            $('#direccion').val(unPasajero.direccion);
            $('#idModal').html('Editar Pasajero')
            $('#Modalproveedor').modal('show');
        } else {
            alert('error, no se encuentra al Pasajero');
            console.log(unPasajero);
        }
    })
}


var limpiaCajas = () => {
    $('#_id').val('');
    $('#nombre').val('');
    document.getElementById('Pasajero').value = '';
    $('#email').val('');
    $('#Modalproveedor').modal('hide');
}
