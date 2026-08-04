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
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
        <p className="text-muted-foreground">Manage your personal details and account status.</p>
      </div>

      <UserProfileView user={user} />
    </div>
  )
}