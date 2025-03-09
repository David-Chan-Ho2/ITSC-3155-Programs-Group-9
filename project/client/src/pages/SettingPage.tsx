import Button from '../components/buttons/Button'
import Form from '../components/forms/Form'
import Input from '../components/inputs/Input'

function SettingPage() {
    return (
        <>
            <Form>
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-full">
                    <div className="col-span-full flex items-center gap-x-8">
                        <img
                            alt=""
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            className="size-24 flex-none rounded-lg bg-gray-800 object-cover"
                        />
                        <div>
                            <Button
                                type="button"
                                className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 text-white"
                            >
                                Change avatar
                            </Button>
                            <p className="mt-2 text-xs/5 text-gray-400">JPG, GIF or PNG. 1MB max.</p>
                        </div>
                    </div>

                    <div className="col-span-full">
                        <Input
                            id="first-name"
                            label="First Name"
                            name="first-name"
                            type="text"
                            autoComplete="given-name"
                        />
                    </div>

                    <div className="col-span-full">
                        <Input
                            id="last-name"
                            name="last-name"
                            label="Last Name"
                            type="text"
                            autoComplete="family-name"
                        />
                    </div>

                    <div className="col-span-full">
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            autoComplete="email"
                        />
                    </div>
                </div>

                <div className="mt-8 flex">
                    <Button
                        type="submit"
                        className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 text-white"
                    >
                        Save
                    </Button>
                </div>
            </Form>

            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                <div>
                    <h2 className="text-base/7 font-semibold">Change password</h2>
                    <p className="mt-1 text-sm/6 text-gray-400">Update your password associated with your account.</p>
                </div>

                <Form>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                        <div className="col-span-full">
                            <Input
                                label="Password"
                                id="current-password"
                                name="current_password"
                                type="password"
                                autoComplete="current-password"
                            />
                        </div>

                        <div className="col-span-full">
                            <Input
                                label="New Password"
                                id="new-password"
                                name="new_password"
                                type="password"
                                autoComplete="new-password"
                            />
                        </div>

                        <div className="col-span-full">
                            <Input
                                label="Confirm Password"
                                id="confirm-password"
                                name="confirm_password"
                                type="password"
                                autoComplete="new-password"
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex">
                        <Button
                            type="submit"
                            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 text-white"
                        >
                            Save
                        </Button>
                    </div>
                </Form>
            </div>

            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                <div>
                    <h2 className="text-base/7 font-semibold">Delete account</h2>
                    <p className="mt-1 text-sm/6 text-gray-400">
                        No longer want to use our service? You can delete your account here. This action is not reversible.
                        All information related to this account will be deleted permanently.
                    </p>
                </div>

                <Form className="flex items-start md:col-span-2">
                    <Button
                        type="submit"
                        className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-red-400 text-white"
                    >
                        Yes, delete my account
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default SettingPage