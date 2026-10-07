import { useEffect, useRef, useState } from "react";
import { postLead } from "../lib/api.js";
import useCalendly from "../hooks/useCalendly.jsx";
import CalendlyButton from "./CalendlyButton.jsx";

const INDUSTRIES = [
  "Medspa / aesthetic dermatology",
  "IV therapy",
  "Body contouring / weight loss",
  "Luxury used / CPO dealer",
  "Powersports dealer",
  "Other",
];
const COUNTRIES = ["USA", "Canada", "Australia", "Other"];

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  business_name: "",
  industry: "",
  country: "",
  consent: false,
  website: "", // honeypot
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\-.\s\d]{7,20}$/;

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Enter a valid email address.";
  if (v.phone.trim() && !PHONE_RE.test(v.phone.trim())) e.phone = "Enter a valid phone number or leave it blank.";
  if (v.business_name.trim().length < 2) e.business_name = "Please enter your business name.";
  if (!v.industry) e.industry = "Choose your industry.";
  if (!v.country) e.country = "Choose your country.";
  if (!v.consent) e.consent = "Please tick the box so we can contact you.";
  return e;
}

export default function LeadForm() {
  const { openCalendly } = useCalendly();
  const [values, setValues] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | success
  const [serverError, setServerError] = useState("");
  const formRef = useRef(null);
  const successRef = useRef(null);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const errors = validate(values);
  const show = (field) => (touched[field] || submitted) && errors[field];

  const set = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [field]: value }));
  };
  const blur = (field) => () => setTouched((t) => ({ ...t, [field]: true }));

  const field = (name) => ({
    id: `lead-${name}`,
    name,
    value: values[name],
    onChange: set(name),
    onBlur: blur(name),
    "aria-invalid": show(name) ? "true" : undefined,
    "aria-describedby": show(name) ? `lead-${name}-err` : undefined,
  });

  const err = (name) =>
    show(name) ? (
      <p className="field__error" id={`lead-${name}-err`}>
        {errors[name]}
      </p>
    ) : null;

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setServerError("");

    const firstBad = Object.keys(errors)[0];
    if (firstBad) {
      formRef.current?.querySelector(`#lead-${firstBad}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      await postLead({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim() || null,
        business_name: values.business_name.trim(),
        industry: values.industry,
        country: values.country,
        consent: values.consent,
        website: values.website,
      });
      setStatus("success");
      timer.current = setTimeout(
        () => openCalendly({ name: values.name.trim(), email: values.email.trim() }),
        800
      );
    } catch (err2) {
      setStatus("idle");
      setServerError(err2.message || "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="form form--success" role="status">
        <h3 ref={successRef} tabIndex={-1}>
          Got it. Now pick a time that suits you.
        </h3>
        <p>If the booking window didn't open, use the button below.</p>
        <CalendlyButton size="lg" prefill={{ name: values.name.trim(), email: values.email.trim() }}>
          Pick a time →
        </CalendlyButton>
      </div>
    );
  }

  return (
    <form className="form" ref={formRef} onSubmit={onSubmit} noValidate>
      <div className="form__grid">
        <div className="field field--full">
          <label htmlFor="lead-name">Full name</label>
          <input type="text" autoComplete="name" required {...field("name")} />
          {err("name")}
        </div>

        <div className="field field--full">
          <label htmlFor="lead-email">Email</label>
          <input type="email" autoComplete="email" inputMode="email" required {...field("email")} />
          {err("email")}
        </div>

        <div className="field">
          <label htmlFor="lead-phone">
            Phone <span className="field__opt">(optional)</span>
          </label>
          <input type="tel" autoComplete="tel" inputMode="tel" {...field("phone")} />
          {err("phone")}
        </div>

        <div className="field">
          <label htmlFor="lead-business_name">Business name</label>
          <input type="text" autoComplete="organization" required {...field("business_name")} />
          {err("business_name")}
        </div>

        <div className="field">
          <label htmlFor="lead-industry">Industry</label>
          <select required {...field("industry")}>
            <option value="" disabled>
              Select…
            </option>
            {INDUSTRIES.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          {err("industry")}
        </div>

        <div className="field">
          <label htmlFor="lead-country">Country</label>
          <select autoComplete="country-name" required {...field("country")}>
            <option value="" disabled>
              Select…
            </option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {err("country")}
        </div>

        {/* Honeypot: hidden from people and assistive tech, bots tend to fill it. */}
        <div className="hp" aria-hidden="true">
          <label htmlFor="lead-website">Leave this field empty</label>
          <input
            id="lead-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={set("website")}
          />
        </div>

        <div className="field field--full field--check">
          <label className="check" htmlFor="lead-consent">
            <input
              id="lead-consent"
              name="consent"
              type="checkbox"
              checked={values.consent}
              onChange={set("consent")}
              onBlur={blur("consent")}
              aria-invalid={show("consent") ? "true" : undefined}
              aria-describedby={show("consent") ? "lead-consent-err" : undefined}
            />
            <span>I agree to be contacted about my enquiry</span>
          </label>
          {err("consent")}
        </div>
      </div>

      {serverError && (
        <p className="form__error" role="alert">
          {serverError}
        </p>
      )}

      <button type="submit" className="btn btn--primary btn--lg form__submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send my details"}
      </button>
    </form>
  );
}