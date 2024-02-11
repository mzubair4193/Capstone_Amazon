import logo from "../../../public/logo-black.png"
  const categories = [
    'Headphones',
    'Laptops',
    'TV/Video',
    'Pet Supplies',
    'Kids Toys',
    'Automotive/Industrial',
    'Sports/Outdoors',
    'Beauty/Health',
   ' Movies/Music/Games']
 <img src={logo} className="login-business-logo" onClick={() => navigate("/")} />

 const dispatch = useDispatch()
 const { closeModal } = useModal()
 const [productName, setProductName] = useState("")
 const [price, setPrice] = useState("")
 const [description, setDescription] = useState("")
 const [returnPolicy, setReturnPolicy] = useState("")
 const [category, setCategory] = useState("")
 const product = {
     name: productName,
     price: parseFloat(price),
     description,
     category,
     return_policy: returnPolicy
 }

 const handleSubmit = async (e) => {
     e.preventDefault()
     console.log(product)
     await dispatch(thunkCreateProduct(product))
     await dispatch(thunkGetAllProducts())
     closeModal()
 }