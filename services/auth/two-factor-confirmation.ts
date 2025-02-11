import { prisma } from '@/lib'
import { TwoFactorConfirmation } from '@prisma/client'

export const getTwoFactorConfirmationByUserId = async (
	userId: TwoFactorConfirmation['userId']
) => {
	try {
		const twoFactorConfirmation = await prisma.twoFactorConfirmation.findUnique(
			{
				where: { userId },
			}
		)

		return twoFactorConfirmation
	} catch {
		return null
	}
}
