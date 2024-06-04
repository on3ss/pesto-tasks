function Navbar() {
    return (
        <header className="fixed top-0 z-50 navbar bg-primary text-primary-content">
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
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-52 text-base-content">
                        <li>
                            <a>Profile</a>
                        </li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Navbar