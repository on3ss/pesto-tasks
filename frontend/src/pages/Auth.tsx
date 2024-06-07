import { useState } from "react"

function Auth() {
    const [tab, setTab] = useState<number>(1)

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div role="tablist" className="container w-full mx-4 tabs tabs-boxed">
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
    )
}


function LoginForm() {
    return (
        <form>
            <label className="w-full form-control">
                <div className="label">
                    <span className="label-text">Email</span>
                </div>
                <input type="text" placeholder="Email" className="w-full input input-bordered" />
                <div className="label">
                    <span className="label-text-alt">Bottom Left label</span>
                </div>
            </label>
            <label className="w-full form-control">
                <div className="label">
                    <span className="label-text">Password</span>
                </div>
                <input type="password" placeholder="Password" className="w-full input input-bordered" />
                <div className="label">
                    <span className="label-text-alt">Bottom Left label</span>
                </div>
            </label>

            <div className="flex justify-center my-4">
                <button className="flex-1 btn btn-primary">Login</button>
            </div>
        </form>
    )
}

function RegistrationForm() {
    return (
        <>
            <form>
                <label className="w-full form-control">
                    <div className="label">
                        <span className="label-text">Email</span>
                    </div>
                    <input type="text" placeholder="Email" className="w-full input input-bordered" />
                    <div className="label">
                        <span className="label-text-alt">Bottom Left label</span>
                    </div>
                </label>
                <label className="w-full form-control">
                    <div className="label">
                        <span className="label-text">Password</span>
                    </div>
                    <input type="password" placeholder="Password" className="w-full input input-bordered" />
                    <div className="label">
                        <span className="label-text-alt">Bottom Left label</span>
                    </div>
                </label>
                <label className="w-full form-control">
                    <div className="label">
                        <span className="label-text">Confirm Password</span>
                    </div>
                    <input type="password" placeholder="Confirm Password" className="w-full input input-bordered" />
                    <div className="label">
                        <span className="label-text-alt">Bottom Left label</span>
                    </div>
                </label>

                <div className="flex justify-center my-4">
                    <button className="flex-1 btn btn-primary">Register</button>
                </div>
            </form>
        </>
    )
}

export default Auth