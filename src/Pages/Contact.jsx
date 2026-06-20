import React, { useState } from 'react'
import translations from '../i18n/translations'

function Contact({ language = 'en' }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors((s) => ({ ...s, [e.target.name]: '' }))
  }

  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required.'
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) errs.email = 'Enter a valid email.'
    if (!form.message.trim()) errs.message = 'Message cannot be empty.'
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length) {
      setErrors(v)
      return
    }

    // Placeholder for API call
    console.log('Contact form submitted', form)
    setSuccess(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSuccess(false), 5000)
  }

  const t = translations[language] || translations.en

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-4">{t.contactHeading}</h1>
      <p className="text-white/60 mb-6">{t.getInTouch}</p>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-white">{t.generalInquiries}</h2>
            <p className="text-white/70">kmailabbas012@gmail.com</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">{t.phoneLabel}</h2>
            <p className="text-white/70">+92 319 5573460</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">{t.addressLabel}</h2>
            <p className="text-white/70">NPA Skardu Gilgit Baltistan, Pakistan</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">{t.followUs}</h2>
            <div className="flex gap-3 text-blue-300">
              <a href="#" className="hover:underline">{t.twitter}</a>
              <a href="#" className="hover:underline">{t.facebook}</a>
              <a href="#" className="hover:underline">{t.instagram}</a>
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold text-white">{t.ourLocation}</h2>
            <div className="mt-2 w-full h-40 bg-white/5 rounded-[1.5rem] overflow-hidden">
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093747!2d144.9537363153168!3d-37.8162797420216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f1f1f1%3A0x1c1c1c1c1c1c1c1c!2sPlaceholder!5e0!3m2!1sen!2sus!4v1610000000000!5m2!1sen!2sus"
                className="w-full h-full"
                frameBorder="0"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {success && <div className="p-3 bg-green-600 text-white rounded-full">{t.feedbackSuccess}</div>}

          <div>
            <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={t.placeholderName}
                aria-label="contact name"
                className="w-full rounded-full px-3 py-2 bg-white/5 text-white"
              />
            {errors.name && <p className="text-sm text-red-400 mt-1">{errors.name}</p>}
          </div>

          <div>
            <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder={t.placeholderEmail}
                aria-label="contact email"
                className="w-full rounded-full px-3 py-2 bg-white/5 text-white"
              />
            {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email}</p>}
          </div>

          <div>
            <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder={t.placeholderMessage}
                aria-label="contact message"
                className="w-full rounded-[2rem] px-3 py-2 bg-white/5 text-white h-32"
              />
            {errors.message && <p className="text-sm text-red-400 mt-1">{errors.message}</p>}
          </div>

          <button className="bg-blue-500 text-white px-4 py-2 rounded-full">{t.sendMessage}</button>
        </form>
      </div>
    </div>
  )
}

export default Contact
