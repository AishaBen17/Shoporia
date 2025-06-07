import axios from "axios";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";


async function getAllCategories() {
  try {
    const response = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    console.log("API Response:", response.data);
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    return []; 
  }
}


export default function CategorySlider() {
  const navigate = useNavigate();
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    staleTime: 6 * 60 * 60 * 1000,
  });

  if (isLoading) {
    return <Loading />;
  }
  const handleCategoryClick = (id) => {
    navigate(`/CategoryDetails/${id}`);
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 3, slidesToScroll: 2, initialSlide: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="my-8 md:my-10">
      <h1 className="text-xl font-bold text-primary-500 mb-8">
        Shop Popular Categories:
      </h1>

      {categories.length > 0 ? (
        <Slider {...settings}>
          {categories.map((category) => (
            <div key={category._id} className="cursor-pointer">
              <div 
               key={category._id}
               className="cursor-pointer"
               onClick={() => handleCategoryClick(category._id)}
              >
                <img
                  loading="lazy"
                  src={category.image}
                  alt={category.name}
                  className="w-full h-[200px] object-cover"
                />
                <h2 className="text-md text-center mt-3 ml-2 text-primary-600">{category.name}</h2>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-gray-500">No categories found.</p>
      )}
    </div>
  );
}
