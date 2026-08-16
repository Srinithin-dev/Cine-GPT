import { useEffect, useRef, useState } from "react";
import {
  Eye,
  EyeOff,
  AlertCircle,
  Sparkles,
  Clapperboard,
  Search,
  Loader2,
} from "lucide-react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, signInWithPopup, GoogleAuthProvider } from "../utils/firebase";
import { useNavigate } from "react-router";
import {
  validateFields,
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  getAuthErrorMessage,
} from "../utils/Form-Validate";
import { useDispatch } from "react-redux";
import { updateUser } from "../store/userSlice";
import useAuthorization from "../hooks/useAuthorization";
import { PROFILE_PHOTO_URL } from "../utils/constants";

const SAMPLE_PROMPTS = [
  "Indian horror-comedy from the last 5 years",
  "That scene where the hallway rotates and everyone floats",
  "Slow-burn Korean thrillers with an unreliable narrator",
  "Action films where the villain is right",
];

const FieldError = ({ children }) =>
  children ? (
    <p className="mt-1.5 flex items-start gap-1.5 text-xs text-rose-400">
      <AlertCircle size={13} className="mt-px shrink-0" />
      <span>{children}</span>
    </p>
  ) : null;

const Field = ({ label, error, children, hint }) => (
  <div>
    <div className="mb-1.5 flex items-baseline justify-between">
      <label className="text-[13px] font-medium text-zinc-300">{label}</label>
      {hint}
    </div>
    {children}
    <FieldError>{error}</FieldError>
  </div>
);

const inputClass = (hasError) =>
  [
    "w-full rounded-lg bg-[#1C1C26] px-3.5 py-2.5 text-[15px] text-zinc-100",
    "placeholder:text-zinc-600 outline-none ring-1 transition",
    "focus:ring-2",
    hasError
      ? "ring-rose-500/60 focus:ring-rose-500"
      : "ring-white/10 focus:ring-indigo-500",
  ].join(" ");

