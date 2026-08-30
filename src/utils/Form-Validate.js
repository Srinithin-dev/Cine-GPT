const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
const NAME_RE = /^[a-zA-Z][a-zA-Z\s'.-]*$/;

export const PASSWORD_RULES = [
  { id: "length", label: "At least 8 characters", test: (v) => v.length >= 8 },
  { id: "lower", label: "One lowercase letter", test: (v) => /[a-z]/.test(v) },
  { id: "upper", label: "One uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { id: "digit", label: "One number", test: (v) => /\d/.test(v) },
  {
    id: "special",
    label: "One special character",
    test: (v) => /[^A-Za-z0-9]/.test(v),
  },
];

export const validateName = (name) => {
  const value = (name ?? "").trim();
  if (!value) return "Name is required";
  if (value.length < 2) return "Name must be at least 2 characters";
  if (value.length > 50) return "Name must be under 50 characters";
  if (!NAME_RE.test(value))
    return "Name can only contain letters, spaces, . ' -";
  return null;
};

export const validateEmail = (email) => {
  const value = (email ?? "").trim();
  if (!value) return "Email is required";
  if (value.length > 254) return "Email is too long";
  if (!EMAIL_RE.test(value)) return "Enter a valid email address";
  return null;
};

export const validatePassword = (password) => {
  const value = password ?? "";
  if (!value) return "Password is required";
  if (value.length > 64) return "Password must be under 64 characters";

  const failed = PASSWORD_RULES.filter((rule) => !rule.test(value));
  if (failed.length === 0) return null;
  if (failed.length === 1)
    return `Password needs: ${failed[0].label.toLowerCase()}`;
  return `Password needs: ${failed.map((r) => r.label.toLowerCase()).join(", ")}`;
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return "Please confirm your password";
  if (password !== confirmPassword) return "Passwords do not match";
  return null;
};

// /**
//  * @param {Object} values           - { name, email, password, confirmPassword }
//  * @param {Object} [options]
//  * @param {"signin"|"signup"} [options.mode="signin"]
//  */
export const validateFields = (values = {}, options = {}) => {
  const { mode = "signin" } = options;
  const isSignUp = mode === "signup";

  const errors = {};

  if (isSignUp) {
    const nameError = validateName(values.name);
    if (nameError) errors.name = nameError;
  }

  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  if (isSignUp) {
    const passwordError = validatePassword(values.password);
    if (passwordError) errors.password = passwordError;

    if ("confirmPassword" in values) {
      const confirmError = validateConfirmPassword(
        values.password,
        values.confirmPassword,
      );
      if (confirmError) errors.confirmPassword = confirmError;
    }
  } else if (!values.password) {
    errors.password = "Password is required";
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};

export const getAuthErrorMessage = (error) => {
  const code = error?.code ?? "";
  const map = {
    "auth/invalid-email": "That email address isn't valid.",
    "auth/user-disabled": "This account has been disabled.",
    "auth/user-not-found": "No account found with that email.",
    "auth/wrong-password": "Incorrect email or password.",
    "auth/invalid-credential": "Incorrect email or password.",
    "auth/email-already-in-use": "An account with this email already exists.",
    "auth/weak-password": "Please choose a stronger password.",
    "auth/too-many-requests": "Too many attempts. Try again in a few minutes.",
    "auth/network-request-failed": "Network error. Check your connection.",
    "auth/popup-closed-by-user": "Sign-in window was closed before finishing.",
    "auth/popup-blocked": "Your browser blocked the sign-in popup.",
    "auth/operation-not-allowed": "This sign-in method isn't enabled.",
  };
  return map[code] ?? "Something went wrong. Please try again.";
};
