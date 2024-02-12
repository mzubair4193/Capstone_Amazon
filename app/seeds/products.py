from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from datetime import datetime
from random import randint
import random


# f = Faker(locale='en_US')
f = Faker()


headphones1 = [
    "Sony WH-1000XM4",
    "Bose QuietComfort 35 II",
    "Apple AirPods Pro",
]

headphone_description1 = [
    "Premium wireless noise-canceling headphones with excellent sound quality and comfort.",
    "Another top-tier option for noise-canceling performance and comfort.",
    "True wireless earbuds with active noise cancellation and seamless integration with Apple devices."
]

headphone_image = [
    "http://tinyurl.com/nc9rh53c", "http://tinyurl.com/aw2e24h9", "https://tpc.ucf.edu/wp-content/uploads/sites/5/2019/11/MWP22.jpg"
]

laptops1 = [

    "Apple MacBook Pro",
    "Dell XPS 13",
    "HP Spectre x360",
]

laptop_descriptions1= [
    "Known for its powerful performance, high-resolution display, and sleek design, suitable for professionals and creatives.",
    "A compact and premium ultrabook with a stunning InfinityEdge display, powerful performance, and excellent build quality.",
    "A versatile 2-in-1 convertible laptop with a premium design, vibrant display, and strong performance, ideal for productivity and multimedia tasks.",
]

laptop_image = [
    "https://techcrunch.com/wp-content/uploads/2021/10/CMC_0556.jpg", "http://tinyurl.com/4h5nyve9", "http://tinyurl.com/2682w3u2"
]

tv_video1 = [

    "Samsung QLED Q80A Series 4K UHD Smart TV",
    "LG OLED C1 Series 4K UHD Smart TV",
    "Sony Bravia XR A80J Series OLED 4K Ultra HD Smart TV",
]

tv_descriptions1 = [
    "A premium TV featuring Quantum Dot technology, HDR, and smart capabilities powered by Tizen OS.",
    "An OLED TV known for its deep blacks, vibrant colors, and Dolby Vision IQ and Dolby Atmos support.",
    "A high-end OLED TV featuring Sony's Cognitive Processor XR for enhanced picture and sound quality."
]

tv_video_images = [
    "http://tinyurl.com/mvn8v524", "http://tinyurl.com/zdd4377w", "http://tinyurl.com/2z4u36dp"
]

pet_supplies1 = [

    "Kong Classic Dog Toy",
    "Furbo Dog Camera",
    "Hertzko Self-Cleaning Slicker Brush",
]

pet_supplies_desc1 = [
    "A durable rubber toy designed for chewing and play, suitable for dogs of all sizes.",
    "A pet camera with two-way audio and treat tossing features, allowing pet owners to interact with and monitor their pets remotely.",
    "A grooming brush designed to remove loose hair and mats from dogs and cats, with a self-cleaning feature for easy maintenance."
]

pet_supplies_images = [
    "http://tinyurl.com/3z3m8wjc", "http://tinyurl.com/5yafmc3s", "https://m.media-amazon.com/images/I/41hstVYiX2L._AC_.jpg"
]

kids_toys1 = [

    "LEGO Classic Large Creative Brick Box",
    "Fisher-Price Rock-a-Stack",
    "Melissa & Doug Wooden Building Blocks Set",
]

kids_toys_desc1 = [
    "A set of LEGO bricks in various colors and shapes, inspiring creativity and open-ended building play for kids.",
    "A classic baby toy with colorful rings for stacking, promoting fine motor skills and hand-eye coordination.",
    "A set of wooden blocks in various shapes and sizes, encouraging imaginative play and spatial reasoning skills in children."
]

kids_toys_images =[
    "https://m.media-amazon.com/images/I/91SXHJRqWqL.jpg" , "http://tinyurl.com/ztpymknk" , "http://tinyurl.com/ym42vput"
]

automotive_industrial1 = [
    "Battery Tender Plus Charger and Maintainer",
    "Meguiar's Ultimate Liquid Wax",
    "NOCO Genius Boost Plus Jump Starter",
]

automotive_industrial_desc1 = [
    "A charger and maintainer designed to keep automotive batteries charged and maintained during storage or extended periods of non-use."
    "A high-quality liquid wax for automotive paint protection, providing a deep shine and durable protection against the elements."
    "A portable jump starter capable of jump-starting vehicles with dead batteries, also featuring USB charging capabilities for electronic devices."
]

auto_indus_images = [
    "http://tinyurl.com/rnpejpec" , "http://tinyurl.com/yc5ef9h9" , "http://tinyurl.com/2s36ed8n"
]

sports_outdoors1 = [
    "Coleman Sundome Tent",
    "Gpeng Snowshoes Light Weight Aluminum Trekking Poles",
    "Osprey Atmos AG 65 Backpack",
]

sports_outdoors_desc1 = [
    "A durable tent suitable for camping trips, featuring easy setup and weather-resistant materials."
    "Package Included: A pair of snowshoes + A pair of Snowshoeing Poles + A pair of Claw Protectors + A Carrying bag!"
    "A comfortable and versatile backpack with advanced suspension system, suitable for hiking and outdoor adventures."
]

sports_outdoors_images = [
    "http://tinyurl.com/ympzs5ja" , "http://tinyurl.com/4bb4sm9m" , "http://tinyurl.com/4n7xj7ea"
]