const Auth = () => {
  useAuthorization();

  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);
  const formRef = useRef(null);

  const readValues = () => ({
    name: name.current?.value ?? "",
    email: email.current?.value ?? "",
    password: password.current?.value ?? "",
    ...(isSignUp
      ? { confirmPassword: confirmPassword.current?.value ?? "" }
      : {}),
  });

  const handleBlur = (field) => () => {
    const v = readValues();
    let message = null;

    if (field === "name") message = isSignUp ? validateName(v.name) : null;
    if (field === "email") message = validateEmail(v.email);
    if (field === "password")
      message = isSignUp
        ? validatePassword(v.password)
        : v.password
          ? null
          : "Password is required";
    if (field === "confirmPassword")
      message = validateConfirmPassword(v.password, v.confirmPassword);

    setErrors((prev) => {
      const next = { ...prev };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });
  };

  const toggleMode = (event) => {
    event.preventDefault();
    if (formRef.current) formRef.current.reset();
    setErrors({});
    setFormError("");
    setShowPwd(false);
    setIsSignUp((prev) => !prev);
  };

  const handleButtonClick = (event) => {
    event.preventDefault();
    setFormError("");

    const values = readValues();
    const { isValid, errors: fieldErrors } = validateFields(values, {
      mode: isSignUp ? "signup" : "signin",
    });

    setErrors(fieldErrors);
    if (!isValid) return;

    setSubmitting(true);

    if (isSignUp) {
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredentials) => {
          updateProfile(userCredentials.user, {
            displayName: values.name,
            photoURL: PROFILE_PHOTO_URL,
          }).then(() => {
            const { uid, displayName, email, photoURL } = auth.currentUser;
            dispatch(updateUser({ uid, displayName, email, photoURL }));
          });
        })
        .catch((error) => setFormError(getAuthErrorMessage(error)))
        .finally(() => setSubmitting(false));
    } else {
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then(() => {})
        .catch((error) => setFormError(getAuthErrorMessage(error)))
        .finally(() => setSubmitting(false));
    }
  };

  const handleSSO = () => {
    setFormError("");
    signInWithPopup(auth, provider).catch((error) =>
      setFormError(getAuthErrorMessage(error)),
    );
  };
  return (
    <div className="cg-aurora relative min-h-screen w-full overflow-hidden bg-[#0A0A0F]">
      <div className="cg-grid absolute inset-0 opacity-70" />

      <div className="relative mx-auto grid min-h-screen max-w-6xl grid-cols-1 gap-10 px-6 py-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <section className="hidden lg:block">
          <div className="mb-8 flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
              <Clapperboard size={18} className="text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-zinc-100">
              CineGPT
            </span>
          </div>

          <h1 className="max-w-md text-[44px] font-semibold leading-[1.1] tracking-tight text-zinc-50">
            Search films the way you{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              actually think
            </span>{" "}
            about them.
          </h1>

          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-zinc-400">
            Genre filters can't find "the one with the rotating hallway."
            CineGPT can. Describe a mood, a mashup, or half a scene you barely
            remember.
          </p>

          <div className="mt-9 space-y-2.5">
            {SAMPLE_PROMPTS.map((prompt) => (
              <div
                key={prompt}
                className="flex items-center gap-2.5 rounded-lg bg-white/[0.03] px-3.5 py-2.5 text-[13px] text-zinc-400 ring-1 ring-white/[0.06]"
              >
                <Search size={14} className="shrink-0 text-indigo-400" />
                <span className="truncate">{prompt}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex justify-center lg:justify-end">
          <div className="w-full max-w-[420px]">
            {/* Mobile brand */}
            <div className="mb-7 flex items-center gap-2.5 lg:hidden">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
                <Clapperboard size={18} className="text-white" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-zinc-100">
                CineGPT
              </span>
            </div>

            <div className="rounded-2xl bg-[#14141C]/90 p-7 shadow-2xl shadow-black/50 ring-1 ring-white/[0.08] backdrop-blur-xl sm:p-8">
              <h2 className="text-[22px] font-semibold tracking-tight text-zinc-50">
                {isSignUp ? "Create your account" : "Welcome back"}
              </h2>
              <p className="mt-1.5 text-sm text-zinc-500">
                {isSignUp
                  ? "Free to start. No card required."
                  : "Sign in to pick up where you left off."}
              </p>

              {formError && (
                <div
                  role="alert"
                  className="mt-5 flex items-start gap-2.5 rounded-lg bg-rose-500/10 px-3.5 py-3 text-[13px] text-rose-300 ring-1 ring-rose-500/25"
                >
                  <AlertCircle size={15} className="mt-px shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <form
                ref={formRef}
                onSubmit={handleButtonClick}
                noValidate
                className="mt-6 space-y-4"
              >
                {isSignUp && (
                  <Field label="Full name" error={errors.name}>
                    <input
                      ref={name}
                      type="text"
                      autoComplete="name"
                      placeholder="Ada Lovelace"
                      onBlur={handleBlur("name")}
                      aria-invalid={!!errors.name}
                      className={inputClass(!!errors.name)}
                    />
                  </Field>
                )}

                <Field label="Email" error={errors.email}>
                  <input
                    ref={email}
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    onBlur={handleBlur("email")}
                    aria-invalid={!!errors.email}
                    className={inputClass(!!errors.email)}
                  />
                </Field>

                <Field
                  label="Password"
                  error={errors.password}
                  hint={
                    !isSignUp && (
                      <button
                        type="button"
                        className="text-xs text-zinc-500 transition hover:text-zinc-300"
                      >
                        Forgot password?
                      </button>
                    )
                  }
                >
                  <div className="relative">
                    <input
                      ref={password}
                      type={showPwd ? "text" : "password"}
                      autoComplete={
                        isSignUp ? "new-password" : "current-password"
                      }
                      placeholder={isSignUp ? "8+ characters" : "••••••••"}
                      onBlur={handleBlur("password")}
                      aria-invalid={!!errors.password}
                      className={inputClass(!!errors.password) + " pr-11"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd((p) => !p)}
                      aria-label={showPwd ? "Hide password" : "Show password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-zinc-200"
                    >
                      {showPwd ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </Field>

                {isSignUp && (
                  <Field
                    label="Confirm password"
                    error={errors.confirmPassword}
                  >
                    <input
                      ref={confirmPassword}
                      type={showPwd ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Re-enter your password"
                      onBlur={handleBlur("confirmPassword")}
                      aria-invalid={!!errors.confirmPassword}
                      className={inputClass(!!errors.confirmPassword)}
                    />
                  </Field>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-1 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 py-2.5 text-[15px] font-medium text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-[#14141C] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting && <Loader2 size={16} className="animate-spin" />}
                  {isSignUp ? "Create account" : "Sign in"}
                </button>
              </form>

              <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-[11px] uppercase tracking-widest text-zinc-600">
                  or
                </span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <button
                type="button"
                onClick={handleSSO}
                className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-white/[0.04] py-2.5 text-[14px] font-medium text-zinc-200 ring-1 ring-white/10 transition hover:bg-white/[0.08]"
              >
                <svg width="17" height="17" viewBox="0 0 48 48" aria-hidden>
                  <path
                    fill="#FFC107"
                    d="M43.6 20.1H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C33.6 6.1 29 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C33.6 6.1 29 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 44c5 0 9.5-1.9 12.9-5l-6.2-5.2C28.7 35.4 26.4 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.4l6.2 5.2C39.1 36.7 44 31.1 44 24c0-1.3-.1-2.6-.4-3.9z"
                  />
                </svg>
                Continue with Google
              </button>

              <p className="mt-6 text-center text-sm text-zinc-500">
                {isSignUp ? "Already have an account?" : "New to CineGPT?"}{" "}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="font-medium text-indigo-400 transition hover:text-indigo-300"
                >
                  {isSignUp ? "Sign in" : "Create one"}
                </button>
              </p>
            </div>

            <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-zinc-600">
              <Sparkles size={12} />
              Powered by semantic search over 900k+ titles
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Auth;
