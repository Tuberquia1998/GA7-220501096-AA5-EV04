import { dbMSSQL } from '@/app/dbs/data-sources';
import Users from '@/app/dbs/entity/Users';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
    const { username, password } = await req.json();


    // Validar que username y password no estén vacíos
    if (!username || !password) {
        return new NextResponse("Usuario y contraseña son requeridos", { status: 400 });
    }


    try {
        // Inicializar la conexión si no está ya abierta
        if (!dbMSSQL.isInitialized) {
            await dbMSSQL.initialize();
        }


        const userRepository = dbMSSQL.getRepository(Users);
        const user = await userRepository.findOneBy({ usuario: username });


        if (!user) {
            return new NextResponse("Usuario no encontrado", { status: 404 });
        }


        if (user.contraseña !== password) {
            return new NextResponse("Contraseña incorrecta", { status: 401 });
        }


        // Respuesta exitosa
        return new NextResponse(`¡Bienvenido, ${user.usuario}!`, { status: 200 });
    } catch (error) {
        console.error('Error en la validación del usuario:', error);
        return new NextResponse('Error interno del servidor', { status: 500 });
    }
}
