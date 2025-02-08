import { User, VerificationToken } from '@prisma/client'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (
	email: User['email'],
	token: VerificationToken['token']
) => {
	const confirmLink = `${process.env.APP_URL}/auth/new-verification?token=${token}`

	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: 'Подтвердите свой адрес электронной почты',
		html: `
      <p>Нажмите 
        <a href='${confirmLink}'>здесь</a> 
        чтобы подтвердить адрес электронной почты
      </p>`, // TODO
	})
}

export const sendPasswordResetEmail = async (
	email: User['email'],
	token: VerificationToken['token']
) => {
	const passwordResetLink = `${process.env.APP_URL}/auth/new-password?token=${token}`

	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: 'Сброс пороля',
		html: `
      <p>Нажмите
        <a href='${passwordResetLink}'>здесь</a>
        чтобы сбросить пароль
      </p>`, // TODO
	})
}
