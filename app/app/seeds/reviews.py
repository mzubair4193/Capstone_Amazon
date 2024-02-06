from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_reviews():
    r1 = Review(
        userId = 1, productId = 81, starRating=1, reviewText = 'hello I am review text'
    )
    r2 = Review(
        userId = 2, productId = 81, starRating=2, reviewText = 'hello I am review text'
    )
    r3 = Review(
        userId = 3, productId = 81, starRating=3, reviewText = 'hello I am review text'
    )
    db.session.add(r1)
    db.session.add(r2)
    db.session.add(r3)
    # Add more comments as needed

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
