require('dotenv').config();
const express = require('express');
const twilioClient = require('./twilioConfig');

const app = express();
app.use(express.json());
app.use(express.static('public'));

let otpStorage = {}; // Almacenar OTPs por número de teléfono
const OTP_EXPIRATION_TIME = 5 * 60 * 1000; // 5 minutos

// ✅ Ruta corregida
app.post('/enviar-otp', (req, res) => {
    const { phone } = req.body;
    if (!phone || typeof phone !== 'string') {
        return res.status(400).json({ message: 'Número de teléfono inválido' });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    otpStorage[phone] = { otp, timestamp: Date.now() };

    twilioClient.messages.create({
        body: `Tu código OTP es: ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone
    })
        .then(() => res.json({ message: 'OTP enviado' }))
        .catch((error) => res.status(500).json({ message: 'Error enviando OTP', error }));
});

// ✅ Ruta corregida
app.post('/validar-otp', (req, res) => {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
        return res.status(400).json({ message: 'Faltan datos' });
    }

    const storedOtp = otpStorage[phone];
    if (!storedOtp) {
        return res.status(400).json({ message: 'Código OTP no encontrado' });
    }

    const isExpired = Date.now() - storedOtp.timestamp > OTP_EXPIRATION_TIME;
    if (isExpired) {
        delete otpStorage[phone];
        return res.status(400).json({ message: 'Código OTP expirado' });
    }

    if (otp === storedOtp.otp) {
        delete otpStorage[phone]; // Eliminar OTP tras validación
        return res.json({ message: 'Código OTP válido' });
    } else {
        return res.status(400).json({ message: 'Código OTP inválido' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
