// import React from "react";

// const CarDetailsFrame = () => {
//   return (
//     <div className="flex flex-col md:flex-row w-full bg-black h-auto md:h-1/2">
//       <div className="w-full  md:w-1/2 bg-red-500 flex flex-col justify-center items-center p-4">
//         <div className="w-full h-1/2 md:h-full">
//           <img
//             className="w-full h-auto object-cover rounded-lg p-3"
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsZqH7bzqjDKdXtsIoNFtWEhLxBmBdwQ7lug&usqp=CAU"
//             alt=""
//           />
//         </div>
//         <div className="flex justify-center mt-4 md:mt-0">
//           <img
//             className="w-1/6 md:w-4/12 h-1/3 md:h-1/2 object-cover rounded-lg p-3"
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsZqH7bzqjDKdXtsIoNFtWEhLxBmBdwQ7lug&usqp=CAU"
//             alt=""
//           />
//           <img
//             className="w-1/6 md:w-4/12 h-1/3 md:h-1/2 object-cover rounded-lg p-3"
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsZqH7bzqjDKdXtsIoNFtWEhLxBmBdwQ7lug&usqp=CAU"
//             alt=""
//           />
//           <img
//             className="w-1/6 md:w-4/12 h-1/3 md:h-1/2 object-cover rounded-lg p-3"
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsZqH7bzqjDKdXtsIoNFtWEhLxBmBdwQ7lug&usqp=CAU"
//             alt=""
//           />
//         </div>
//       </div>
//       <div className="w-full md:w-1/2 h-1/2 bg-green-500">
//         <div className="pl-4 pt-9">
//           <h1 className="pl-7 text-4xl font-bold">BMW Car</h1>
//           <p className="text-gray-600 pl-7 text-2xl mb-2">Brand: brand?.name</p>
//           <p className="text-gray-600 pl-7 text-2xl mb-2">
//             Category: category?.name
//           </p>
//           <p className="text-gray-600 pl-7 text-2xl mb-2">
//             Fuel Type: fuelType?.name
//           </p>
//           <p className="text-gray-600 pl-7 text-2xl mb-2">
//             Transmission: transmission?.name
//           </p>
//           <p className="text-gray-600 pl-7 text-2xl mb-2">Model: model?.name</p>
//           <p className="text-gray-600 pl-7 text-2xl mb-2">
//             Per Day Price: ₹perDayPrice
//           </p>
//           <button className="btn bg-green-700 p-3 w-1/2 rounded-full m-3">
//             {" "}
//             Book now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CarDetailsFrame;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const CarDetailsFrame = () => {
  const { carId } = useParams();
  const { cars } = useSelector((state: any) => state.carsDatas);
  const [car, setCar] = useState(null);
  const [image, setImage] =useState('');
  console.log(car);

  useEffect(() => {
    const data = cars.find((x) => x._id === carId);
    setCar(data);
    setImage(data.images[0])
    console.log(data);
  }, [cars, carId]);

  const ChengeImage = (img)=>{
    setImage(img);
  }
  return (
    <div className="flex flex-col md:flex-row w-full h-auto md:h-1/2">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4">
        <div className="w-full h-1/2 md:h-full">
          <img
            className="w-full h-full object-cover rounded-lg p-3"
            src={image}
            alt=""
          />
        </div>
        <div className="flex justify-center mt-4 md:mt-0">
        {car?.images.map((x, index) => (
        <img onClick={()=> ChengeImage(x)}
          key={index} 
          className="w-4/12 md:w-1/3 h-1/2 object-cover rounded-lg p-3 cursor-pointer"
          src={x}
          alt=""
        />
      ))}
        </div>
      </div>
      <div className="w-full md:w-1/2 h-1/2 ">
        <div className="pl-4 pt-9">
          <h1 className="text-4xl font-bold">{car?.carName}</h1>
          <p className="text-gray-600 text-2xl mb-2">Brand: {car?.brand?.name}</p>
          <p className="text-gray-600 text-2xl mb-2">
            Category: {car?.category?.name}
          </p>
          <p className="text-gray-600 text-2xl mb-2">
            Fuel Type: {car?.fuelType?.name}
          </p>
          <p className="text-gray-600 text-2xl mb-2">
            Transmission: {car?.transmission?.name}
          </p>
          <p className="text-gray-600 text-2xl mb-2">Model: {car?.model?.name}</p>
          <p className="text-gray-600 text-2xl mb-2">
            Per Day Price: ₹{car?.perDayPrice}
          </p>
          <p className="text-gray-600 text-2xl mb-2 ">Availability : {car?.availability} </p>
          <button className="btn bg-green-700 p-3 w-1/2 rounded-full m-3">
            Book now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsFrame;
