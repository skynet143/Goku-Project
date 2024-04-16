const jwt= require( 'jsonwebtoken' );
const { promisify } = require('util');
// importar el servicio de usuarios
const authService = require('./auth.service');

const jwt = ( req , res , next ) => {
    if ( typeof(req.headers.authorization) === " undefined") {
        return res.status(403).send('unauthorised')
    }
    let token = req.headers.authorization.split(' ')[1];
    try{
        jwt.verify(token )
    }
    catch{
        return res.status(403).send('unauthorised')
    }
    req.user = jwt.decode();
    next();
}


/**
 * Middleware que verifica si un token es valido y autentica al usuario en la aplicacion
 */
// exports.authenticate = async ( req, res, next ) => {
//     // obtener el token del header
//     const token = req.headers.authorization;
//     if (!token || !token.startsWith('Bearer')) {
//         return res.status(401).send({
//             message: "No se proporciono el token o no fue enviado correctamente"
//         });
//     } else {
//         try {
//             // obteniendo el token sin Bearer
//             token = token.slice(7, token.length);
//             // Verificando el token con el servicio de autenticacion
//             const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY)
//             // Guardando los datos del usuario a la request para usarlos en las siguientes operaciones
//             req.user = decoded;
//             next();
//             } catch (error) {
//                 console.log("Error en authenticate", error);
//                 res.status(401).send({message: 'Token invalido'});
//             }
//     };
// };

// /**
//  * Controlador que genera un nuevo token de acceso
//  */
// exports.generateAccessToken = async (req, res) => {
//     const refreshToken = req.body.refreshToken;
//     if(!refreshToken){
//         return res.status(400).send({message: 'Se requiere el token de refresco'})
//     }
//     let user = await authService.getUserForRefreshToken(refreshToken);  
    
//     if(!user){
//         return res.status(400).send({message:'El token de refresco no existe.'})
//     }else{
//         // Generar un nuevo token de acceso
//         const accessToken = await authService.createAccessToken(user.id);
        
//         // Eliminar el token de refresco ya utilizado
//         await authService.deleteUsedRefreshToken(refreshToken); 

//         // Devolver el nuevo token  
//         return res.status(200).send({accessToken: accessToken});
//     }
// }

// // /**
// //  * Middleware que verifica si el usuario tiene permiso para realizar una acción determinada
// //  * @param {string} action - Acción que se quiere validar
// //  */
// // exports.authorize = (action /* , resource*/ ) => {
// //     return async (req, res, next) => {
// //         try {
// //             const user = req.user || {};
// //             const permission = user[action];

// //             if (!permission) {
// //                 throw new Error('No tienes permisos para realizar esta acción');
// //             }

// //             next();
// //         } catch (error) {
// //             console.log(error);
// //             res.status(403).send({ message: error.message });
// //         }
// //     };
// // };