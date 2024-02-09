from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import StringField, TextAreaField, DecimalField, SelectField, IntegerField, SubmitField, BooleanField
from ..api.aws_images import ALLOWED_EXTENSIONS
from wtforms.validators import DataRequired, NumberRange, Length

class ProductForm(FlaskForm):
    name = StringField("Product Name", validators=[DataRequired(), Length(max=50)])
    description = TextAreaField("Description", validators=[DataRequired(), Length(max=1000)])
    category = SelectField(choices=[('headphones', 'Headphones'), ('laptops', 'Laptops'), ('tv/video', 'TV/Video'), ('pet supplies', 'Pet Supplies'), ('kids toys', 'Kids Toys'), ('automotive/industrial', 'Automotive/Industrial'), ('sports/outdoors','Sports/Outdoors'), ('beauty/health', 'Beauty/Health'), ('movies/music/games', 'Movies/Music/Games')])
    image = FileField("Image",validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    price = DecimalField("Price", validators=[DataRequired(), NumberRange(min=0)], places=2)
    return_policy = StringField("Return Policy")


    submit = SubmitField('Submit Product')
