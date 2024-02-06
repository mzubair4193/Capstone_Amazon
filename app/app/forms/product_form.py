from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DecimalField, SelectField, IntegerField, SubmitField, BooleanField
from wtforms.validators import DataRequired, NumberRange, Length

class ProductForm(FlaskForm):
    name = StringField("Product Name", validators=[DataRequired(), Length(max=50)])
    description = TextAreaField("Description", validators=[DataRequired(), Length(max=1000)])
    price = DecimalField("Price", validators=[DataRequired(), NumberRange(min=0)], places=2)
    return_policy = StringField("Return Policy")


    submit = SubmitField('Submit Product')
