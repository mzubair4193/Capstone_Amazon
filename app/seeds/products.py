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
    "Sennheiser HD 660 S",
    "Beyerdynamic DT 770 Pro",
    "Jabra Elite 85h",
    "Audio-Technica ATH-M50x",
    "AKG K371",
    "Shure AONIC 50",
    "Sony WH-XB900N"
]

headphone_description1 = [
    "Premium wireless noise-canceling headphones with excellent sound quality and comfort.",
    "Another top-tier option for noise-canceling performance and comfort.",
    "True wireless earbuds with active noise cancellation and seamless integration with Apple devices.",
    "High-quality open-back headphones known for their natural sound reproduction and comfortable design.",
    "Professional studio headphones with a closed-back design and balanced sound profile.",
    "Wireless over-ear headphones with strong noise cancellation and impressive battery life.",
    "Popular studio monitor headphones with a balanced sound signature and robust build quality.",
    "Closed-back studio headphones with a neutral sound profile, suitable for critical listening and monitoring.",
    "Premium wireless headphones with adjustable noise cancellation and studio-quality sound.",
    "Wireless headphones with extra bass response, ideal for bass lovers and casual listening."
]

laptops1 = [

    "Apple MacBook Pro",
    "Dell XPS 13",
    "HP Spectre x360",
    "Lenovo ThinkPad X1 Carbon",
    "Asus ROG Zephyrus G14",
    "Microsoft Surface Laptop 4",
    "Acer Swift",
    "Razer Blade 15",
    "Google Pixelbook Go",
    "Microsoft Surface Pro 7",
]

laptop_descriptions1= [
    "Known for its powerful performance, high-resolution display, and sleek design, suitable for professionals and creatives.",
    "A compact and premium ultrabook with a stunning InfinityEdge display, powerful performance, and excellent build quality.",
    "A versatile 2-in-1 convertible laptop with a premium design, vibrant display, and strong performance, ideal for productivity and multimedia tasks.",
    "Renowned for its durability, exceptional keyboard, and business-class performance, favored by professionals and frequent travelers.",
    "A high-performance gaming laptop featuring AMD Ryzen processors and NVIDIA GeForce graphics in a compact form factor, suitable for gamers and content creators.",
     "Combining elegance with performance, this ultraportable laptop offers a premium typing experience, vibrant touchscreen display, and long battery life.",
     "An affordable yet capable ultrabook offering good performance, a lightweight design, and long battery life, making it a great value for everyday users and students.",
     "A premium gaming laptop with a sleek aluminum chassis, powerful hardware configurations, and a high-refresh-rate display, designed for serious gamers and content creators.",
     "A lightweight and portable Chromebook with a premium build, excellent keyboard, and long battery life, ideal for users seeking simplicity and efficiency.",
     "A versatile 2-in-1 detachable laptop/tablet hybrid offering portability, a high-resolution display, and decent performance, suitable for on-the-go professionals and students."
]

tv_video1 = [

    "Samsung QLED Q80A Series 4K UHD Smart TV",
    "LG OLED C1 Series 4K UHD Smart TV",
    "Sony Bravia XR A80J Series OLED 4K Ultra HD Smart TV",
    "TCL 6-Series 4K UHD QLED Roku Smart TV",
    "Hisense U8G Quantum Series 4K ULED Smart TV",
    "Vizio M-Series Quantum 4K HDR Smart TV",
    "Samsung AU8000 Crystal 4K UHD Smart TV",
    "LG NanoCell 85 Series 4K UHD Smart TV",
    "Sony X80J Series 4K Ultra HD LED Smart TV",
    "Toshiba C350 Series 32-inch Smart HD LED TV"
]

tv_descriptions1 = [
    "A premium TV featuring Quantum Dot technology, HDR, and smart capabilities powered by Tizen OS.",
    "An OLED TV known for its deep blacks, vibrant colors, and Dolby Vision IQ and Dolby Atmos support.",
    "A high-end OLED TV featuring Sony's Cognitive Processor XR for enhanced picture and sound quality.",
    "A budget-friendly QLED TV with Quantum Dot technology, Dolby Vision HDR, and Roku smart platform integration.",
    "A mid-range TV with Quantum Dot technology, Dolby Vision HDR, and Android TV smart platform.",
    "A value-oriented TV with Quantum Dot technology, Dolby Vision HDR, and Vizio's SmartCast platform.",
    "An affordable TV with Crystal 4K processor, HDR support, and built-in voice assistant.",
    "A NanoCell TV with a wide color gamut, full-array dimming, and LG's webOS smart platform.",
    "An entry-level LED TV featuring 4K resolution, HDR support, and Sony's X1 4K HDR Processor.",
    "A compact smart TV with 720p resolution, Fire TV Edition integration, and voice remote with Alexa."
]

