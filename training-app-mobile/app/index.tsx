import { Redirect } from 'expo-router'
import { useAuthSessionContext } from '../src/providers/AuthSessionProvider'
import { AppLoadingScreen } from '../src/components/ui/AppLoadingScreen'

export default function IndexScreen() {
  const { token, userName, sessionLoading } = useAuthSessionContext()

  if (sessionLoading) {
    return (
      <AppLoadingScreen
        label="Session"
        message="Поднимаем мобильную оболочку и проверяем, есть ли сохранённая авторизация."
        title="Проверяем сессию"
      />
    )
  }

  if (token && userName) {
    return <Redirect href="/(tabs)/calculator" />
  }

  return <Redirect href="/login" />
}
