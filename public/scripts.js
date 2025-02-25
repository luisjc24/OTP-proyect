// Funcionalidad de los botones del Navbar
document.getElementById("cerrarSesion").addEventListener("click", () => {
    window.location.href = "index.html";
});

// Toggle para el panel de Notificaciones
const notificacionesBtn = document.getElementById("notificaciones");
const notificationsPanel = document.getElementById("notificationsPanel");
notificacionesBtn.addEventListener("click", () => {
    notificationsPanel.classList.toggle("active");
});

// Abrir modal de Perfil
const verPerfilBtn = document.getElementById("verPerfil");
const perfilModal = document.getElementById("perfilModal");
const closePerfil = document.getElementById("closePerfil");

verPerfilBtn.addEventListener("click", () => {
    perfilModal.classList.add("active");
});

// Cerrar modal de Perfil
closePerfil.addEventListener("click", () => {
    perfilModal.classList.remove("active");
});

// Cerrar el modal al hacer clic fuera de la ventana de contenido
window.addEventListener("click", (event) => {
    if (event.target === perfilModal) {
        perfilModal.classList.remove("active");
    }
});

// Actualizar el mensaje de bienvenida con el nombre real del usuario.
document.addEventListener("DOMContentLoaded", () => {
    const userName = localStorage.getItem("userName") || "Usuario";
    const welcomeHeader = document.querySelector(".welcome h1");
    welcomeHeader.textContent = `Bienvenido a tu banca, ${userName}`;
});

//Configuracion de la cuenta regresiva
function iniciarCronometro(duracion, display) {
    let tiempo = duracion;
    let intervalo = setInterval(function () {
        let minutos = Math.floor(tiempo / 60);
        let segundos = tiempo % 60;

        display.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

        if (tiempo <= 0) {
            clearInterval(intervalo);
            alert("Su sesión ha expirado.");
            window.location.href = "index.html";
        }
        tiempo--;
    }, 1000);
}

window.onload = function () {
    let tiempoLimite = 5 * 60; // 5 minutos en segundos
    let display = document.getElementById('cronometro');
    iniciarCronometro(tiempoLimite, display);
};

//modales




