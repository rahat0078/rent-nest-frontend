import { getMe } from '@/app/(auth)/_authActions/getMe'
import { UserProfileView } from '@/components/shared/UserProfileView'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const response = await getMe()

  if (!response?.data) {
    redirect('/login')
  }

  const user = response.data

  return (
    <div>
      <UserProfileView user={user} />
    </div>
  )
}