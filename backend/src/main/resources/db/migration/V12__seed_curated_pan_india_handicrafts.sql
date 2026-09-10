-- Clear previous sample items and reset tables for the authentic regional collection
DELETE FROM cart_items;
DELETE FROM inventory_reservations;
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM products;

-- Reset identity sequence
ALTER SEQUENCE products_id_seq RESTART WITH 1;

-- Insert the 11 authentic Pan-India handicrafts
INSERT INTO products (
    name, description, sku, price, category, stock_quantity, active,
    artisan_name, origin_town, origin_state, craft_type, image_url, rating
) VALUES
-- Northern India
(
    'Hand-Embroidered Chanderi Phulkari Dupatta',
    'Colorful, geometric flower embroidery on coarse cotton and chanderi fabric, handcrafted by rural women collectives in Patiala using traditional darn stitch and vibrant silk floss.',
    'PB-PHUL-001',
    1899.00,
    'textiles',
    25,
    TRUE,
    'Simranjeet Kaur & Self-Help Collective',
    'Patiala',
    'Punjab',
    'Phulkari Embroidery',
    '/images/crafts/phulkari.jpg',
    4.90
),
(
    'Jaipur Glazed Quartz Blue Pottery Floral Vase',
    'Raw-glazed, vibrant blue pottery made from quartz stone powder, Fuller''s earth, and natural gum instead of clay. Handpainted in Persian cobalt and turquoise floral motifs.',
    'RJ-BLP-002',
    1450.00,
    'pottery',
    20,
    TRUE,
    'Kripal Kumbhar Guild',
    'Jaipur',
    'Rajasthan',
    'Blue Pottery',
    '/images/crafts/blue_pottery.jpg',
    4.85
),
(
    'Pure Kashmiri Hand-Spun Pashmina Cashmere Shawl',
    'Ultra-fine, hand-spun cashmere wool shawl known for delicate needlework. Sourced from high-altitude Changthangi goats and woven by master artisans in Srinagar.',
    'JK-PASH-003',
    4999.00,
    'textiles',
    15,
    TRUE,
    'Ghulam Hassan & Family',
    'Srinagar',
    'Jammu & Kashmir',
    'Pashmina Shawls',
    '/images/crafts/pashmina.jpg',
    4.95
),
-- Southern India
(
    'Mysore Rosewood Inlay Floral Wall Panel',
    'Detailed woodwork that embeds fine cuts of colored natural wood veneers into solid timber panels. Hand-chiseled and assembled by generational wood inlay masters.',
    'KA-INLAY-004',
    2499.00,
    'woodcraft',
    18,
    TRUE,
    'Narayana Swamy Master Inlayer',
    'Mysore',
    'Karnataka',
    'Mysore Wood Inlay',
    '/images/crafts/mysore_inlay.jpg',
    4.88
),
(
    'Bidriware Silver Inlay Zinc Alloy Aftaba Goblet',
    'Metal handicraft using blackened zinc and copper alloy inlaid with thin sheets and wires of pure silver, treated with historic Bidar fort soil for an indelible jet-black sheen.',
    'KA-BIDRI-005',
    2850.00,
    'metalcraft',
    14,
    TRUE,
    'Shah Rasheed Ahmed Quadri (National Awardee)',
    'Bidar',
    'Karnataka',
    'Bidriware',
    '/images/crafts/bidriware.jpg',
    4.92
),
-- Eastern & North-Eastern India
(
    'Madhubani Mithila Tree of Life Folk Painting',
    'Traditional folk paintings made with natural mineral and plant dyes on handmade paper, depicting mythological legends, fish, peacocks, and the sacred Tree of Life.',
    'BR-MADHU-006',
    1599.00,
    'painting',
    22,
    TRUE,
    'Sunita Devi (Mithila Mahila Sangh)',
    'Madhubani',
    'Bihar',
    'Madhubani Painting',
    '/images/crafts/madhubani.jpg',
    4.82
),
(
    'Raghurajpur Palm Leaf & Canvas Pattachitra Scroll',
    'Intricate scroll paintings on cloth or dried palm leaves based on sacred legends and Vaishnavite narratives, executed with fine natural brushes and stone pigments.',
    'OD-PATTA-007',
    2199.00,
    'painting',
    16,
    TRUE,
    'Rabindra Maharana',
    'Raghurajpur',
    'Odisha',
    'Pattachitra',
    '/images/crafts/pattachitra.jpg',
    4.90
),
(
    'Handwoven Assam Bamboo & Cane Storage Basket',
    'Practical and decorative woven baskets, mats, and vessels crafted from sustainable wild cane and seasoned golden bamboo by indigenous artisans in Majuli.',
    'AS-BAMB-008',
    950.00,
    'woodcraft',
    35,
    TRUE,
    'Bipul Saikia & Rural Craft Group',
    'Majuli',
    'Assam',
    'Bamboo & Cane Crafts',
    '/images/crafts/bamboo_craft.jpg',
    4.78
),
-- Western & Central India
(
    'Kutch Abhala Mirror-Work Embroidered Tapestry',
    'Vibrant threadwork embedded with tiny mirrors, popular in apparel and decor. Handcrafted by Rabari and Ahir tribal women using centuries-old needlecraft traditions.',
    'GJ-KUTCH-009',
    1750.00,
    'textiles',
    20,
    TRUE,
    'Deviben Rabari Collective',
    'Bhuj',
    'Gujarat',
    'Kutch Embroidery & Mirror Work',
    '/images/crafts/kutch_mirrorwork.jpg',
    4.89
),
(
    'Bastar Tribal Dhokra Lost-Wax Bell Metal Figurine',
    'Ancient non-ferrous metal casting using the lost-wax technique to make tribal figurines. Hand-coiled beeswax threads over clay cores create rustic one-of-a-kind bronzes.',
    'CG-DHOK-010',
    2350.00,
    'metalcraft',
    15,
    TRUE,
    'Budhram Baghel & Tribal Guild',
    'Kondagaon',
    'Chhattisgarh',
    'Dhokra Metal Craft',
    '/images/crafts/dhokra.jpg',
    4.86
),
(
    'Bankura Terracotta Votive Horse Sculpture',
    'Earthenware horses, lamps, and votive figures shaped from fired clay. Hand-turned on potter wheels and assembled with symmetrical symmetry, fired to a rich terracotta patina.',
    'WB-TERRA-011',
    1250.00,
    'pottery',
    28,
    TRUE,
    'Bishnupur Clay Guild',
    'Bishnupur',
    'West Bengal',
    'Terracotta',
    '/images/crafts/terracotta.jpg',
    4.84
);
