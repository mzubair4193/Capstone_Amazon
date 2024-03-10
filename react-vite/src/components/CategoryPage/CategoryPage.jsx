import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import DeleteProduct from "../DeleteProduct/DeleteProduct"
import UpdateProduct from "../EditProduct/EditProduct"
// import { thunkGetAllProductsByCategory } from "../../redux/product"
import { NavLink } from "react-router-dom"
// import { thunkGetProductsForCategory } from "../../redux/category"
import { thunkGetAllProducts } from "../../redux/product"
import './CategoryPage.css'
const CategoryPage = () => {
    const dispatch = useDispatch()
    const { category } = useParams()
    const user = useSelector((state) => state.session.user)
    const products = useSelector((state) => Object.values(state.product))



    console.log(products)

    useEffect(() => {
        dispatch(thunkGetAllProducts())
    }, [dispatch])

    const getCategoryHeader = (categoryName) => {
        switch (categoryName) {
            case "headphones":
                return "Headphones";
            case "laptops":
                return "Laptops";
            case "television":
                return "TV/Video";
            case "pets":
                return "Pet Supplies";
            case "children":
                return "Kids Toys";
            case "automotive":
                return "Automotive/Industrial";
            case "beauty":
                return "Beauty/Health";
            case "entertainment":
                return "Movies/Music/Games";
            case "athletics":
                return "Sports/Outdoors";
            default:
                return categoryName.toUpperCase();
        }
    };


    const catproducts = products.filter((product) => product.category === category)
    console.log("catprods", catproducts)

      return (
        <>
            <h2 className="cat-header">
                {getCategoryHeader(category)}
            </h2>
            <div className="maincont">
                {catproducts.map((product) => {
                    return (
                        <div className="productcont" key={product}>
                            <NavLink to={`/products/${product.id}`} className='product-box'  >

                            
                            <div className='imgHolder'><img className="img" src={product.image || "https://placehold.co/600x400"}></img></div>
                                <div className='prodname'>{product.name}</div>
                                <div className='bottomcont'>${product.price}</div>

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
                }).reverse()}
            </div>


        </>


    )
}

export default CategoryPage