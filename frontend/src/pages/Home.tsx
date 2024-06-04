import Navbar from "../components/Navbar"

function Home() {
    return (
        <div className="">
            <Navbar />
            <main>
                <section className="mx-2 my-4 rounded bg-primary-content">
                    <div className="flex justify-center">
                        <button className="btn btn-link">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            <span>Add New Task</span>
                        </button>
                    </div>
                    <ul>
                        <li className="border-t-[1px] border-base-100 px-2 py-4">
                            <div className="flex items-center justify-between">
                                <h5 className="text-lg font-semibold">Task 1</h5>
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="m-1 btn btn-ghost">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                        </svg>
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box">
                                        <li>
                                            <button className="flex w-full btn btn-ghost">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>
                                                <span>Item 1</span>
                                            </button>
                                        </li>
                                        <li>
                                            <a className="btn btn-ghost text-nowrap">Item 2</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <p className="line-clamp-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae beatae ab consequatur aut numquam sed mollitia, odio repellendus magni quaerat.</p>
                            <div className="flex items-center justify-start gap-1 my-2">
                                <span className="px-2 py-1 text-sm font-semibold rounded bg-info text-info-content">Tag1</span>
                                <span className="px-2 py-1 text-sm font-semibold rounded bg-info text-info-content">Tag2</span>
                            </div>
                        </li>
                        <li className="border-t-[1px] border-base-100 px-2 py-4">
                            <h5 className="text-lg font-semibold">Task 1</h5>
                            <p className="line-clamp-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae beatae ab consequatur aut numquam sed mollitia, odio repellendus magni quaerat.</p>
                            <div className="flex items-center justify-start gap-1 my-2">
                                <span className="px-2 py-1 text-sm font-semibold rounded bg-info text-info-content">Tag1</span>
                                <span className="px-2 py-1 text-sm font-semibold rounded bg-info text-info-content">Tag2</span>
                            </div>
                        </li>
                    </ul>
                </section>
            </main>
        </div>
    )
}

export default Home