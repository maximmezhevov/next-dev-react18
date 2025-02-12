import { Metadata } from 'next'
import { LoginForm } from '@/components/auth'
import { Suspense } from 'react'
import { AlertCloseable } from '@/components/ui'

export const metadata: Metadata = {
	title: 'Авторизация с email верификацией',
}

const LoginVerif = () => {
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
			<Suspense fallback={null}>
				<LoginForm />
			</Suspense>
		</>
	)
}

export default LoginVerif
