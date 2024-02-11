from .db import db, environment, SCHEMA, add_prefix_for_prod 
from datetime import datetime

class Product(db.Model):
    __tablename__ = "products"

    if environment == 'production':
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Numeric(4,2), nullable=False)
    description = db.Column(db.Text)
    category = db.Column(db.String, nullable=True)
    image = db.Column(db.String(255))
    return_policy = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    owner = db.relationship('User', back_populates='products')
    reviews = db.relationship("Review", back_populates="product")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'description': self.description,
            'category': self.category,
            'image': self.image,
            'return_policy': self.return_policy,
            'owner_id': self.owner_id,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