pet_supplies1 = [

    "Kong Classic Dog Toy",
    "Furbo Dog Camera",
    "Hertzko Self-Cleaning Slicker Brush",
    "MidWest Homes for Pets Dog Crate",
    "Catit Flower Fountain",
    "Rabbitgoo Cat Harness and Leash Set",
    "PetSafe Spray Bark Collar",
    "Busy Buddy",
    "Sentry Calming Collar",
    "Kong Wobbler"
]

pet_supplies_desc1 = [
    "A durable rubber toy designed for chewing and play, suitable for dogs of all sizes.",
    "A pet camera with two-way audio and treat tossing features, allowing pet owners to interact with and monitor their pets remotely.",
    "A grooming brush designed to remove loose hair and mats from dogs and cats, with a self-cleaning feature for easy maintenance.",
    "A high-quality dog food made with real meat and natural ingredients, suitable for dogs of all life stages.",
    "A durable metal crate suitable for crate training and providing a safe and secure space for dogs at home or during travel.",
    "A water fountain designed specifically for cats, featuring a compact design and three water flow settings to encourage cats to drink more water.",
    "A harness and leash set designed for walking cats outdoors safely, with adjustable straps and escape-proof design.",
    "Assorted line of interactive toys for dogs, providing mental and physical enrichment.",
    "Pheromone-based collar for cats and dogs, helping to reduce anxiety and stress.",
    "Treat-dispensing toy for dogs, promoting mental stimulation and slow feeding."
]

kids_toys1 = [

    "LEGO Classic Large Creative Brick Box",
    "Fisher-Price Rock-a-Stack",
    "Melissa & Doug Wooden Building Blocks Set",
    "VTech Sit-to-Stand Learning Walker",
    "Barbie Dreamhouse Dollhouse with Pool, Slide, and Elevator",
    "Crayola Inspiration Art Case",
    "NERF N-Strike Elite Disruptor Blaster",
    "Baby Einstein Take Along Tunes Musical Toy",
    "Little Tikes Easy Score Basketball Set",
    "Play-Doh Modeling Compound 10-Pack"
]

kids_toys_desc1 = [
    "A set of LEGO bricks in various colors and shapes, inspiring creativity and open-ended building play for kids.",
    "A classic baby toy with colorful rings for stacking, promoting fine motor skills and hand-eye coordination.",
    "A set of wooden blocks in various shapes and sizes, encouraging imaginative play and spatial reasoning skills in children.",
    "A baby walker with interactive features such as lights, music, and shape sorters, aiding in walking and development."
    "A large dollhouse featuring multiple rooms, accessories, and interactive elements for imaginative play.",
    "An art set with crayons, markers, and colored pencils in a portable case, perfect for creative expression and art projects for kids.",
    "A NERF blaster with a rotating drum and quick-draw action, providing fun and active play for kids.",
    "A baby toy with colorful lights and classical music melodies, stimulating auditory and visual senses in infants.",
    "A toddler-friendly basketball hoop set with an adjustable height feature, promoting active play and coordination skills.",
    "A variety pack of Play-Doh in different colors, allowing kids to mold and create endless shapes and designs."
]

automotive_industrial1 = [
    "Battery Tender Plus Charger and Maintainer",
    "Meguiar's Ultimate Liquid Wax",
    "NOCO Genius Boost Plus Jump Starter",
    "Bosch ICON Wiper Blades",
    "CRC Mass Air Flow Sensor Cleaner",
    "K&N Performance Air Filter",
    "Black & Decker Portable Air Compressor",
    "Castrol EDGE Full Synthetic Motor Oil",
    "Weathertech Floor Liners",
    "Stanley Fatmax Portable Jump Starter"
]

automotive_industrial_desc1 = [
    "A charger and maintainer designed to keep automotive batteries charged and maintained during storage or extended periods of non-use."
    "A high-quality liquid wax for automotive paint protection, providing a deep shine and durable protection against the elements."
    "A portable jump starter capable of jump-starting vehicles with dead batteries, also featuring USB charging capabilities for electronic devices."
    "High-performance windshield wiper blades designed for superior wiping performance and durability in various weather conditions."
    "A specially formulated cleaner for mass air flow sensors, designed to remove dirt, debris, and contaminants without damaging sensitive components."
    "A reusable and washable air filter designed to increase airflow and engine performance while providing superior filtration compared to disposable filters."
    "A compact and portable air compressor suitable for inflating tires, sports equipment, and other inflatables."
    "A premium full synthetic motor oil offering superior protection against engine wear, deposits, and viscosity breakdown for high-performance engines."
    "Custom-fit floor liners designed to protect vehicle interiors from dirt, spills, and debris, featuring high-quality materials and precise fitment."
    "A portable jump starter with built-in air compressor and USB charging capabilities, suitable for jump-starting vehicles and powering electronic devices on the go."

]

