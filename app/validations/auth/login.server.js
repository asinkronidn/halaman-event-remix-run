import { validateEmail } from '../../helpers';

export default function loginValidation(formData) {
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const errors = {};
  if (!email) {
    errors.email = "Email wajib diisi";
  } if (!validateEmail(email)) {
    errors.email = "Email tidak valid";
  } if (!password) {
    errors.password = "Password wajib diisi";
  }
  return Object.keys(errors).length > 0 ? errors : null;
}