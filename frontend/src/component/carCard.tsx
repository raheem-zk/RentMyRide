import React, { useEffect, useState } from "react";
import { BsFuelPump } from 'react-icons/bs';
import { TbManualGearbox } from 'react-icons/tb';
import { Link } from "react-router-dom";
import { userAxios } from "../axios/axios";

// Sample data for rental cars
const rentalCars = [
  {
    id: 1,
    name: "Car Model 1",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
    price: "$50/day",
    fuelType:'Disel'
  },
  {
    id: 2,
    name: "Car Model 2",
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBISEhgSEhUYGBgYEhEYGBoYGBgYGBgSGBkZGRgYGBgcIS4lHB4rHxkYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHxISHDQlISE0NDQ0MTQ0NDQxNDQ0MTQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0MTQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIARMAtwMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAAAwECBAYHBQj/xABEEAACAQMCAgYGBQgKAwEAAAABAgADERIEIQUxBiJBUWFxBxMygZGhcpKxwdEUI0JSVGKCkxYzQ1OissLS4fAVRIMX/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAhEQEAAgEEAwEBAQAAAAAAAAAAARECAxIhURMxYUGBcf/aAAwDAQACEQMRAD8A2DGGMdjDGd3lJxhjG4wxgKxhjG4yLQF4yMY20LQFYyMY3GGMBWMMYzGGMBVoWjcZGMBWMMY3GRjAVjIxjsYYwE4yMY/GRjATjIxj8ZGMBOMI7GEFM20jGPxhjI1RGMMY7GGMBOMjGOKQxgJxhjHYSMYCsYYxuMjGEKxhjG4yMYC8ZGMbjDGArGRjG2haCicIYxuMMYKJtC0bjDGCirSMY7GGMFE4wjcYQM3GGMdjItMtUVjDGNtC0FE4wxjcYYylFYwxjcZGMFF4yto7GRjBRVpGMdjDGEonGGMbjDGCisYYxmMMYUrGRjG4wxhKKxhjG4wxgorGRjHYwxgojGEbaEFM20i0bjDGZtuirQtG4yMYsoq0LRuMi0FFWhaMtC0oVaTjL2kYwKYwxl7SLQK4yLS9oWgUtC0vaRaEUxhaXtC0CmMjGMtC0FF4wxjLQtBRWMIy0Ispl4wxjbSLTNulFYwtG2haLKKtItG4yLSpRdpFowiVIgpW0i0sRKwiLSLS0JLFbSLS0IspW0LS0IsVtJtLQiylbQtLQl5KVxhjGWhaCi8YRlpEFMrGTaSfukXkbRaGMkmTApaRaXJlVYH4D5wKkSpEYZQmBQiUMl3tbxNvlf7pjarW06YBqOqX5XO5+iObe6Ek8ypM8PUdLdGnOoT4BT99p5Op9IGnHsIx+kwHyAMVLNtxvC80B/SF3Ig8Osx+Nx9kofSKP7tT7zFFuhXk5TnLekc/3a/4vtvMWp6RaxOyIo8FJ+ZMUOoXlgZy5PSJV7Qh/h/AzY+i/Setrqpp00Syrk7XYBVvYd9yT2eBlI/xt4kgTxm6TaJXwOoS47Qr4+5gCCPG89bT10qKHpsrKeTKQwPvEimgSbQEm8NItCWhAZ62mTYOL2O3bbvtPC6RcebTsqIU3XIlh42AHwMyW1VAnIsTtYksSQO7eYtenoqzA1EDY8i29p4stTLLi4h7MMMccrmLeDT6V12qoC6YllDdUcmOPZv2zeFY2FnXmb9RiP8ANtPGp6fRKboguO1Ry+Ajvytb2VXJ57SY5zj+3/V1MccpuIr+PUUMQeuCeQsjW+2VHVFyTyA9h97DuvPPeuthYP2ZAE3U9x8ZV6wvZUrHbnewHnc7+6b832HLxR09NVI5sDuf0SPdzisW36wO+3VO3z3mH61PZyqX7s+ZnOOm/TUtlpNI7Bd1q1Mr3PIohHzYeQ8d455ZTUM5YY4xcvT6XdOxSP5Po2Dups9Ui6I24IQXIdue/IHv3tzfV8TqVGLu7sx5szEk+Z+7kJgluwRTtO8cOEmtqG75X1xiryItWR65bHY37LNsPO43+UW1TuFvfFwvAsXMjM98rIgMFZhyY/GdG9Ers414ucjpEsb77CoPvE5oROlehLfV6hP1tIfk6j/VJJDxbkEMOY+Y7R8PunscM4jU07esoNYmxK80de517T3Hn4zy0empKs6AjaxYAiZGj1FIdX1ibHbrryO/f2cvdOrly3vQV6+rU1KWoxuqB6bXyQ7kFXG1iuVnA3tuLggbFTD3Xriy5C2/WBtYt1ee3Z3mc/4Hqhp6wqHdNg++xoOwDn+E9f8Ah8ZvuppurlSOXK3aJ5NaZwm/x6tGs4+wyKZIbJmB2ta7AX77Y84TzjpD+kp37oTl5p6l38UdvGysbqSD/CftEU+oYjZ+te+4UE+RAntvwYMBgitvsTncDx3no6fhQVeqgVuVwvW9xZT9s4Y6eUy65Z4w1dGqW6ytud7bbd533kYEXbfu2bE28b22m1NwUk3UAntNQmw8lUj5y44Wy2LMgF/0UA+GV95qNHLpJ1ce2vppC6h+7cdYH4bzm/pCNelqSC9X1bLTKKCwpjaxAsQC2QPed53JlS1scjbm3M+4bTEfS0xzXxtc2v5XnbS0Jxyu3DU1YyiqcJbT16dPGlp6vrGAuypUcUVK2ZabWP5x+bt+j7ItuB5q8G1drDTaj+TU/wBs+gqgFrXIHKyki/vG/wAJA4d+t1F7rlnPmW2X5+6enmHn4l8//wDgtYf/AFq/8px9ok/0c137NW+o0+gPyRf0bj5n5wOkA3JPyk3SbYcAHRnX/stb6hk/0Y1/7LV+oZ3sUC39Wl/32OKe42u3uHvEamgA9tix7gMV+G5+cm6V2w4AOjGv/Zqv1DLjonr/ANlq/UM76aCDsAmPU1CjZEZj8B8TG6TbDhn9Etf+y1vqGB6JcQ/ZK/8ALb8J3BKeqqeyAo8PxMzKHCKh3qVG8gSf+I3T0bYcBborrxz0tb+W/wCE3n0RcJ1FDXu1WhVpqdI4yem6qWzQ2yItfY7eE6rS0tNOS3Pjuf8AiZCBr35bDb8fjNXJEU+eekK0+qoxd0rVQyWuQpY2y7eVvjJ0DABTT0a1XDbr+Su427zjedoHQ7RhXwQo7uzmorHPNiWJubi1ydrWnpcJ09alT9XqKgqFWIV7EMybY5D9Ybjt5CJ55IiuGh9DehnrKb1dZTakalRx6oXQGkRbrKblQd9tjadDfTDAJdgAAAcjew7yefvjUqZAFNweRII+R3lhS33JPLbsHkJPcUvqba62toqSOuxBsbsef8IkxHF9OEqm3JgG955/OE8s5VNVD0xFx7bO1e3YTFLqmb2VF/Fh87TCq8b0w8fMW+2eJ0l6TClpi9P82pqKhcYlluCeopBUnbtsOe4npibmolwmoi5hsb6x+SgX797Dy75joDlk5JPj2eXdNM0PTGqiq1WmtZCoYVKPUbG5GRpuxVuR9h25HaZ2p6e8ORFdqp63JAjlx5pa6jxPPslm4YuJbY7WmOVJmof/AKfw3l+eP/z/AOY5PSXww83qL50X+4GTleG10qIByO57PDxl2UmePo+kOl11N6ei1KetNNit0bJOzP1b4lgCRPN0/EdNw93Gs16tUKqPVguRTUMzA4FncuQ1izG5AWFbQUMlKK826x8eQ901dvSJwsf27Hyo1v8AZIX0j8L/AL5/5Nb/AGQcNtYntMVgzeyPfPH4f024ZWcKupQMxAAcPTuTyF3UC82Eayn+i4f6ANQ+8IDaWgheH33YzITSovZfzi21w/Rp1G/hVPk7KflE1uJMvNaSDvesFIPiuNv8UcD0DIVC3gO/tPl3TXeMcZei6o1VMijOEp02ZigFy5JZgFABN7eM1Sj6R6rM3qKVWt6th6wMERVUkjbFAwbY8wLWPMAxHKTNOohAOQ/74xGq1K00ao3squRNr2UczYdgFz7o7S1hUpq4BUMqtZhZgGANmHYd5pvEOntCnr00bo2Dth664wFUnHDG24B2JvsTytvEjaNFW9cgcK6q18c1KsV7GxO4B8bHwmWEAmNoqXq0CBmIW4BY3IW5st+4CwHbYC944mRVy8xtbq1o03queqlN3b6Kgsfsl2aa/wBONR6vh9YjtCJ7ndVPyJiZSni9HuO1tVTZ9SiColZ18PVsqOote22RW/7nfeE130eNlTrUnF2DUWN7jZlb7x84TllHLtHpn6fooQb1Kx8kXAfHK8ZquA1q9MU71PU2Uo9MrUdais+7qzK24dgcb8hPcLGxPgZ4PB+lT0FK4Zpkw9oqwIJBtt39kaOUzdmrjETDztXwCm9Sld6iYItNg9KquqqCmLBqWKlVy/eO1979ul9KP6xKnq3RipRlquapUrcDJnUEta3Pla3cZ2nT8f0mrX1Zcox5K/VIbss3L5xev4Dp9fTajqk642FRdnHcwbtHgbidY4cZ5fPtPUez1ENlZRdeZ26x728ZNOsowvTQ2B2IbrHbdrHedE1foh1SsfU6ik63Ns1ZGtfwDDsnmv6KuJra3qGsTyqMOfmoluEqWp8MYlkRFGTK6g5MCSbWN8gARvbkO+8UdSCGuoYsws7F8gLg7b23tztfczpnQ30dazTapNRqPV40w5VQ2ZZmUqL7WsL39wnk8Z9GOvWq5oKjozlk66qwBN7MGsO/leLKaadaLsRSpC9JVHVJCnHEsAW9o5E3N9wIzS69VemXooyIrXUKql9yesxVrnYbkHa/fPfX0bcVN/zKi4A/rafZ5NMyh6LuIsRl6pNrG732/hBi4KlrKayn6xXo0FVAGulT86GYggZHFSR1hYfuzedEupoaWlRbU6i2AcU9P6hlQOWbAszbMptcHbcW7bbj0K6A0NDapUIq1hyYiyoT+op7f3jv3Wm9KbR7WnBtVw/W1CHStW1FMjdKlZdNWRjyzSoSrLz6yXU9+xE9GnwLTvTo6XVZ03I1BDKy11pOxHq1eqilQtw7kDl6y1xckdcq8P0rMWelSJPMlEJJ7ztuYymKCeyiL9FAPsEnPaVDmfR7o9XSslaq9BzSViiU1R3ZgrBVDY5ICSu+215snA+if51q1VMEYUr0xYB/Vg4KQACFF2Jy3ctuABY7hR1CPcKwNuYB3HmOYjSZop53SDXHT6WrWG5SmxUd72so97ECcG4tSp1KFVUZzUoHJnLAh3U9dkFgVsb23N1BM616StYKejAv7Val71Q+sP8AknGNLTZEUuCM+/bJG2c+Is0zMrEPoLhlcvRR25tTpsfNlBMyS883giP+T0VO5FCgGPLrYLf5z02CoLsf++Akj01KoUmaf6UNThoAAd3r0128MmP2TbHL1O3BPgSPPsE5d6VuL0nGn01Nw1nd2sRsFAVSR2Xye3fjAwPRqGFWsGBBNKixubk3J3385Ed6Oqzs9cseqFogLckKd1sL7/ofKTOWft0w9NzVSR7px7V8fq6bUVEKq6io+zDE2yO11++8dxnpBQdcdHQNH9/NkbbsVEbEe+/lPE46zVtRUqqpxZ2Itvse23/ec3pYTj7/AFjUzjL02nSdK9BUsK1F6TfrIc1H2H5TcuCN63TEpqSMqrhGBxf1aGx52PPbbuInE9ORmL8gbnyG5+ybZ0/4a+nqaakV6g0VDBrdV2N2qMDyJLtc9u4750mPxiO3TF4ZWPLVVPrf8xq8H1PZqqnxM+fsf++68ctd19l2HkxHb5zOz6bnfxwbWdmrqfExi8J1w5ap5wga7UKqt62oAcgCKjjrKRce1zAK/ES9PjGruAuprDnyrVOwfSjabndv/HcQHLUn3iQ2l4mvLUjwug+8ThadINcOWr1A/wDvV7r/AK0evSfiI5azUfzXP2mNq7od/wCBcUqu7abUqFrouSkCyVqV7B08QSAy9ht2ETO1Gpp0z+cqon0nVftM+btV0k1tQr63UVHCMHUOxIDc9r7jum08X061aKVlF0dEcXOVg6gOu/c4M1X4lurV+kvDqft6ul7nDf5bzz36f8JU2Fcud9kpuxNtzYWnCeIaX1ZAxsMbA2vkwN779tiNvxlM7sR+84335jbYbGIxLdu0PTzQanXUKdBKquzsmTIqKUZGJVrte1wpG3MeJnQg0+W+j+pw12lYHlqNP4AAuqny2Jn08r7R6Ltz30vV+pQp3tk1U/Cm6/6pypKoxDnInN1H6oU3Nh8TN99MeovXoIDuKbm30yVH+UzUQyJTo0qi5JUZKqOllIDArUpG4O6sLe6/6UzELMu7cLquaFMKNzSpkk+KDkJj8Z47pNEMtQ+TkdVF61Rj+6g3mjHpTrtWi6fhyeppIiI2oqDclBi3q13vuD3+Npk8J6PUNO3rGvWrndq1Xrtl3re+Pu38ZzyzjH/W8cZya10w6X8U1l6dKhqKFH9UU3DOP32A+QmkUuGavK409Y3O/wCbfe/ftO7bmXRO+ZjW+NTpR21zoVoqtKiz1kCPUK9UCxxQWBYX2YksT7u28Js60bwmeZ5b9cOCK1FexnPwEpU1TBi6bCw6o8NucpqOHV6f9ZSdfEqbfW5fOYuXjPZdvHVM0cQRt2BDWsSLbjnYjtF5uvRvpRo6+lbh/EzkiEfk7sCCg36oYbqR2HuNjOcMLyuMkxbUS3DVdGtMzfmNfpsezNwrW7MiTa/kB5THXoZqG9jUaV/o6hTNWtJtFT2XHTa/6D8RHsKjfRqIfvlG6F8UHLTsbjezJy7vamriMFZxyZviYqS4bCOhfFP2V/8AB+MbR6GcSJs2kc+IZAR8WtNcGsqjk7D+JvxlxxGuOVWp9dvxjk4bLrOiB0rJ+WMFLqWSmvtlV2ObbhBcjlkT4bkenwjW0qYNMgvTG2K5KwF77Ei3fNFq6yq4s7swvfck7xRqtyufiZNsz7Lh0LUii2TEopKlUza5Re5UItfx3nmaalpKb3NVCD2FS/yVJqAqsOTEeRIlvyh/1m+sZNs9tbobtX1VFtStPQ0A5LAJkmXW/WCvfz3sB27Tsum4hTo00pF16lOmnMfoqF+6fNtFNVbJBWsRzUPYjzHZKVKdY+2tQ/SDH7ZNv03fG4+kXi6V+IsUIYU0oKCDcEoWc2Pm9vdPISjUNREAJVahwJvj1whW3ndfrCeNQ0tW+1Nz2WCMdvhN66K8K1Luj1wyUqZyRXFmZ9ytgRkFBOVjtcbCTKYxgxicpb+i2AUDYAAeQ25R6Ue0xVMxnrJ5Ih6bOAAl18ZhPrEQ2Y7xgrgi4mhlFxCYoe8iUa5czHraGk+700Y+KKftEygssBKy8d+BaZudBPcoH2RJ6K6Q/wBlbyZx/qnviF43Zdptjprh6H6Q/oMPJ2++UboXpe+oPJh94myyby78u0249NVPQfT9j1fin+2VPQeh/eVP8H4TbLkyyoY35dm3HpqI6DUf72p8F/CB6B0uys/1Vm5qktiJPJl2bMemljoLQHOrUPlgPuManQnSDm1U/wASD7Fm3WkYR5M+zbj01pOh+iHNWPm5+60y6PRnQryoA/SLN/mJns+rk+rk3ZT+ytR0xtNw/TUzdKSKe9UUH4gTLFNJASWwmWrXWmglg4HKKtAnugs9XHbJassxiJQpeVLXVKYbK1z4m8yRWXmZhinBklGaNWITzWQmEFqZCGQmLcyReWktl5CGUxheWF5KW2SLSwAiApk7yUMgWl1ImHvLhzFDOFpNxMIOZIYyUtsu4htMbIyQYRkXELRGcPWRQyNoG0x/WSDUlDy0oWiS8rlFB4jFAmOhl1JgPgVEoJJMCSohKEQlHmBZdUlggHOTn3bQgFPvjFAispOcKdaVMXlJvILYywEWGk3gMAkiLyhn3QGwiw0kNAuBC0gPJzgBEo0m8iBUCWCyQJYCUCiMUSALQvIGiF4vOUNSA5mhMZnhNUjFvCSZWQF5IELwECRLXlC/dIG/OFMyheVvC8C15IlRJBhLWheReRlAveAMpeAMKaDLKIsS15AyTeLBgWgXLSC0peSJaEsZUxirIIgIYQjSsIRh5QyirycoDbyCbyglrwLgSSYvKTeBeGUWWlcoDcoF4kvPN4pxVKK3Y79gliJlJmnoajVKguzBR4m08ir0p0ym2Rb6K3+ZmmcR4lUrtdzt2DsmFedsdKP1ynU6b6vS/T/qv9UfjHJ0s0h5s480P3Tnt4XmvFib5dNTpLoz/ageYYfaI9ONaVuVan9cTld4XmfDB5JdcTX0jydD5Op++MWqDyIPvE4/t3SQbctvKPD9XyfHYgY1TOPLqag5O48mYffMhOK6heVaoP42+8yeGezy/HWy8A05WnSHVryrP78T9omSnSzWD9NT5ov3Wjwy15YdJZr8oTn1PpnqB7S029zD74SeLI34tsllhCYbWhCECwkwhMikhoQmgmqbA+RnOOLVWaocjfeEJ10nLP0xYCEJ2chCEIBCEIBJhCAQhCBEmEIBCEIH/9k=",
    price: "$60/day",
    fuelType:'Petrole'
  },
  {
    id: 3,
    name: "Car Model 3",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
    price: "$70/day",
    fuelType:'Petrole'
  },
  {
    id: 3,
    name: "Car Model 3",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShLJJ55BLDUVvlZDPm_pnyfv9AGDJcgxow-g&usqp=CAU",
    price: "$70/day",
    fuelType:'Petrole',
    transmission:'automatic'
  },
  {
    id: 3,
    name: "Car Model 3",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqU0oGGTqnhQAKjtk8ANVPrk6eQH62Cslqrg&usqp=CAU",
    price: "$70/day",
    fuelType:'Petrole'
  },
  {
    id: 3,
    name: "Car Model 3",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyWxiyeQ5WkfxCQGb1D9D6PIGZYkFVY_lBXw&usqp=CAU",
    price: "70/day",
    fuelType:'Petrole'
  },
  // Add more cars as needed
];

