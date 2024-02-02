from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DecimalField, SelectField, IntegerField, SubmitField, BooleanField
from wtforms.validators import DataRequired, NumberRange, Length

class ProductForm(FlaskForm):
    name = StringField("Product Name", validators=[DataRequired(), Length(max=50)])
    description = TextAreaField("Description", validators=[DataRequired(), Length(max=1000)])
    price = DecimalField("Price", validators=[DataRequired(), NumberRange(min=0)], places=2)
    category = SelectField("Category", validators=[DataRequired()], choices=['Headphones', 'Laptops', 'TV/Video', 'Pet Supplies', 'Kids Toys', 'Automotive/Industrial', 'Sports/Outdoors', 'Beauty/Health', 'Movies/Music/Games'])
    shipping_time = IntegerField("Shipping Time", validators=[DataRequired(), NumberRange(min=0)])
    sellerId = IntegerField("Seller ID")
    return_policy = StringField("Return Policy")
    free_shipping = BooleanField("Free Shipping")


    submit = SubmitField('Submit Product')
