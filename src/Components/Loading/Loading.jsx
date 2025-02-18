import {  Bars } from "react-loader-spinner";
import style from "./Loading.module.css";
export default function Loading() {
  return (
    <div className='flex justify-center items-center'>
   <Bars
  height="80"
  width="80"
  color="#8A4F7D"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
  
    </div>
  );
}