function CarCard() {
  const [carData, setCarData] = useState<any[]>([]);

  useEffect(()=>{
    getCars();
  },[]);
  const getCars = async ()=>{
    const response = await userAxios.get('/');
    console.log(response);
    setCarData(response.data.carData);
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Rental Cars</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {carData.length!=0 && carData.map((car) => (
          <div key={car?._id} className="bg-white rounded-lg shadow-md p-4">
            <Link to={'/'}>
              <img
                src={car?.images[0]}
                alt={car?.carName}
                className="w-full h-40 object-cover rounded-t-lg"
              />
            </Link>
            <div className="p-2">
              <h2 className="text-lg font-extrabold">{car?.carName}</h2>
              <div className="flex items-center">
                <BsFuelPump className="text-green-500 mr-2" />
                <span className="text-gray-600">{car?.fuelType?.name}</span>
              </div>
              <div className="flex items-center">
                <TbManualGearbox className="text-blue-500 mr-2" />
                <span className="text-gray-600">{car?.transmission?.name}</span>
              </div>
              <p className="text-black font-bold">₹{car?.perDayPrice}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    // <div className="container mx-auto p-4">
    //   <h1 className="text-2xl font-bold mb-4">Rental Cars</h1>
    //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    //     {rentalCars.map((car) => (
    //       <div key={car.id} className="bg-white rounded-lg shadow-md p-4">
    //         <Link to={'/'}>
    //           <img
    //             src={car.image}
    //             alt={car.name}
    //             className="w-full h-40 object-cover rounded-t-lg"
    //           />
    //         </Link>
    //         <div className="p-2">
    //           <h2 className="text-lg font-extrabold">{car.name}</h2>
    //           <div className="flex items-center">
    //             <BsFuelPump className="text-green-500 mr-2" />
    //             <span className="text-gray-600">{car.fuelType}</span>
    //           </div>
    //           <div className="flex items-center">
    //             <TbManualGearbox className="text-blue-500 mr-2" />
    //             <span className="text-gray-600">{car.transmission}</span>
    //           </div>
    //           <p className="text-black font-bold">₹{car.price}</p>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
}

export default CarCard;
