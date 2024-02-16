import bcrypt from "bcrypt";
import { getUserByEmail } from "../../data/users.server";
import { createCookieSessionStorage, redirect } from '@remix-run/node';

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: process.COOKIE_SESSION_NAME, // use any name you want here
    sameSite: "lax", // this helps with CSRF
    path: "/", // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: process.env.COOKIE_SECRETS.split(','), // replace this with an actual secret
    secure: process.env.NODE_ENV === "production", // enable this in prod only
  },
});

async function createUserSession(userId, redirectPath) {
  const session = await sessionStorage.getSession();
  session.set('userId', userId);
  return redirect(redirectPath, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  });
}

export async function getUserFromSession(request) {
    const session = await sessionStorage.getSession(
      request.headers.get('Cookie')
    );
  
    const userId = session.get('userId');
  
    if (!userId) {
      return null;
    }
  
    return userId;
  }
  
  export async function destroyUserSession({
    request,
    redirectPath
  }) {
    const session = await sessionStorage.getSession(
      request.headers.get('Cookie')
    );
  
    return redirect(redirectPath, {
      headers: {
        'Set-Cookie': await sessionStorage.destroySession(session),
      },
    });
  }
  
  export async function requireUserSession({
    request,
    redirectPath
}) {
    const userId = await getUserFromSession(request);
  
    if (!userId) {
      throw redirect(redirectPath);
    }
  }
  
  export async function requireGuestSession({
    request,
    redirectPath
}) {
    const userId = await getUserFromSession(request);
  
    if (userId) {
      throw redirect(redirectPath);
    }
  }



// export async function signup({ email, password }) {
//   const existingUser = await prisma.user.findFirst({ where: { email } });

//   if (existingUser) {
//     const error = new Error(
//       'A user with the provided email address exists already.'
//     );
//     error.status = 422;
//     throw error;
//   }

//   const passwordHash = await hash(password, 12);

//   const user = await prisma.user.create({ data: { email: email, password: passwordHash } });
//   return createUserSession(user.id, '/expenses');
// }

export async function login({ email, password, redirectPath }) {
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    const error = new Error(
      'User tidak ditemukan.'
    );
    error.status = 401;
    throw error;
  }

  const passwordCorrect = await bcrypt.compare(password, existingUser.password);
  if (!passwordCorrect) {
    const error = new Error(
      'Password tidak valid.'
    );
    error.status = 401;
    throw error;
  }

  return createUserSession(existingUser.id, redirectPath);
}