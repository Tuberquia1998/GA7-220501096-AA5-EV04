"use client";
import Image from 'next/image';
import Logo from '@/app/public/images/cafe.jpg';
import { Button, Input, message } from 'antd';
import { useState } from 'react';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const clickButton = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    try {
      const response = await fetch('http://localhost:3000/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });


      // Verificar el estado de la respuesta y mostrar mensaje
      if (response.ok) {
        const data = await response.text();
        message.success(`¡Login exitoso: ${data}`);
      } else {
        const errorText = await response.text();
        message.error(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      message.error('Error en el servidor. Por favor, intenta de nuevo más tarde.');
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md login-container">
        <Image
          src={Logo}
          alt="logo visionamos"
          width={500}              
          height={300}
          layout="responsive"        
        />
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">Login</h2>
        <form onSubmit={clickButton}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Usuario
            </label>
            <Input
              placeholder="Ingresar usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Contraseña
            </label>
            <Input
              type="password"
              placeholder="Ingresar contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Ingresar
          </Button>
        </form>
      </div>
      </div>
  );
}


export default Login;