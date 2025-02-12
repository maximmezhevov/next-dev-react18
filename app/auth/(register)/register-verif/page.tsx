import { Metadata } from 'next'
import { RegisterForm } from '@/components/auth/register-form'
import { AlertCloseable } from '@/components/ui'

export const metadata: Metadata = {
	title: 'Регистрация с email верификацией',
}

const RegisterVerif = () => {
	return (
		<>
			<AlertCloseable variant='dev'>
				<p>* Временно недоспупно!</p>
				<p>
					Resend: - &quot;Вы можете отправлять тестовые письма только на свой
					собственный адрес электронной почты. Чтобы отправлять письма другим
					получателям, подтвердите домен на resend.com/domains и измените адрес
					отправителя на адрес электронной почты, использующий этот домен
					...&quot;
				</p>
			</AlertCloseable>
			<RegisterForm />
		</>
	)
}

export default RegisterVerif
