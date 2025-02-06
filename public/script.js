document.getElementById('otpForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const phone = document.getElementById('phone').value;

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
        document.getElementById('otpForm').style.display = 'none';
        document.getElementById('validateForm').style.display = 'block';
        document.getElementById('message').textContent = 'OTP enviado. Revisa tu teléfono.';
    } catch (error) {
        document.getElementById('message').textContent = 'Error al enviar OTP: ' + error.message;
    }
});

document.getElementById('validateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const phone = document.getElementById('phone').value; // Agregar número
    const otp = document.getElementById('otp').value;

    try {
        const response = await fetch('/validar-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone, otp }) // Incluir `phone`
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        const data = await response.json();
        document.getElementById('message').textContent = 'Código OTP válido.';
    } catch (error) {
        document.getElementById('message').textContent = 'Código OTP inválido: ' + error.message;
    }
});
