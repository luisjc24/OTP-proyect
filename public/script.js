document.addEventListener('DOMContentLoaded', () => {
    // Variables de estado
    let password = "";
    const user="Luis"
    const correctPassword = "123456";
    let loginValidated = false;
    let otpValidated = false;
    let fingerprintValidated = false;
    const correctOTP = "1234"; // Para fines prácticos

    // Elementos del DOM
    const keypadContainer = document.getElementById("keypad");
    const passwordDisplay = document.getElementById("passwordDisplay");
    const backspaceButton = document.getElementById("backspace");
    const clearButton = document.getElementById("clear");
    const validateLoginBtn = document.getElementById("validateLogin");
    const loginMessage = document.getElementById("loginMessage");

    const otpFactor = document.getElementById("otp-factor");
    const sendOTPBtn = document.getElementById("sendOTP");
    const otpInputSection = document.getElementById("otp-input-section");
    const validateOTPBt = document.getElementById("validateOTP");
    const otpMessage = document.getElementById("otpMessage");

    const fingerprintFactor = document.getElementById("fingerprint-factor");
    const validateFingerprintBtn = document.getElementById("validateFingerprint");
    const fingerprintMessage = document.getElementById("fingerprintMessage");

    const finalIngresarBtn = document.getElementById("finalIngresar");
    const finalMessage = document.getElementById("finalMessage");

    const homeContainer = document.getElementById("home-container");
    const loginContainer = document.getElementById("login-container");

    // Función para generar dígitos aleatorios (0-9) para el teclado
    function generateRandomDigits() {
        const digits = Array.from({ length: 10 }, (_, i) => i);
        for (let i = digits.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [digits[i], digits[j]] = [digits[j], digits[i]];
        }
        return digits;
    }

    // Renderiza el teclado numérico
    function renderKeypad() {
        keypadContainer.innerHTML = "";
        const digits = generateRandomDigits();
        digits.forEach(digit => {
            const btn = document.createElement("button");
            btn.textContent = digit;
            btn.addEventListener("click", () => {
                if (password.length < 6) {
                    password += digit;
                    // Se muestra asteriscos para enmascarar la contraseña
                    passwordDisplay.value = "*".repeat(password.length);
                }
            });
            keypadContainer.appendChild(btn);
        });
    }
    renderKeypad();

    // Borrar el último dígito
    backspaceButton.addEventListener("click", () => {
        password = password.slice(0, -1);
        passwordDisplay.value = "*".repeat(password.length);
    });

    // Borrar todos los dígitos
    clearButton.addEventListener("click", () => {
        password = "";
        passwordDisplay.value = "";
    });

    // Validar Factor 1: Usuario y Contraseña
    validateLoginBtn.addEventListener("click", () => {
        const username = document.getElementById("username").value.trim();
        if (!username) {
            loginMessage.textContent = "Por favor, ingrese su usuario.";
            loginMessage.className = "error";
            return;
        }
        if (username !== user) {
            loginMessage.textContent = "Usuario incorrecto.";
            loginMessage.className = "error";
            return;
        }
        if (password === correctPassword) {
            loginValidated = true;
            loginMessage.textContent = "Los datos son correctos ✓";
            loginMessage.className = "success";
            localStorage.setItem("userName", username);
            // Mostrar el factor OTP
            otpFactor.style.display = "block";
        } else {
            loginMessage.textContent = "Contraseña incorrecta.";
            loginMessage.className = "error";
        }
        updateFinalButton();
    });

// Factor 2: OTP

// Enviar OTP
    sendOTPBtn.addEventListener("click", async () => {
        const phone = document.getElementById("phone").value.trim();
        if (!phone) {
            otpMessage.textContent = "Por favor, ingrese su número de celular.";
            otpMessage.className = "error";
            return;
        }
        try {
            const response = await fetch('/enviar-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone })
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }
            const data = await response.json();
            otpInputSection.style.display = "block"; // Muestra la sección para ingresar el OTP
            otpMessage.textContent = "OTP enviado. Revisa tu teléfono.";
            otpMessage.className = "success";
        } catch (error) {
            otpMessage.textContent = "Error al enviar OTP: " + error.message;
            otpMessage.className = "error";
        }
    });


// Validar OTP
   validateOTPBt.addEventListener("click", async () => {
        const phone = document.getElementById('phone').value.trim();
        const otp = document.getElementById('otp').value.trim();
        if (!otp) {
            otpMessage.textContent = "Por favor, ingrese el código OTP.";
            otpMessage.className = "error";
            return;
        }
        try {
            const response = await fetch('/validar-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, otp })
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }
            const data = await response.json();
            otpMessage.textContent = "Código OTP válido.";
            otpMessage.className = "success";
            otpValidated = true;
            fingerprintFactor.style.display = "block";
            updateFinalButton();
        } catch (error) {
            otpMessage.textContent = "Código OTP inválido: " + otp+phone;
            otpMessage.className = "error";
            otpValidated = false;
        }
    });


    validateOTPBt.addEventListener("click", () => {
        const otpInput = document.getElementById("otp").value.trim();

            otpValidated = true;
            otpMessage.textContent = "Código OTP validado ✓";
            otpMessage.className = "success";
            // Mostrar el factor de huella digital
            fingerprintFactor.style.display = "block";
        
        updateFinalButton();
    });

    // Factor 3: Huella Digital
    validateFingerprintBtn.addEventListener("click", () => {
        // Para fines prácticos, se valida siempre que se presiona el botón.
        fingerprintValidated = true;
        fingerprintMessage.textContent = "Huella digital correcta ✓";
        fingerprintMessage.className = "success";
        updateFinalButton();
    });

    // Botón final "Ingresar"
    // Botón final "Ingresar"
    finalIngresarBtn.addEventListener("click", () => {
        console.log("Estado de validaciones:", loginValidated, otpValidated, fingerprintValidated);
        if (loginValidated && otpValidated && fingerprintValidated) {
            window.location.href = "home.html";
        } else {
            finalMessage.textContent = "Por favor, corrija los datos ingresados.";
            finalMessage.className = "error";
        }
    });

// Actualiza el estilo del botón final según el estado de validación
    function updateFinalButton() {
        console.log("Estado de validaciones:", loginValidated, otpValidated, fingerprintValidated);
        if (loginValidated && otpValidated && fingerprintValidated) {
            finalIngresarBtn.classList.remove("disabled");
            finalIngresarBtn.removeAttribute("disabled");  // Se remueve el atributo "disabled"
            finalIngresarBtn.style.backgroundColor = "#28a745";
        } else {
            finalIngresarBtn.classList.add("disabled");
            finalIngresarBtn.setAttribute("disabled", "disabled");  // Se añade el atributo "disabled"
            finalIngresarBtn.style.backgroundColor = "#dc3545";
        }
    }

// Actualiza inicialmente el estado del botón final
    updateFinalButton();

});

