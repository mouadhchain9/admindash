import { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
 export const authOptions: AuthOptions={
    providers:[
        CredentialsProvider({

            name: "Credentials",
            credentials: {
              username: { label: "Username", type: "text", placeholder: "username" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    // Make a POST request to the external login endpoint
                    const response = await axios.post('http://localhost:8081/auth/login', credentials);
          
                    // If the request is successful and the response contains a token
                    if (response.status === 200 && response.data.token) {
                      // Parse the token received from the endpoint
                      const  user  = response.data;                   
                      return user;
                    } else {      
                      // If the response does not contain a token or has a different status code, authentication failed
                      return null;
                    }
                  } catch (error) {
                    // Handle errors such as network issues or server errors
                    console.error('Error authenticating:', error);
                    return null; // Return null to indicate authentication failure


                  }
            }
          }),
    ],

// callbacks: {
//     async session(params) {
//         // Session data from JWT token
//         const { session, token, user } = params;
//         session.user = user || null;
//         // Add more session data as needed
//         return session;
//       }

  
pages:{
signIn:"/auth/login"
},
callbacks: {
async jwt({ token,user} ) {

return { ...token,...user };

},

async session({session,token,user}) {
  
session.user= token;
return session;

},



}





// }


// jwt:{
// // jwt encoding and decoidng config
// }

   };



