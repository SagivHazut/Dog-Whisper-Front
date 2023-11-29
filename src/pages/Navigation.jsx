'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Avatar from '@mui/material/Avatar'
import LockPersonIcon from '@mui/icons-material/LockPerson'
import Image from 'next/image'
import DogPaw from '../images/dogpaw.png'

export const Navigation = ({ location, user, router }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const currentPath = location

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  const handleSignOut = () => {
    localStorage.removeItem('user')
    router.push('/SignIn')
  }
  return (
    <>
      <nav className="bg-blue-50">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-900 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
                onClick={toggleMobileMenu}
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center ">
                <Image src={DogPaw} alt="Your Company" width={35} height={35} />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4 ">
                  <Link
                    href="/"
                    className={`${
                      currentPath === '/'
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-900 hover:bg-gray-700 hover:text-white'
                    } rounded-md px-3 py-2 text-sm font-medium `}
                  >
                    Home Page
                  </Link>
                  <Link
                    href="/Breeds"
                    className={`${
                      currentPath === '/Breeds'
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-900 hover:bg-gray-700 hover:text-white'
                    } rounded-md px-3 py-2 text-sm font-medium`}
                  >
                    Dog Breeds
                  </Link>

                  {user ? (
                    <>
                      <Link
                        href="/MyPlan"
                        className={`${
                          currentPath === '/MyPlan'
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-900 hover:bg-gray-700 hover:text-white'
                        } rounded-md px-3 py-2 text-sm font-medium`}
                      >
                        Previous Training
                      </Link>
                      <Link
                        href="/TrainingSchedule"
                        className={`${
                          currentPath === '/TrainingSchedule'
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-900 hover:bg-gray-700 hover:text-white'
                        } rounded-md px-3 py-2 text-sm font-medium`}
                      >
                        Training Schedule
                      </Link>
                    </>
                  ) : (
                    <>
                      {' '}
                      <Link
                        href="#"
                        className="text-gray-900 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        disabled={true}
                      >
                        <LockPersonIcon className="h-4 w-4 " /> Previous
                        Training
                      </Link>
                      <Link
                        href="#"
                        className="text-gray-900 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        disabled={true}
                      >
                        <LockPersonIcon className="h-4 w-4 " /> Calendar
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    onClick={toggleProfile}
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded={isProfileOpen}
                    aria-haspopup="true"
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <Avatar
                      className="h-10 w-10 rounded-full"
                      style={{ backgroundColor: user?.color }}
                    >
                      {user?.firstName &&
                        user.firstName.charAt(0).toUpperCase()}
                    </Avatar>
                  </button>
                </div>

                {isProfileOpen && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    {user ? (
                      <span className="block px-4 py-2 text-sm text-gray-700 font-bold">
                        Hello, {user?.firstName + ' ' + user?.lastName}
                      </span>
                    ) : (
                      <></>
                    )}

                    {user?.admin && (
                      <Link
                        href="/Admin/AdminCalender"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-1"
                      >
                        Admin Panel
                      </Link>
                    )}
                    {!user ? (
                      <>
                        <Link
                          href="/SignIn"
                          className="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabIndex="-1"
                          id="user-menu-item-0"
                        >
                          Login{' '}
                        </Link>
                        <Link
                          href="/SignUp"
                          className="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabIndex="-1"
                          id="user-menu-item-0"
                        >
                          SignUp
                        </Link>
                      </>
                    ) : (
                      <>
                        {' '}
                        <Link
                          href="/Settings"
                          className="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabIndex="-1"
                          id="user-menu-item-1"
                        >
                          Settings
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                          role="menuitem"
                          tabIndex="-1"
                          id="user-menu-item-2"
                        >
                          Sign out
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
          id="mobile-menu"
        >
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href="/"
              className={`${
                currentPath === '/'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-900 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"'
              } rounded-md px-3 py-2 text-sm font-medium`}
              aria-current="page"
            >
              Home Page
            </Link>
            <Link
              href="/Breeds"
              className={`${
                currentPath === '/Breeds'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-900 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"'
              } rounded-md px-3 py-2 text-sm font-medium`}
            >
              Dog Breeds
            </Link>

            {user ? (
              <>
                <Link
                  href="/MyPlan"
                  className={`${
                    currentPath === '/MyPlan'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-900 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"'
                  } rounded-md px-3 py-2 text-sm font-medium`}
                >
                  Previous Training
                </Link>
                <Link
                  href="/TrainingSchedule"
                  className={`${
                    currentPath === '/TrainingSchedule'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-900 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"'
                  } rounded-md px-3 py-2 text-sm font-medium`}
                >
                  Training Schedule
                </Link>
              </>
            ) : (
              <>
                {' '}
                <Link
                  href="/MyPlan"
                  className="text-gray-900 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                  disabled={true}
                >
                  <LockPersonIcon className="h-4 w-4 " />
                  Previous Training
                </Link>
                <Link
                  href="#"
                  className="text-gray-900 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                  disabled={true}
                >
                  <LockPersonIcon className="h-4 w-4 " /> Training Schedule
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}