sports_outdoors1 = [
    "Coleman Sundome Tent",
    "Yeti Rambler Stainless Steel Vacuum Insulated Tumbler",
    "Osprey Atmos AG 65 Backpack",
    "Fitbit Charge 4 Fitness and Activity Tracker",
    "Spalding NBA Street Basketball",
    "CamelBak Chute Mag Water Bottle",
    "Garmin Forerunner 245 GPS Running Smartwatch",
    "Patagonia Better Sweater Fleece Jacket",
    "Black Diamond Spot Headlamp",
    "ENO DoubleNest Hammock"
]

sports_outdoors_desc1 = [
    "A durable tent suitable for camping trips, featuring easy setup and weather-resistant materials."
    "A high-quality stainless steel tumbler designed to keep beverages hot or cold for extended periods, ideal for outdoor activities."
    "A comfortable and versatile backpack with advanced suspension system, suitable for hiking and outdoor adventures."
    "A fitness and activity tracker with GPS functionality, heart rate monitoring, and various activity tracking features, ideal for tracking workouts and outdoor activities."
    "A durable basketball suitable for outdoor play, featuring a sturdy construction and good grip."
    "A durable water bottle with a magnetic cap and leak-proof design, perfect for staying hydrated during outdoor activities."
    "A GPS running smartwatch with advanced performance metrics and training features, suitable for runners and outdoor enthusiasts."
    "A cozy and warm fleece jacket ideal for outdoor activities in cold weather."
    "A compact and lightweight headlamp with adjustable brightness levels, perfect for outdoor adventures and camping trips."
    "A comfortable hammock for relaxing outdoors, featuring a spacious design and easy setup."
]

beauty_health1 = [
    "CeraVe Hydrating Facial Cleanser",
    "Olay Regenerist Micro-Sculpting Cream",
    "Maybelline Instant Age Rewind Eraser Multi-Use Concealer",
    "Neutrogena Hydro Boost Hyaluronic Acid Gel Cream",
    "Revlon One-Step Hair Dryer and Volumizer",
    "Thayers Alcohol-Free Rose Petal Witch Hazel Toner",
    "Aztec Secret Indian Healing Clay",
    "Paula's Choice Skin Perfecting 2% BHA Liquid Exfoliant",
    "Differin Adapalene Gel Acne Treatment",
    "Garnier Fructis Sleek & Shine Shampoo"
]

beauty_health_desc1 = [
    "A gentle cleanser suitable for all skin types, designed to cleanse and hydrate the skin without stripping its natural moisture barrier.A gentle cleanser suitable for all skin types, designed to cleanse and hydrate the skin without stripping its natural moisture barrier.",
    ": An anti-aging moisturizer formulated with advanced ingredients to hydrate, firm, and plump the skin, reducing the appearance of fine lines and wrinkles.",
    "A versatile concealer designed to cover dark circles, blemishes, and imperfections, providing a smooth and radiant finish.",
    "A lightweight gel-cream moisturizer infused with hyaluronic acid to hydrate and nourish the skin, leaving it smooth, supple, and refreshed.",
    "A styling tool that combines a hair dryer and volumizer in one, making it easy to achieve salon-quality blowouts and volume at home.",
    "A gentle toner infused with witch hazel and rose petal extracts to cleanse, tone, and refresh the skin, leaving it balanced and hydrated.",
    "A natural clay mask made from calcium bentonite clay, known for its deep cleansing and purifying properties, helping to detoxify and clarify the skin.",
    "An exfoliating toner with salicylic acid (BHA) to unclog pores, reduce blackheads, and smooth skin texture, promoting a clear and radiant complexion.",
    "A topical retinoid gel formulated to treat and prevent acne breakouts, reducing inflammation and promoting skin renewal for clearer, healthier skin.",
    "A shampoo infused with argan oil and apricot extracts to cleanse, smooth, and nourish frizzy hair, leaving it shiny, manageable, and frizz-free.",
]

movies_music_games1 = [
    "The Lord of the Rings Trilogy Extended Edition Blu-ray Box Set",
    "Hamilton Original Broadway Cast Recording CD",
    "Nintendo Switch Console",
    "Harry Potter: The Complete 8-Film Collection Blu-ray Set",
    "The Legend of Zelda: Breath of the Wild - Nintendo Switch Game",
    "Disney Classics Complete Movie Collection Blu-ray Set",
    "Taylor Swift - Folklore CD",
    "Sony PlayStation 5 Console",
    "Game of Thrones: The Complete Series DVD Box Set",
    "Beyoncé - Lemonade Vinyl LP",
    "Marvel's Spider-Man: Miles Morales - PlayStation 5 Game",
    "Friends: The Complete Series DVD Box Set",
    "Star Wars: The Skywalker Saga Blu-ray Box Set",
    "Red Dead Redemption 2 - Xbox One Game",
    "Queen - Greatest Hits CD",
    "Super Mario Odyssey - Nintendo Switch Game",
    "Stranger Things Season 1 Collector's Edition Blu-ray Set",
    "The Witcher 3: Wild Hunt - Complete Edition - PlayStation 4 Game",
    "Frozen II Blu-ray/DVD Combo Pack",
    "Minecraft - Nintendo Switch Game"
]

