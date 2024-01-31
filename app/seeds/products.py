# from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from datetime import datetime
from random import randint
import random


# f = Faker(locale='en_US')
f = Faker()


headphones = [
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

laptops = [

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

tv_video = [

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

pet_supplies = [

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

kids_toys = [

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

automotive_industrial = [
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