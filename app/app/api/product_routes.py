from flask import Blueprint, request, jsonify
from app.forms.product_form import ProductForm
from flask_login import current_user, login_required
from app.models import db, Product
from sqlalchemy import desc

product_routes = Blueprint("products",__name__)





# get all products
@product_routes.route('/all')
def get_all_products():
    # we want all products regardless of category but maybe sort them based on category?
    # or we just display based on id
    # page = request.args.get('page')
    # if page == None:
    #     page = 1
    # page = (int(page) - 1) * 10
    # products = Product.query.order_by(desc(Product.created_at)).limit(10).offset(page).all()
    products = Product.query.order_by(desc(Product.created_at)).all()

    if not products:
        return {"message": "That page does not exist"}, 404
    list_dict_products = [product.to_dict() for product in products]
    return {"products":list_dict_products}


# POSSIBLE CHANGE TO QUERRY IMAGES WITH THE PRODUCTS TO MAKE TILES EASIER.

@product_routes.route('/images')
def get_all_products_with_images():

    products = Product.query.order_by(desc(Product.created_at)).all()
    if not products:
        return {"message": "That page does not exist"}, 404
    # list_dict_products = [product.to_dict() for product in products]
    list_dict_products = []

    for product in products:
        product_dict = product.to_dict()
        product_images = ProductImage.query.filter_by(productId=product.id).all()


        product_dict['product_images'] = [image.to_dict() for image in product_images]

        list_dict_products.append(product_dict)


    return {"products":list_dict_products}




#get all products by category
@product_routes.route('/category/<string:cate>')
def get_products_by_category(cate):
  

    products = Product.query.filter(Product.category==cate).all()
    if not products:
        return {"message": "That page does not exist"}, 404
    return {"products": [product.to_dict() for product in products]}

#get a product's description
@product_routes.route('/<int:id>')
def get_product_details(id):
    product = Product.query.get(id)
    if product is None:
        return {"message": "Product doesn't exist"}, 404
    return product.to_dict()

#get all products of the current user
@product_routes.route('/current', methods=['GET'])
@login_required
def get_current_user_products():
    products = Product.query.filter_by(sellerId=current_user.id).all()
    if not products:
        return {"message": "That page does not exist"}, 404
    return {"products": [product.to_dict() for product in products]}


@product_routes.route('/new', methods=['POST'])
@login_required
def create_product():
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data

        newProduct = Product(
            name=data["name"],
            description=data["description"],
            price=data["price"],
            return_policy=data["return_policy"],
            owner_id=current_user.id    
        )

        db.session.add(newProduct)
        db.session.commit()

        return newProduct.to_dict()
    else:
        return {"error": "Invalid request data"}, 400


@product_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_product(id):
    product = Product.query.get(id)

    if product is None:
        return {'message': "Product doesn't exist"}, 404

    if current_user.id != product.owner_id:
        return {'message': "You do not have permission to update this product"}, 403

    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data)

    if form.validate_on_submit():
 
        product.owner_id = current_user.id
        product.name = form.name.data
        product.description = form.description.data
        product.price = form.price.data
        product.return_policy = form.return_policy.data

        print(product)

        db.session.commit()

        updated_product = Product.query.get(id)

        return {"product": updated_product.to_dict()}
    else:
        return form.errors, 401

#delete a specific product
@product_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_specific_product(id):
    print("WE ARE IN THE DELETION")

    product = Product.query.get(id)

    if product is None:
        return {'message': "Product doesn't exist"}, 404

    if current_user.id != product.owner_id:
        return {'message': "You do not have permission to delete this product"}, 403

    db.session.delete(product)
    db.session.commit()

    return {'message': 'Product deleted successfully'}, 200

# @product_routes.route("/<int:id>/images",methods=['GET'])
# def product_images(id):

#     products = ProductImage.query.filter(productId=id)
#     if not products:
#         return {"message": "No images for that product"}
#     return {"product_images": [product.to_dict() for product in products]}


# @product_routes.route("/<int:id>/images/new", methods=['POST'] )
# @login_required
# def post_product_images(id):
#     form = ImageForm()
#     form["csrf_token"].data = request.cookies["csrf_token"]

#     if form.validate_on_submit():

#         url = form.data["url"]
#         print(url)

#         new_image = ProductImage(url=url, productId=int(id))

#         db.session.add(new_image)
#         db.session.commit()
#         updated_product = Product.query.get(id)

#         return {"product": updated_product.to_dict()}
#     return { "post_product_images": form.errors }

# @product_routes.route("/images/<int:id>", methods=['DELETE'])
# @login_required

# def delete_product_images(id):
#     productImage = ProductImage.query.get(id)
#     if productImage:
#         db.session.delete(productImage)
#         db.session.commit()
#         return {'id' : "Image deleted successfully!"}
#     else:
#         return {'message': "Image does not exist"}, 404