movies_music_games_desc1 = [
    "A collection of the extended editions of The Lord of the Rings trilogy on Blu-ray, featuring additional scenes and bonus content.",
    "The original cast recording of the hit Broadway musical Hamilton, featuring the acclaimed music and performances from the show.",
    "A versatile gaming console from Nintendo that can be played in handheld, tabletop, or docked mode, offering a wide range of games for players of all ages.",
    "A comprehensive collection of all eight Harry Potter films on Blu-ray, perfect for fans of the wizarding world.",
    "An open-world action-adventure game from Nintendo set in the iconic Legend of Zelda universe, offering immersive gameplay and exploration.",
    "A collection of classic Disney animated films on Blu-ray, including beloved favorites like The Lion King, Beauty and the Beast, and Aladdin.",
    "The latest album from singer-songwriter Taylor Swift, featuring a collection of introspective and atmospheric songs.",
    "The latest gaming console from Sony, offering cutting-edge graphics, immersive gameplay experiences, and a wide range of games.",
    "A complete DVD box set of the hit HBO series Game of Thrones, featuring all eight seasons of the epic fantasy drama.",
    "The vinyl edition of Beyoncé's critically acclaimed album Lemonade, featuring a mix of R&B, pop, and hip-hop tracks."
]


f = Faker(locale='en_US')


def seed_products():
    allProducts = []
    for i in range(1, 10):
        owner_id = randint(1, 3)
        headphones = Product(
            name=headphones1[i],
            price = f.random_number(digits=2),
            description=headphone_description1[i],
            category= "headphones",
            created_at=datetime.now(),
            owner_id=owner_id,
            return_policy=random.choice(['30 day return', 'Must be unopened and unused', 'No returns']))
        laptops = Product(
            name=laptops1[i],
            price = f.random_number(digits=2),
            description=random.choice(laptop_descriptions1),
            category="laptops",
            created_at=datetime.now(),
            owner_id=owner_id,
            return_policy=random.choice(['90 day return', 'Must be unopened and unused', 'No returns'])
        )

        tv_video = Product(
            name=tv_video1[i],
            price = f.random_number(digits=2),
            description=random.choice(tv_descriptions1),
            category="tv_video",
            created_at=datetime.now(),
            owner_id=owner_id,
            return_policy=random.choice(['90 day return', 'Must be unopened and unused', 'No returns'])
        )

        pet_supplies = Product(
            name=pet_supplies1[i],
            price = f.random_number(digits=2),
            description=random.choice(pet_supplies_desc1),
            category="pet_supplies",
            created_at=datetime.now(),
            owner_id=owner_id,
            return_policy=random.choice(['90 day return', 'Must be unopened and unused', 'No returns'])
        )

        kids_toys = Product(
            name=kids_toys1[i],
            price = f.random_number(digits=2),
            description=random.choice(kids_toys_desc1),
            category="kids_toys",
            created_at=datetime.now(),
            owner_id=owner_id,
            return_policy=random.choice(['90 day return', 'Must be unopened and unused', 'No returns'])
        )

        automotive_industrial = Product(
            name=automotive_industrial1[i],
            price = f.random_number(digits=2),
            description=random.choice(automotive_industrial_desc1),
            category="automotive_industrial",
            created_at=datetime.now(),
            owner_id=owner_id,
            return_policy=random.choice(['90 day return', 'Must be unopened and unused', 'No returns'])
        )

        sports_outdoors = Product(
            name=sports_outdoors1[i],
            price = f.random_number(digits=2),
            description=random.choice(sports_outdoors_desc1),
            category="sports_outdoors",
            created_at=datetime.now(),
            owner_id=owner_id,
            return_policy=random.choice(['90 day return', 'Must be unopened and unused', 'No returns'])
        )

        beauty_health = Product(
            name=beauty_health1[i],
            price = f.random_number(digits=2),
            description=random.choice(beauty_health_desc1),
            category="beauty_health",
            created_at=datetime.now(),
            owner_id=owner_id,
            return_policy=random.choice(['90 day return', 'Must be unopened and unused', 'No returns'])
        )

        movies_music_games = Product(
            name=movies_music_games1[i],
            price = f.random_number(digits=2),
            description=random.choice(movies_music_games_desc1),
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
