'use client'

import { FC, useState, ChangeEvent, FormEvent, useEffect } from 'react'
import UsernameIcon from './username-icon'
import PasswordIcon from './password-icon'
import IFormData from '@/types/formdata'
import FormError from './form-error'
import setToken from '@/actions/set-token'
import checkToken from '@/actions/check-token'
import S from '@/styles/auth-form.module.css'
import redirectIn from '@/actions/redirect-in'

const AuthForm: FC = () => {
  useEffect(() => {
    const checkTokenAndRedirect = async () => {
      const T = await checkToken()
      if (T) redirectIn()
    }
    checkTokenAndRedirect()
  }, [])

  const [formData, setFormData] = useState<IFormData>({
    username: '',
    password: '',
    error: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>, field: keyof IFormData) => {
    const { value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3001/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: formData.username, password: formData.password })
      })
      const res = await response.json()
      if (response.ok) setToken(res.token, true)
      else setFormData({ ...formData, error: 'Ошибка авторизаций, неверные данные' })
    } catch (error) {
      setFormData({ ...formData, error: 'Сервер не отвечает, попробуйте позже' })
    }
  }

  return (
    <form className={S.form} onSubmit={ handleSubmit }>
      <label>
        <UsernameIcon />
        <input
          type='text'
          placeholder='Username'
          minLength={5}
          value={formData.username}
          name="username"
          onChange={e => handleChange(e, 'username')}
        />
      </label>
      <label>
        <PasswordIcon />
        <input
          type='password'
          placeholder='Password'
          minLength={5}
          value={formData.password}
          name="password"
          onChange={e => handleChange(e, 'password')}
        />
      </label>
      {
        formData.error && <FormError error={ formData.error } />
      }
      <button>Войти</button>
    </form>
  )
}

export default AuthForm
