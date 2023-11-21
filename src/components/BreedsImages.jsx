import React from 'react'

export const BreedsImages = ({ apiData }) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {apiData &&
          apiData.map((item, index) => (
            <div key={index} className="bg-white p-4 shadow-md rounded-md">
              <div className="mb-4">
                <img
                  src={item.image.url}
                  alt={item.name}
                  className="w-100 h-80 object-cover rounded-md mx-auto"
                />
              </div>
              <h2 className="text-xl font-bold mb-2">{item.name}</h2>
              <p className="text-gray-600 mb-2">{item.temperament}</p>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <strong>Origin:</strong> {item.origin}
                </div>
                <div>
                  <strong>Life Span:</strong> {item.life_span}
                </div>
                <div>
                  <strong>Height:</strong> {item.height.imperial} inches
                </div>
                <div>
                  <strong>Weight:</strong> {item.weight.imperial} lbs
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
