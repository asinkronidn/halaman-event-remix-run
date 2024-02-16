import { login } from "../services/auth/auth.server";
import landingPageStyles from '../styles/login-page.css';
import { Form, json, useActionData, redirect } from "@remix-run/react";
import { useEffect, useState } from 'react';
import loginValidation from '../validations/auth/login.server';
import { requireGuestSession } from "../services/auth/auth.server";

export const links = () => [
    { rel: "stylesheet", href: landingPageStyles },
];

export const meta = () => {
    return [{
      title: "CMS Login",
    }, {
      property: "robots",
      content: "noindex",
    }];
  };

export const loader = async ({
    request
}) => {
    await requireGuestSession({
        request,
        redirectPath: '/dashboard'
    });
    return {};
};

export async function action({
    request
  }) {
    const formData = await request.formData();
    const errors = await loginValidation(formData);
    if (errors) {
      return json({ errors });
    }

    try {
        return await login({
            email: formData.get("email"),
            password: formData.get("password"),
            redirectPath: "/dashboard"
        });
        // return await authenticator.authenticate("user-pass", request, {
        //     successRedirect: "/dashboard",
        //     throwOnError: true,
        //     context: { formData }
        // });
    } catch (error) {
        if (error.status === 401) {
            return json({
                errors: {
                    email: error.message
                }
            });
        }

        return json({
            errors: {
                email: 'Gagal login, silahkan coba kembali'
            }
        });
    }
}  

export default function LoginPage() {
    const actionData = useActionData();
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        setErrors(null)
        if (actionData) {
            if (actionData.errors) {
                setErrors(actionData.errors)
            }
        }
    }, [
        actionData
    ]);

    return (
        <div>
          <main>
            <section className={`bg-gray-50 dark:bg-gray-900`}>
                <div className={`flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0`}>
                    <div className={`w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700`}>
                        <div className={`p-6 space-y-4 md:space-y-6 sm:p-8`}>
                            <h1 className={`text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white`}>
                                Sign in to your account
                            </h1>
                            <Form method={`post`} action={`/login`} className={`space-y-4 md:space-y-6`}>
                                <div>
                                    <label htmlFor={`email`} className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}>Your email</label>
                                    <input type={`email`} name={`email`} id={`email`} className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder={`Type your email`}/>
                                    {errors && errors.email ? (
                                    <em className={`text-red-alert`}>{errors.email}</em>
                                    ) : null}
                                </div>
                                <div>
                                    <label htmlFor={`password`} className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}>Password</label>
                                    <input type={`password`} name={`password`} id={`password`} className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
                                    {errors && errors.password ? (
                                    <em className={`text-red-alert`}>{errors.password}</em>
                                    ) : null}
                                </div>
                                {/* <div className={`flex items-center justify-between`}>
                                    <div className={`flex items-start`}>
                                        <div className={`flex items-center h-5`}>
                                            <input id={`remember`} aria-describedby={`remember`} type={`checkbox`} className={`w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800`}/>
                                        </div>
                                        <div className={`ml-3 text-sm`}>
                                            <label htmlFor={`remember`} className={`text-gray-500 dark:text-gray-300`}>Remember me</label>
                                        </div>
                                    </div>
                                    <a href={`#`} className={`text-sm font-medium text-primary-600 hover:underline dark:text-primary-500`}>Forgot password?</a>
                                </div> */}
                                <button type={`submit`} className={`w-full text-white bg-purple focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}>Sign in</button>
                            </Form>
                        </div>
                    </div>
                </div>
              </section>
          </main>
        </div>
    )
}