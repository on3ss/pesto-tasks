function Navbar() {
    return (
        <header className="fixed inset-x-0 top-0 z-50 w-full bg-primary text-primary-content">
            <div className="container mx-auto">
                <div className="navbar">
                    <div className="flex-1">
                        <a className="text-xl btn btn-ghost">taskMN</a>
                    </div>
                    <nav className="flex-none gap-2">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-52 text-base-content space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-10">
                                <li><a>Profile</a></li>
                                <li><a>Logout</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Navbar