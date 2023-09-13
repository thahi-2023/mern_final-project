import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousal from '../components/Carousal'

function Home() {

    const [foodCat, setFoodCat] = useState([])
    const [foodItem, setFoodItem] = useState([])

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'applocation/json'
            }
        })
        response = await response.json();
        //bring back the response 

        setFoodItem(response[0]);
        setFoodCat(response[1])

        //  console.log(response[0],response[1]);
    }
    useEffect(() => {
        loadData()
    }, [])


    return (
        <div>
            <div> <Navbar /> </div>
            <div> <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel" style={{objectFit:"contain !important"}}> 
<div className="carousel-inner " id='carousel'>
    <div class=" carousel-caption  " style={{ zIndex: "10" }}>
        <form className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
            <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search here..." aria-label="Search" />
            <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
        </form>
    </div>
    <div className="carousel-item active" >
        <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
    </div>
    <div className="carousel-item">
        <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
    </div>
    <div className="carousel-item">
        <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
    </div>
</div>
<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
</button>
<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
</button>
</div></div>
            <div className='container'>

                {
                    //food category not equal to then do map
                   ! foodCat  === []
                        ? foodCat.map((data) => {
                            return ( <div className='row mb-3'>
                                <div key={data._id} className="fs-3 m-3">
                                    {data.CategoryName}
                                    </div>
                                    <hr/>
                                    {!foodItem  === []
                                    ? 
                                    foodItem.filter((item)=> item.CategoryName === data.CategoryName)
                                    .map(filterItems => {
                                        return(
                                            <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                                                 <Card foodName = {filterItems.foodName}
                                                 options={filterItems.options[0]}
                                                 imgSrc={filterItems.img}
                                                 
                                                 ></Card>
                                                 </div>
                                        )
                                    })
                                    :<div> No such Data found</div>}
                                    </div>
                            )
                        })
                        :  ""
                }
                <Card />



            </div>


            <div> <Footer /> </div>

        </div>
    )
}

export default Home