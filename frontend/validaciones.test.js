function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarTelefono(tel) {
  return /^\d{7,}$/.test(tel.replace(/[\s\-\+]/g, ''));
}

function validarCamposObligatorios(campos) {
  return Object.values(campos).every(v => v !== '' && v !== null && v !== undefined);
}

// PU-01
test('PU-01: Email inválido es rechazado', () => {
  expect(validarEmail('carlos@@gmail')).toBe(false);
  expect(validarEmail('sinArroba')).toBe(false);
  expect(validarEmail('test@correo.com')).toBe(true);
});

// PU-02
test('PU-02: Campos vacíos bloquean el avance', () => {
  expect(validarCamposObligatorios({ nombre: '', email: 'a@b.com' })).toBe(false);
  expect(validarCamposObligatorios({ nombre: 'Ana', email: 'a@b.com' })).toBe(true);
});

// PU-03
test('PU-03: Teléfono inválido es rechazado', () => {
  expect(validarTelefono('abc123')).toBe(false);
  expect(validarTelefono('123')).toBe(false);
  expect(validarTelefono('+573001234567')).toBe(true);
});