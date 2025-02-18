import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useContext } from 'react';
import Order from '../../Components/Order/Order';
import { tokenContext } from '../../Context/Token.Context';
import Loading from '../../Components/Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function AllOrders() {
  const { token } = useContext(tokenContext);
  const { id } = token ? jwtDecode(token) : {}; 

  async function getOrders() {
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
    return data;
  }

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['orders', id], 
    queryFn: getOrders,
    staleTime: 6 * 60 * 60 * 1000, 
    refetchInterval: 3000,
    enabled: !!id, 
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Loading />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 py-10 px-4">
      <HelmetProvider>
        <Helmet>
          <title>Orders</title>
          <meta name="description" content="Orders" />
        </Helmet>
      </HelmetProvider>
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="btn text-2xl font-bold text-center mb-6 relative w-fit mx-auto">
          My Orders
        </h1>
        {data && data.length > 0 ? (
          <div className="space-y-4">
            {data.map((ordery) => (
              <Order key={ordery._id} myorder={ordery} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center bg-gray-200 p-6 rounded-lg shadow">
            <i className="text-6xl text-primary-500 fas fa-frown"></i>
            <p className="text-lg font-semibold mt-4">Oops! No Orders Found</p>
          </div>
        )}
      </div>
    </section>
  );
}
