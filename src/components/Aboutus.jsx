'use client'
import React from 'react'
import Link from 'next/link'
import { Link as ScrollLink, Element } from 'react-scroll'
import { ImageCarousel } from './ImageCarousel'
import { Team } from './Team'
import { Reviews } from './Reviews'
import { ContactSections } from './ContactSections'
import CountUp from 'react-countup'

const AnimatedCounter = ({ start, end }) => {
  return (
    <CountUp start={start} end={end} duration={2} separator="," decimals={0}>
      {({ countUpRef, start }) => (
        <div>
          <span ref={countUpRef} />
          {start()}
        </div>
      )}
    </CountUp>
  )
}

export const Aboutus = ({ user }) => {
  return (
    <>
      <div className="relative isolate overflow-hidden py-24 sm:py-32">
        <div
          className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
          aria-hidden="true"
        ></div>
        <div
          className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
          aria-hidden="true"
        ></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-black sm:text-6xl">
              Join Our Dog Training Team
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Passionate about dogs? Join us in creating well-behaved
              companions. We're seeking dedicated dog training experts to make a
              positive impact on the lives of pets and their owners. Grow with
              us in a supportive team environment, enjoy continuous learning,
              and contribute to strengthening the bond between dogs and their
              families. Explore rewarding opportunities with us.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-black sm:grid-cols-2 md:flex lg:gap-x-10">
              <ScrollLink
                to="ImageCarousel"
                spy={true}
                smooth={true}
                duration={500}
                style={{ cursor: 'pointer' }}
              >
                Our Dogs <span aria-hidden="true">&rarr;</span>
              </ScrollLink>
              <ScrollLink
                to="Team"
                spy={true}
                smooth={true}
                duration={1500}
                style={{ cursor: 'pointer' }}
              >
                Our team <span aria-hidden="true">&rarr;</span>
              </ScrollLink>
              <ScrollLink
                to="Reviews"
                spy={true}
                smooth={true}
                duration={500}
                style={{ cursor: 'pointer' }}
              >
                Customer reviews <span aria-hidden="true">&rarr;</span>
              </ScrollLink>
              <ScrollLink
                to="ContactSections"
                spy={true}
                smooth={true}
                duration={500}
                style={{ cursor: 'pointer' }}
              >
                Contact Sections <span aria-hidden="true">&rarr;</span>
              </ScrollLink>
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col-reverse">
                <dt className="text-base leading-7 text-gray-300">
                  Global Offices
                </dt>
                <dd className="text-2xl font-bold leading-9 tracking-tight text-black">
                  <AnimatedCounter start={0} end={3} />
                </dd>
              </div>
              <div className="flex flex-col-reverse">
                <dt className="text-base leading-7 text-gray-300">
                  Team Members
                </dt>
                <dd className="text-2xl font-bold leading-9 tracking-tight text-black">
                  <AnimatedCounter start={0} end={10} />
                </dd>
              </div>
              <div className="flex flex-col-reverse">
                <dt className="text-base leading-7 text-gray-300">
                  Training Hours
                </dt>
                <dd className="text-2xl font-bold leading-9 tracking-tight text-black">
                  <AnimatedCounter start={0} end={40} />
                </dd>
              </div>
              <div className="flex flex-col-reverse">
                <dt className="text-base leading-7 text-gray-300">
                  Availability
                </dt>
                <dd className="text-2xl font-bold leading-9 tracking-tight text-black">
                  Always
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <Element name="ImageCarousel">
        <ImageCarousel />
      </Element>
      <Element name="Team">
        <Team />
      </Element>
      <Element name="Reviews">
        <Reviews />{' '}
      </Element>
      <Element name="ContactSections">
        <ContactSections user={user} />
      </Element>
    </>
  )
}
