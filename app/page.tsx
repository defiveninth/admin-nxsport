import AuthForm from '@/components/auth-form'
import S from '@/styles/home.module.css'

export default function Home() {
  return (
    <>
      <main className={ S.main }>
        <h2>Нархоз Спорт | Админ</h2>
        <AuthForm />
      </main>
    </>
  )
}
