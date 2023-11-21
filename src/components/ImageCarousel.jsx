import React, { useState, useEffect } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import styles from '../styles/Homepage.module.css'
import { HomepageDogImages, fetchData } from '../libs/DogsApis'

export const ImageCarousel = () => {
  const [carouselImages, setCarouselImages] = useState(null)
  const [apiData, setApiData] = useState(null)

  // call the HomepageDogImages api
  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const factsData = await HomepageDogImages()
        setCarouselImages(factsData.data)
      } catch (error) {
        console.error('Error in fetchDataAndSetState:', error)
      }
    }
    fetchDataAndSetState()
  }, [])

  //call the fects function
  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const factsData = await fetchData()
        setApiData(factsData.data[0].attributes.body)
      } catch (error) {
        console.error('Error in fetchDataAndSetState:', error)
      }
    }

    fetchDataAndSetState()
  }, [])

  return (
    <div className={styles.carouselContainer}>
      <Carousel
        showThumbs={true}
        dynamicHeight={true}
        centerMode
        centerSlidePercentage={90}
        className="text-center"
      >
        {carouselImages?.map((image, index) => (
          <div key={index} className={styles.carouselItem}>
            <img
              src={image.url}
              alt={image.breeds[0]?.name || 'Unknown Breed'}
              className={styles.resizedImage}
            />
            <div className={`legend ${styles.imageInfo}`}>
              <p>
                {image.breeds.map((breed, breedIndex) => (
                  <span key={breedIndex}>{breed.name}</span>
                ))}
              </p>
            </div>
            {image.isSmall && (
              <img
                src={image.url}
                alt={image.breeds[0]?.name || 'Unknown Breed'}
                className={`${styles.smallImage} ${styles.image}`}
              />
            )}
          </div>
        ))}
      </Carousel>
      <div className="p-8 sm:p-12 md:p-16 lg:p-20 xl:p-24 flex flex-col items-center">
        <p className="text-blue-800 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-xl text-center">
          {apiData}
        </p>
      </div>
    </div>
  )
}
