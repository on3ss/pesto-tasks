import { useState } from 'react';
import { LoginForm } from '../components/LoginForm';
import { RegistrationForm } from '../components/RegistrationForm';

function Auth() {
    const [tab, setTab] = useState<number>(1);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div role="tablist" className="container w-full mx-4 tabs tabs-boxed sm:w-1/2 lg:w-1/3 xl:1/4">
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Login" checked={tab === 1} onChange={() => setTab(1)} />
                <div role="tabpanel" className="p-6 tab-content bg-base-100 border-base-300 rounded-box">
                    <LoginForm />
                </div>

                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Register" checked={tab === 2} onChange={() => setTab(2)} />
                <div role="tabpanel" className="p-6 tab-content bg-base-100 border-base-300 rounded-box">
                    <RegistrationForm />
                </div>
            </div>
        </div>
    );
}

export default Auth;
