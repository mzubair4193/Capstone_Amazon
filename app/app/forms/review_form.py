from flask_wtf import FlaskForm
from wtforms import IntegerField,TextAreaField, SubmitField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    reviewText = TextAreaField('Review', validators=[DataRequired()])
    starRating = IntegerField('Star Rating', validators=[DataRequired()])
    submit = SubmitField('Submit')
