import React from 'react'
import DogPaw from '../images/dogpaw.png'
import Image from 'next/image'
import sagivImage from '../images/sagivhazut.jpeg'
export const Team = () => {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20"></div>
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <Image
            src={DogPaw}
            alt="Your Company"
            className="mx-auto "
            width={65}
            height={65}
          />
          <figure className="mt-10">
            <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
              <p className="text-center text-lg text-gray-700">
                Hi, I'm Sagiv Hazut, a dedicated full-stack developer with a
                love for dogs, computer games, and an active lifestyle in the
                gym. This website serves as a part of my portfolio, showcasing
                my passion for dogs and technology.
              </p>
            </blockquote>
            <figcaption className="mt-10">
              <Image
                src={sagivImage}
                alt="Your Company"
                className="mx-auto h-24 w-20 rounded-full"
              />

              <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                <div className="font-semibold text-gray-900">Sagiv Hazut</div>
                <svg
                  viewBox="0 0 2 2"
                  width="3"
                  height="3"
                  aria-hidden="true"
                  className="fill-gray-900"
                >
                  <circle cx="1" cy="1" r="1" />
                </svg>
                <div className="text-gray-600">Full-Stack Developer</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  )
}
