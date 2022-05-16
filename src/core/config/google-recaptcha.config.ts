import { GoogleRecaptchaNetwork } from "@nestlab/google-recaptcha";

export const recatchaConfig = {
    secretKey: process.env.GOOGLE_RECAPTCHA_SECRET_KEY,
    response: req => req.headers.recaptcha,
    skipIf: process.env.NODE_ENV !== 'production',
    network: GoogleRecaptchaNetwork.Recaptcha,
    score: 0.5
}