beauty_health1 = [
    "CeraVe Hydrating Facial Cleanser",
    "Olay Regenerist Micro-Sculpting Cream",
    "Maybelline Instant Age Rewind Eraser Multi-Use Concealer"
]

beauty_health_desc1 = [
    "A gentle cleanser suitable for all skin types, designed to cleanse and hydrate the skin without stripping its natural moisture barrier.A gentle cleanser suitable for all skin types, designed to cleanse and hydrate the skin without stripping its natural moisture barrier.",
    ": An anti-aging moisturizer formulated with advanced ingredients to hydrate, firm, and plump the skin, reducing the appearance of fine lines and wrinkles.",
    "A versatile concealer designed to cover dark circles, blemishes, and imperfections, providing a smooth and radiant finish."
]

beauty_health_images = [
    "https://i5.peapod.com/c/3V/3VO45.png" , "http://tinyurl.com/2s5pvh9s" , "http://tinyurl.com/2ah6tkzp"
]

movies_music_games1 = [
    "The Lord of the Rings Trilogy Extended Edition Blu-ray Box Set",
    "Hamilton Original Broadway Cast Recording CD",
    "Nintendo Switch Console"
]

movies_music_games_desc1 = [
    "A collection of the extended editions of The Lord of the Rings trilogy on Blu-ray, featuring additional scenes and bonus content.",
    "The original cast recording of the hit Broadway musical Hamilton, featuring the acclaimed music and performances from the show.",
    "A versatile gaming console from Nintendo that can be played in handheld, tabletop, or docked mode, offering a wide range of games for players of all ages."
]

movies_music_games_images = [
    "http://tinyurl.com/3sd8bhb6", "http://tinyurl.com/h5yp59my" , "http://tinyurl.com/yvvb2hnc"
]

f = Faker(locale='en_US')


def seed_products():
    allProducts = []
    for i in range(0, 3):
        owner_id = randint(1, 3)
        headphones = Product(
            name=headphones1[i],
            price = f.random_number(digits=2),
            description=headphone_description1[i],
            image=headphone_image[i],
            category= "headphones",
            created_at=datetime.now(),
            owner_id=owner_id,
            return_policy=random.choice(['30 day return', 'Must be unopened and unused', 'No returns']))
        laptops = Product(
            name=laptops1[i],
            price = f.random_number(digits=2),
            description=random.choice(laptop_descriptions1),
            image=laptop_image[i],
            category="laptops",
            created_at=datetime.now(),
            owner_id=owner_id,
            return_policy=random.choice(['90 day return', 'Must be unopened and unused', 'No returns'])
        )

        tv_video = Product(
            name=tv_video1[i],
            price = f.random_number(digits=2),
            description=random.choice(tv_descriptions1),
            image=tv_video_images[i],
            category="tv_video",
            created_at=datetime.now(),
            owner_id=owner_id,
            return_policy=random.choice(['90 day return', 'Must be unopened and unused', 'No returns'])
        )

        pet_supplies = Product(
            name=pet_supplies1[i],
            price = f.random_number(digits=2),
            description=random.choice(pet_supplies_desc1),
            image=pet_supplies_images[i],
            category="pet_supplies",
            created_at=datetime.now(),
            owner_id=owner_id,
            return_policy=random.choice(['90 day return', 'Must be unopened and unused', 'No returns'])
        )

        kids_toys = Product(
            name=kids_toys1[i],
            price = f.random_number(digits=2),
            description=random.choice(kids_toys_desc1),
            image=kids_toys_images[i],
            category="kids_toys",
            created_at=datetime.now(),
            owner_id=owner_id,
            return_policy=random.choice(['90 day return', 'Must be unopened and unused', 'No returns'])
        )

        automotive_industrial = Product(
            name=automotive_industrial1[i],
            price = f.random_number(digits=2),
            description=random.choice(automotive_industrial_desc1),
            image=auto_indus_images[i],
            category="automotive_industrial",
            created_at=datetime.now(),
            owner_id=owner_id,
            return_policy=random.choice(['90 day return', 'Must be unopened and unused', 'No returns'])
        )

        sports_outdoors = Product(
            name=sports_outdoors1[i],
            price = f.random_number(digits=2),
            description=random.choice(sports_outdoors_desc1),
            image=sports_outdoors_images[i],
            category="sports_outdoors",
            created_at=datetime.now(),
            owner_id=owner_id,
            return_policy=random.choice(['90 day return', 'Must be unopened and unused', 'No returns'])
        )

        beauty_health = Product(
            name=beauty_health1[i],
            price = f.random_number(digits=2),
            description=random.choice(beauty_health_desc1),
            image=beauty_health_images[i],
            category="beauty_health",
            created_at=datetime.now(),
            owner_id=owner_id,
            return_policy=random.choice(['90 day return', 'Must be unopened and unused', 'No returns'])
        )

        movies_music_games = Product(
            name=movies_music_games1[i],
            price = f.random_number(digits=2),
            description=random.choice(movies_music_games_desc1),
            image=movies_music_games_images[i],
            category="movies_music_games",
            created_at=datetime.now(),
            owner_id=owner_id,
            return_policy=random.choice(['90 day return', 'Must be unopened and unused', 'No returns'])
        )



        db.session.add(headphones)
        db.session.add(laptops)
        db.session.add(tv_video)
        db.session.add(pet_supplies)
        db.session.add(kids_toys)
        db.session.add(automotive_industrial)
        db.session.add(sports_outdoors)
        db.session.add(beauty_health)
        db.session.add(movies_music_games)
        db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