document.addEventListener("DOMContentLoaded", function () {
    // Modal de configuración de tarjetas
    const modalTarjetas = document.getElementById("modalConfigTarjetas");
    const btnAbrirModal = document.querySelector(".card:nth-child(2)"); // Configurar tarjetas
    const btnCerrarModal = document.getElementById("cerrarModalTarjetas");
    const selectTarjeta = document.getElementById("seleccionarTarjeta");
    const infoTarjeta = document.getElementById("infoTarjeta");
    const estadoTarjeta = document.getElementById("estadoTarjeta");
    const guardarCambios = document.getElementById("guardarCambios");
    const cancelarCambios = document.getElementById("cancelarCambios");

    const tarjetas = {
        "debito": { numTarjeta: "**** **** **** 1234", numCuenta: "123456789012", fecha: "08/2026" },
        "credito-visa": { numTarjeta: "**** **** **** 5678", numCuenta: "987654321098", fecha: "12/2027" },
        "credito-amex": { numTarjeta: "**** **** **** 3456", numCuenta: "567890123456", fecha: "05/2028" }
    };

    // Abrir modal al hacer clic en "Configurar tarjetas"
    btnAbrirModal.addEventListener("click", function () {
        modalTarjetas.style.display = "flex";
    });

    // Cerrar modal
    btnCerrarModal.addEventListener("click", function () {
        modalTarjetas.style.display = "none";
        selectTarjeta.value = "";
        infoTarjeta.style.display = "none";
    });

    // Mostrar información de la tarjeta seleccionada
    selectTarjeta.addEventListener("change", function () {
        const seleccion = selectTarjeta.value;
        if (tarjetas[seleccion]) {
            document.getElementById("numTarjeta").textContent = tarjetas[seleccion].numTarjeta;
            document.getElementById("numCuenta").textContent = tarjetas[seleccion].numCuenta;
            document.getElementById("fechaCaducidad").textContent = tarjetas[seleccion].fecha;
            infoTarjeta.style.display = "block";
        }
    });

    // Alternar estado de la tarjeta
    estadoTarjeta.addEventListener("click", function () {
        if (estadoTarjeta.classList.contains("btn-activada")) {
            estadoTarjeta.classList.remove("btn-activada");
            estadoTarjeta.classList.add("btn-desactivada");
            estadoTarjeta.textContent = "Desactivada";
        } else {
            estadoTarjeta.classList.remove("btn-desactivada");
            estadoTarjeta.classList.add("btn-activada");
            estadoTarjeta.textContent = "Activada";
        }
    });

    // Guardar cambios
    guardarCambios.addEventListener("click", function () {
        alert("Se aplicó correctamente los cambios.");
        modalTarjetas.style.display = "none";
    });

    // Cancelar cambios
    cancelarCambios.addEventListener("click", function () {
        modalTarjetas.style.display = "none";
    });

    // Cerrar modal si se hace clic fuera del contenido
    window.addEventListener("click", function (event) {
        if (event.target === modalTarjetas) {
            modalTarjetas.style.display = "none";
        }
    });

    // Modal de movimientos
    const modalMovimientos = document.getElementById("modalMovimientos");
    const btnAbrirMovimientos = document.getElementById("VerMovimientos");
    const btnCerrarMovimientos = document.getElementById("cerrarModalMovimientos");
    const btnCerrarLista = document.getElementById("cerrarMovimientos");
    const listaMovimientos = document.getElementById("listaMovimientos");

    const movimientos = [
        { nombre: "Yape a ***456", tarjeta: "Tarjeta de Débito MasterCard", fecha: "12/02/2025 17:25", lugar: "Pueblo Libre - Lima", monto: "S/ 50.00" },
        { nombre: "Transferencia hacia ***123", tarjeta: "Tarjeta de Crédito Visa", fecha: "12/02/2025 01:30", lugar: "Huánuco", monto: "S/ 300.00" },
        { nombre: "Pago a Sedapal", tarjeta: "Tarjeta de Débito MasterCard", fecha: "11/02/2025 10:15", lugar: "San Miguel - Lima", monto: "S/ 150.00" },
        { nombre: "Pago a Netflix", tarjeta: "Tarjeta de Crédito AMEX", fecha: "10/02/2025 23:00", lugar: "Surco - Lima", monto: "S/ 44.90" },
        { nombre: "Transferencia desde ***321", tarjeta: "Tarjeta de Débito MasterCard", fecha: "10/02/2025 04:20", lugar: "Arequipa", monto: "$ 120.00" },
        { nombre: "Pago a Claro", tarjeta: "Tarjeta de Crédito Visa", fecha: "09/02/2025 14:45", lugar: "Miraflores - Lima", monto: "S/ 80.00" },
        { nombre: "Pago a propia tarjeta", tarjeta: "Tarjeta de Débito MasterCard", fecha: "08/02/2025 02:00", lugar: "Trujillo", monto: "S/ 200.00" },
        { nombre: "Transferencia hacia ***987", tarjeta: "Tarjeta de Crédito AMEX", fecha: "07/02/2025 18:30", lugar: "San Isidro - Lima", monto: "S/ 500.00" },
        { nombre: "Pago a UNMSM", tarjeta: "Tarjeta de Débito MasterCard", fecha: "06/02/2025 07:30", lugar: "Jesús María - Lima", monto: "S/ 250.00" },
        { nombre: "Yape a ***789", tarjeta: "Tarjeta de Crédito Visa", fecha: "05/02/2025 21:10", lugar: "Callao", monto: "S/ 60.00" }
    ];

    // Determina si el movimiento es sospechoso
    function esSospechoso(fechaHora, lugar) {
        const hora = parseInt(fechaHora.split(" ")[1].split(":")[0]); // Extraer la hora
        return lugar !== "Lima" && (hora >= 0 && hora < 5);
    }

    // Generar la lista de movimientos
    function mostrarMovimientos() {
        listaMovimientos.innerHTML = ""; // Limpiar contenido previo

        movimientos.forEach((movimiento, index) => {
            const sospechoso = esSospechoso(movimiento.fecha, movimiento.lugar);
            const movimientoDiv = document.createElement("div");
            movimientoDiv.classList.add("movimiento-card");

            movimientoDiv.innerHTML = `
                <div class="movimiento-info">
                    <p><strong>${movimiento.nombre}</strong></p>
                    <p>${movimiento.tarjeta}</p>
                    <p>${movimiento.fecha}</p>
                    <p>${movimiento.lugar}</p>
                    <p class="${sospechoso ? 'sospechoso' : 'no-sospechoso'}">
                        ${sospechoso ? "El movimiento es sospechoso" : "El movimiento no es sospechoso"}
                    </p>
                </div>
                <div class="movimiento-monto">
                    ${movimiento.monto}
                    <button class="btn-reportar" data-index="${index}">Reportar</button>
                </div>
            `;

            listaMovimientos.appendChild(movimientoDiv);
        });

        // Agregar evento a los botones de reportar
        document.querySelectorAll(".btn-reportar").forEach((boton) => {
            boton.addEventListener("click", function () {
                alert("El movimiento ha sido reportado con el banco correctamente.");
            });
        });
    }

    // Abrir el modal de movimientos
    btnAbrirMovimientos.addEventListener("click", function () {
        mostrarMovimientos();
        modalMovimientos.style.display = "flex";
    });

    // Cerrar el modal de movimientos
    btnCerrarMovimientos.addEventListener("click", function () {
        modalMovimientos.style.display = "none";
    });

    btnCerrarLista.addEventListener("click", function () {
        modalMovimientos.style.display = "none";
    });


    // Modal de pagar servicios
    const modalServicios = document.getElementById("modalPagarServicios");
    const btnAbrirServicios = document.getElementById("PagarServicios");
    const btnCerrarServicios = document.getElementById("cerrarModalServicios");
    const btnConsultar = document.getElementById("btnConsultar");
    const resultadoConsulta = document.getElementById("resultadoConsulta");
    const seccionPago = document.getElementById("seccionPago");
    const btnHuella = document.getElementById("btnHuella");
    const btnConfirmarPago = document.getElementById("btnConfirmarPago");
    const btnCerrar = document.getElementById("btnCerrar");

    let huellaValidada = false;

    const deudasSimuladas = {
        "Luz": 0, // Sin deuda
        "Agua": Math.floor(Math.random() * (500 - 30 + 1) + 30),
        "Telefonía": Math.floor(Math.random() * (500 - 30 + 1) + 30),
        "Cable": Math.floor(Math.random() * (500 - 30 + 1) + 30),
        "Universidades": Math.floor(Math.random() * (500 - 30 + 1) + 30),
        "Institutos": Math.floor(Math.random() * (500 - 30 + 1) + 30),
        "Streaming": Math.floor(Math.random() * (500 - 30 + 1) + 30)
    };

    btnAbrirServicios.addEventListener("click", () => {
        modalServicios.style.display = "flex";
        resultadoConsulta.innerHTML = "";
        seccionPago.style.display = "none";
        btnCerrar.style.display = "none";
    });

    btnCerrarServicios.addEventListener("click", () => {
        modalServicios.style.display = "none";
    });

    btnCerrar.addEventListener("click", () => {
        modalServicios.style.display = "none";
    });

    btnConsultar.addEventListener("click", () => {
        const servicio = document.getElementById("selectServicio").value;
        const codigoCliente = document.getElementById("codigoCliente").value;

        if (!codigoCliente) {
            alert("Ingrese un código de cliente válido.");
            return;
        }

        const deuda = deudasSimuladas[servicio];

        if (deuda === 0) {
            resultadoConsulta.innerHTML = `<p class="exito">Usted está al día en sus pagos.</p>
                                           <button id="btnAceptar" class="btn-cerrar">Aceptar</button>`;
            document.getElementById("btnAceptar").addEventListener("click", () => {
                modalServicios.style.display = "none";
            });
        } else {
            resultadoConsulta.innerHTML = `<p class="deuda">Usted tiene una deuda de S/ ${deuda}. 
                                           Esta deuda expira el 28/02/2025.</p>
                                           <button id="btnPagar">Pagar</button>
                                           <button id="btnCerrarDeuda" class="btn-cerrar">Cerrar</button>`;

            document.getElementById("btnCerrarDeuda").addEventListener("click", () => {
                modalServicios.style.display = "none";
            });

            document.getElementById("btnPagar").addEventListener("click", () => {
                seccionPago.style.display = "block";
            });
        }
    });

    btnHuella.addEventListener("click", () => {
        huellaValidada = !huellaValidada;
        btnHuella.style.backgroundColor = huellaValidada ? "green" : "#dc3545";
    });

    btnConfirmarPago.addEventListener("click", () => {
        if (huellaValidada) {
            alert("Pago exitoso.");
            modalServicios.style.display = "none";
        } else {
            alert("No se pudo validar su huella.");
            modalServicios.style.display = "none";
        }
    });

    
        // Modal de Realizar Transacciones
        const modalTransacciones = document.getElementById("modalRealizarTransacciones");
        const btnAbrirTransacciones = document.getElementById("RealizarTransacciones");
        const btnCerrarTransacciones = document.getElementById("cerrarModalTransacciones");
        const btnCerrarTransaccion = document.getElementById("btnCerrarTransaccion");
        const btnHuellaTransaccion = document.getElementById("btnHuellaTransaccion");
        const btnConfirmarTransaccion = document.getElementById("btnConfirmarTransaccion");
        const resultadoTransaccion = document.getElementById("resultadoTransaccion");

        let huellaValidadaTransaccion = false; // Cambio de nombre de la variable

        // Abrir modal al hacer clic en "Realizar Transacciones"
        btnAbrirTransacciones.addEventListener("click", function () {
            modalTransacciones.style.display = "flex";
            resultadoTransaccion.innerHTML = "";
            btnCerrarTransaccion.style.display = "none";
            huellaValidadaTransaccion = false; // Reiniciar la validación de la huella
            btnHuellaTransaccion.style.backgroundColor = "#dc3545"; // Reiniciar el color del botón
        });

        // Cerrar modal
        btnCerrarTransacciones.addEventListener("click", function () {
            modalTransacciones.style.display = "none";
        });

        btnCerrarTransaccion.addEventListener("click", function () {
            modalTransacciones.style.display = "none";
        });

        // Validar huella digital
        btnHuellaTransaccion.addEventListener("click", function () {
            huellaValidadaTransaccion = !huellaValidadaTransaccion; // Cambio de nombre de la variable
            btnHuellaTransaccion.style.backgroundColor = huellaValidadaTransaccion ? "green" : "#dc3545";
        });

        // Confirmar transacción
        btnConfirmarTransaccion.addEventListener("click", function () {
            const cuentaDestino = document.getElementById("cuentaDestino").value;
            const monto = document.getElementById("monto").value;

            // Validaciones
            if (cuentaDestino.length !== 16 || !/^\d+$/.test(cuentaDestino)) {
                resultadoTransaccion.innerHTML = `<p class="error-transaccion">La cuenta destino debe tener 16 dígitos numéricos.</p>`;
                return;
            }

            if (!/^\d{1,4}(\.\d{2})?$/.test(monto)) {
                resultadoTransaccion.innerHTML = `<p class="error-transaccion">El monto debe tener hasta 4 dígitos enteros y 2 decimales opcionales.</p>`;
                return;
            }

            if (!huellaValidadaTransaccion) {
                resultadoTransaccion.innerHTML = `<p class="error-transaccion">Valide su huella digital para continuar.</p>`;
                return;
            }

            // Si todo está correcto
            resultadoTransaccion.innerHTML = `<p class="exito-transaccion">Se realizó la transacción exitosamente.</p>`;
            btnCerrarTransaccion.style.display = "block";
        });


});