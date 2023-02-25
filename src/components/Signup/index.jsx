
import { useState } from 'react';
import { Button, Input } from "../Generic";
import { Container, Title } from "./style";
import { useMutation } from "react-query";
import { useNavigate } from 'react-router-dom';
import { useHttp } from '../../hooks/useHttp'
// const { REACT_APP_BASE_URL: url } = process.env;

const SignUp = () => {
  const { request } = useHttp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [roleIdSet, setRoleIdSet] = useState('')
  const [error, setError] = useState('')

  const { mutate } = useMutation(({ body }) => {
    return request({
      url: `/public/auth/register`,
      method: 'POST',
      body,
    })
  }
  )
  const onSubmit = () => {
    const body = {
      password,
      email,
      firstname,
      lastname,
      roleIdSet: [
        0
      ]
    }
    setPassword('')
    if (email.length && password.length) {
      mutate(
        { body },
        {
          onSuccess: res => {
            if (res?.authenticationToken) {
              localStorage.setItem('token', res?.authenticationToken)
              navigate('/home');
            } else {
              setError('Password yoki emaildq xatolik');
            }
          },
          onError: err => { }
        }
      )
    } else setError(`Email yoki password bo'sh bolmasligi kerak`)
  }


  return (
    <Container>
      <Title>Registration</Title>
      <Input
        height={'30px'}
        value={email}
        onChange={({ target: { value } }) => {
          setEmail(value)
          setError('')
        }}
        mt={24} placeholder="Email"
      />
      <Input
        height={'30px'}
        value={password}
        onChange={({ target: { value } }) => {
          setError('')
          setPassword(value)
        }}
        mt={24} placeholder="Login"
      />
      <Input
        height={'30px'}
        value={firstname}
        onChange={({ target: { value } }) => {
          setError('')
          setFirstname(value)
        }}
        mt={24} placeholder="First name"
      />
      <Input
        height={'30px'}
        value={lastname}
        onChange={({ target: { value } }) => {
          setError('')
          setLastname(value)
        }}
        mt={24} placeholder="Last name"
      />
      <Input
        height={'30px'}
        value={roleIdSet}
        onChange={({ target: { value } }) => {
          setError('')
          setRoleIdSet(value)
        }}
        mt={24} placeholder="User role"
      />
      <Input
        height={'30px'}
        value={password}
        onChange={({ target: { value } }) => {
          setError('')
          setPassword(value)
        }}
        mt={24} placeholder="Password"
      />
      <Input
        height={'30px'}
        onChange={({ target: { value } }) => {
          setError('')
        }}
        mt={24} placeholder="Re-enter password"
      />
      {error?.length ? <Title.Error>{error} </Title.Error> : null}
      <Button
        mt={32}
        type='primary'
        onClick={onSubmit}
      >
        Sign Up
      </Button>
    </Container>
  );
}
export default SignUp;