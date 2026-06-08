const SUPABASE_URL = 'https://qfbhyzynpyqqcpuuibod.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_d3Qth9SGoV8k8AwQw0hJtA_-faBod7E';
const TABLE_NAME = 'eccia_inscritos';

const form = document.querySelector('#registration-form');
const feedback = document.querySelector('#form-feedback');
const submitButton = document.querySelector('#submit-button');

const validators = {
  nombres: value => validateText(value, 2, 120, 'Ingresá tus nombres.'),
  apellidos: value => validateText(value, 2, 120, 'Ingresá tus apellidos.'),
  cedula_dni: value => validateText(value, 5, 40, 'Ingresá una cédula o DNI válido.'),
  edad: value => {
    const age = Number(value);
    if (!Number.isInteger(age) || age < 12 || age > 100) {
      return 'La edad debe estar entre 12 y 100 años.';
    }
    return '';
  },
  pais: value => validateText(value, 2, 80, 'Ingresá el país.'),
  ciudad: value => validateText(value, 2, 100, 'Ingresá la ciudad.'),
  direccion: value => validateText(value, 5, 220, 'Ingresá la dirección.'),
  celular: value => {
    const normalized = value.trim();
    if (normalized.length < 7 || normalized.length > 30) {
      return 'Ingresá un celular válido.';
    }
    if (!/^[0-9+()\s.-]+$/.test(normalized)) {
      return 'El celular solo debe contener números y signos telefónicos.';
    }
    return '';
  },
  correo: value => {
    const normalized = value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(normalized)) {
      return 'Ingresá un correo válido.';
    }
    return '';
  },
  empleador: value => {
    const normalized = value.trim();
    if (normalized.length > 0 && (normalized.length < 2 || normalized.length > 160)) {
      return 'El empleador debe tener entre 2 y 160 caracteres.';
    }
    return '';
  },
};

form.addEventListener('submit', async event => {
  event.preventDefault();
  clearFeedback();

  const formData = new FormData(form);
  const payload = {
    nombres: clean(formData.get('nombres')),
    apellidos: clean(formData.get('apellidos')),
    cedula_dni: clean(formData.get('cedula_dni')),
    edad: Number(formData.get('edad')),
    pais: clean(formData.get('pais')),
    ciudad: clean(formData.get('ciudad')),
    direccion: clean(formData.get('direccion')),
    celular: clean(formData.get('celular')),
    correo: clean(formData.get('correo')).toLowerCase(),
    empleador: clean(formData.get('empleador')) || null,
  };

  if (!validatePayload(payload)) {
    showFeedback('Revisá los campos marcados antes de registrar la inscripción.', 'error');
    return;
  }

  setSubmitting(true);

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));

      if (error.code === '23505') {
        showFeedback('Ya existe una inscripción registrada con esa Cédula/DNI.', 'error');
        return;
      }

      throw new Error(error.message || 'No se pudo registrar la inscripción.');
    }

    form.reset();
    showFeedback('Inscripción registrada correctamente. Buenísimo, ya quedó cargada en el catálogo ECCIA.', 'success');
  } catch (error) {
    showFeedback(`No se pudo registrar la inscripción. ${error.message}`, 'error');
  } finally {
    setSubmitting(false);
  }
});

form.addEventListener('input', event => {
  const field = event.target;
  if (!(field instanceof HTMLInputElement)) return;
  validateField(field.name, field.value);
});

function validatePayload(payload) {
  return Object.entries(validators).every(([fieldName, validator]) => {
    const error = validator(payload[fieldName] ?? '');
    renderFieldError(fieldName, error);
    return !error;
  });
}

function validateField(fieldName, value) {
  const validator = validators[fieldName];
  if (!validator) return;
  renderFieldError(fieldName, validator(value));
}

function validateText(value, min, max, message) {
  const normalized = String(value ?? '').trim();
  if (normalized.length < min || normalized.length > max) {
    return message;
  }
  return '';
}

function renderFieldError(fieldName, message) {
  const input = document.querySelector(`[name="${fieldName}"]`);
  const error = document.querySelector(`[data-error-for="${fieldName}"]`);

  if (input) {
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  if (error) {
    error.textContent = message;
  }
}

function clean(value) {
  return String(value ?? '').trim().replace(/\s+/g, ' ');
}

function setSubmitting(isSubmitting) {
  submitButton.disabled = isSubmitting;
  submitButton.textContent = isSubmitting ? 'Registrando...' : 'Registrar inscripción';
}

function showFeedback(message, type) {
  feedback.textContent = message;
  feedback.className = `feedback is-visible is-${type}`;
}

function clearFeedback() {
  feedback.textContent = '';
  feedback.className = 'feedback';
}
