"use client";

import { useActionState, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { sendContact } from "@/app/actions/contact";
import { site } from "@/config/site";
import {
  contactInterests,
  contactRoles,
  type ContactField,
  type ContactState,
} from "@/lib/contact";

const initial: ContactState = { status: "idle" };

function Form({ onAgain }: { onAgain: () => void }) {
  const t = useTranslations();
  const locale = useLocale();
  const [state, action, pending] = useActionState(sendContact, initial);

  if (state.status === "sent") {
    return (
      <div role="status" className="border-l border-white/30 py-2 pl-6">
        <p className="t-statement">
          {t("contactPage.form.success", { email: state.email })}
        </p>
        <button type="button" onClick={onAgain} className="link-line mt-8 cursor-pointer">
          {t("contactPage.form.another")}
        </button>
      </div>
    );
  }

  const values = "values" in state ? state.values : undefined;
  const invalid = (field: ContactField) =>
    state.status === "invalid" && state.fields.includes(field);
  const errorProps = (field: ContactField) =>
    invalid(field)
      ? { "aria-invalid": true as const, "aria-describedby": `${field}-error` }
      : {};
  const errorText = (field: ContactField) =>
    invalid(field) ? (
      <p id={`${field}-error`} className="field-error">
        {t(`contactPage.form.errors.${field}`)}
      </p>
    ) : null;

  return (
    <form action={action} noValidate className="grid gap-6 sm:grid-cols-2">
      <input type="hidden" name="locale" value={locale} />
      {/* not for people: left empty by anyone using the form normally */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="field">
        <label htmlFor="name">{t("contactPage.form.name")}</label>
        <input
          id="name"
          name="name"
          className="input"
          autoComplete="name"
          required
          defaultValue={values?.name}
          {...errorProps("name")}
        />
        {errorText("name")}
      </div>

      <div className="field">
        <label htmlFor="email">{t("contactPage.form.email")}</label>
        <input
          id="email"
          name="email"
          type="email"
          className="input"
          autoComplete="email"
          required
          defaultValue={values?.email}
          {...errorProps("email")}
        />
        {errorText("email")}
      </div>

      <div className="field">
        <label htmlFor="role">{t("contactPage.form.role")}</label>
        <select
          id="role"
          name="role"
          className="input"
          defaultValue={values?.role ?? "athlete"}
        >
          {contactRoles.map((role) => (
            <option key={role} value={role}>
              {t(`contactPage.form.roles.${role}`)}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="interest">{t("contactPage.form.interest")}</label>
        <select
          id="interest"
          name="interest"
          className="input"
          defaultValue={values?.interest ?? "unsure"}
        >
          {contactInterests.map((interest) => (
            <option key={interest} value={interest}>
              {interest === "unsure"
                ? t("contactPage.form.unsure")
                : t(`services.${interest}.name`)}
            </option>
          ))}
        </select>
      </div>

      <div className="field sm:col-span-2">
        <label htmlFor="message">{t("contactPage.form.message")}</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className="input resize-y"
          placeholder={t("contactPage.form.messageHint")}
          required
          defaultValue={values?.message}
          {...errorProps("message")}
        />
        {errorText("message")}
      </div>

      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-[0.9375rem] text-silver">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-1 h-[1.125rem] w-[1.125rem] shrink-0 accent-[#d7e6f7]"
            {...errorProps("consent")}
          />
          <span>{t("contactPage.form.consent")}</span>
        </label>
        {errorText("consent")}
      </div>

      {state.status === "unavailable" ? (
        <p role="alert" className="field-error sm:col-span-2">
          {t("contactPage.form.unavailable", { email: site.contact.email })}
        </p>
      ) : null}

      <div className="sm:col-span-2">
        <button
          type="submit"
          data-glass
          disabled={pending}
          className="btn btn-glass glass disabled:cursor-wait disabled:opacity-70"
        >
          <span className="relative">
            {pending ? t("contactPage.form.sending") : t("contactPage.form.submit")}
          </span>
        </button>
      </div>
    </form>
  );
}

export function ContactForm() {
  // a new key gives a clean form after "Send another message"
  const [round, setRound] = useState(0);
  return <Form key={round} onAgain={() => setRound((value) => value + 1)} />;
}
