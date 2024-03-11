import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetAllProducts } from "../../redux/product"
import './Home.css'
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import DeleteProduct from "../DeleteProduct/DeleteProduct"
import UpdateProduct from "../EditProduct/EditProduct"
import { NavLink } from "react-router-dom"
const HomePage = () => {
    const dispatch = useDispatch()
    const products = useSelector((state) => Object.values(state.product))
    const user = useSelector((state) => state.session.user)
    useEffect(() => {
        dispatch(thunkGetAllProducts())
    }, [dispatch])

    console.log(products)
    // if (!products) return null
    return (
        <>
            <div className="nav-links-container" >
                <NavLink to={"/category/headphones"} className={'headphone'} > Headphones </NavLink>
                <NavLink to={"/category/laptops"} className={'headphone'}> Laptops </NavLink>
                <NavLink to={"/category/television"} className={'headphone'}> TV/Video </NavLink>
                <NavLink to={"/category/pets"} className={'headphone'}> Pet Supplies </NavLink>
                <NavLink to={"/category/children"} className={'headphone'}> Kids Toys </NavLink>
                <NavLink to={"/category/automotive"} className={'headphone'}> Automotive/Industrial </NavLink>
                <NavLink to={"/category/athletics"} className={'headphone'}> Sports/Outdors </NavLink>
                <NavLink to={"/category/beauty"} className={'headphone'}> Beauty/Health </NavLink>
                <NavLink to={"/category/entertainment"} className={'headphone'}> Movies/Music/Games  </NavLink>
            </div>


            <div className="maincont column">
                {products.map((product) => {
                    return (
                        <div className="productcont" key={product.id}>
                            <NavLink to={`/products/${product.id}`} className={"product-box"}>

                                <div className='producthead'>
                                    {product.createdAt}
                                </div>
                                <div className='imgHolder'><img className="img" src={product.image || "https://placehold.co/600x400"}></img></div>
                                <div className='prodname-home'>{product.name}</div>
                                <div className='bottomcont-home'>${product.price}.00</div>
                            </NavLink>
                            <div className='productbuttons'>
                                <div className="home-buttons" >
                                {user && user.id === product.owner_id && (
                                    <OpenModalButton buttonText={"Update"} modalComponent={<UpdateProduct product={product} className={'update-prod-btn'} />} className={'update-prod-btn'} />
                                )}
                                {user && user.id === product.owner_id && (
                                    <OpenModalButton buttonText={"Delete"} modalComponent={<DeleteProduct product={product} />} />
                                )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
                 <div className="foot-link-cont">
          <span className="foot-person">About Me</span>
          <div className="foot-a-cont">
            <a
              href="https://github.com/mzubair4193"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-zubair-60024927a/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </div>
        </>
    )
}
export default HomePage
